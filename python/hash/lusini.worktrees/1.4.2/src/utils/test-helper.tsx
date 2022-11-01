import React from 'react'
//import { mount, getModule, clearMocks } from '@kaminrunde/react-firescout'
import * as rtl from '@testing-library/react'
import { Product } from 'modules/listing/types'
import {
  Controller,
  Component,
  preprocessComponent,
  GridContext,
} from '@kaminrunde/fireside-utils'
import fakeconfig from '../../firescout-mocks/Config/config'
import config from 'config'
import { CategoryOption } from 'theme/molecules/ListingCategoryTree/types'
import store from 'store'

const configMock = JSON.parse(JSON.stringify(fakeconfig))

function tryRequire(dept: string) {
  try {
    return require(`${dept}`)
  } catch (e) {
    return null
  }
}

const { mount, getModule, clearMocks } = tryRequire(
  '@kaminrunde/react-firescout'
)

export { getModule, clearMocks }

function produce(t: any, cb: (t: any) => void) {
  const o = JSON.parse(JSON.stringify(t))
  cb(o)
  return o
}

export function render<T = unknown>(Component, props: T, wrapperCtx?: string) {
  return mount(
    <ErrorBoundary>
      <div data-cy-ctx={wrapperCtx}>
        <Component {...props} />
      </div>
    </ErrorBoundary>,
    rtl
  )
}

type ExtractProps<Fn> = Fn extends (props: infer R) => any ? R : never

export async function setup() {
  clearMocks()
  store.dispatch({ type: 'TEST_CLEAR' })
  jest.clearAllMocks()
  jest.mock('hooks/useTranslations')
  jest.mock('utils/createAlgoliaHelper')
  jest.mock('algoliasearch')
  for (const key in configMock) config[key] = configMock[key]
}

export class RenderFactory<T extends (props: any) => any> {
  private initial: ExtractProps<T>
  private Component: T
  private wrapperCtx: string | undefined

  constructor(Component: T, initial: ExtractProps<T>, wrapperCtx?: string) {
    this.Component = Component
    this.initial = initial
    this.wrapperCtx = wrapperCtx
  }

  module = getModule
  clearMocks = setup

  mockComponent(path: string) {
    jest.mock(path, () => null)
  }

  updateState(fn: (state: RootState) => void) {
    const state = store.getState()
    const next = produce(state, (state) => {
      fn(state)
    })
    for (const key in next) state[key] = next[key]
  }

  withFeatures() {
    jest.dontMock('features')
  }

  async create(cb?: (p: ExtractProps<T>) => void) {
    let props: any = this.initial
    if (cb) props = produce(props, cb)
    const wrapped = render(this.Component, props, this.wrapperCtx)
    await wrapped.wait(1)
    return wrapped
  }
}

export class OrganismFactory<T extends (props: any) => any> {
  private initial: Omit<ExtractProps<T>, 'context'>
  private Component: T
  private controller: Controller<any, any>
  private wrapperCtx: string | undefined

  constructor(
    Component: T,
    controller: Controller<any, any>,
    initial: Omit<ExtractProps<T>, 'context'>,
    wrapperCtx?: string
  ) {
    this.initial = initial
    this.Component = Component
    this.controller = controller
    this.wrapperCtx = wrapperCtx
  }

  module = getModule
  clearMocks = clearMocks

  async create(cb?: (p: ExtractProps<T>) => void) {
    let userConfig = this.initial
    if (cb) userConfig = produce(userConfig, cb)
    const component: Component = {
      createdAt: 0,
      id: 'test',
      name: 'test',
      props: userConfig as any,
      updatedAt: 0,
    }
    const getGridContext = (): GridContext => ({
      byMediaSize: {},
      maxRow: 1,
      minRow: 1,
    })
    const [c, storyEvents] = await preprocessComponent(
      component,
      getGridContext,
      {
        resolveController: () => this.controller,
      }
    )
    const wrapped = render(this.Component, c.props, this.wrapperCtx)
    await wrapped.wait(1)
    return {
      ...wrapped,
      storyEvents,
    }
  }
}

export function getProduct(): Product {
  return {
    sku: '00000000',
    title: 'Test-Product',
    brand: 'VEGA',
    subtitle: '',
    containerID: '000000',
    sellable: true,
    sellOut: false,
    stock: 1,
    specialDelivery: false,
    deliveryDate: '2022-01-16',
    deliveryDays: null,
    variantData: {
      size: {
        label: '42x42x72 cm (BxLxH)',
      },
      color: {
        label: 'schwarz',
      },
      style: {},
      variant: {},
    },
    attributes: {},
    categories: {
      lvl0: ['Marken', 'Möbel'],
      lvl1: ['Marken > VEGA', 'Möbel > Tischsäulen'],
      lvl2: ['Marken > VEGA > Möbel'],
      lvl3: ['Marken > VEGA > Möbel > Tischsäulen'],
    },
    unit: {
      unitName: 'Stück',
      purchaseUnit: 1,
      referenceUnit: 1,
      packUnit: 'Stück',
    },
    prices: {
      packPriceNet: 10,
      discountGroup: 'Samuel IV',
      piecePriceNet: 10,
      packPriceGross: 10,
      piecePriceGross: 10,
      referencePriceNet: null,
      packPseudoPriceNet: 0,
      piecePriceNetString: '10,00 € / Stück',
      piecePseudoPriceNet: 0,
      referencePriceGross: null,
      packPseudoPriceGross: 0,
      piecePriceGrossString: '10,00 € / Stück',
      piecePseudoPriceGross: 0,
      referencePriceNetString: null,
      referencePriceGrossString: null,
      productCheapestPiecePriceNet: 10,
      productCheapestPiecePriceGross: 10,
      productMostexpensivePiecePriceNet: 10,
      productMostexpensivePiecePriceGross: 10,
      ecoTaxNet: null,
      ecoTaxGross: null,
    },
    priceRules: [],
    images: {
      imageWeb: [],
    },
    variantImages: [],
    flags: [],
    objectID: '00000000',
  }
}

export function getCategoryOption(): CategoryOption {
  return {
    count: 10,
    exhaustive: true,
    name: 'Custom-Category',
    path: 'Parent > Custom-Category',
    isRefined: true,
    data: [
      {
        count: 10,
        exhaustive: true,
        name: 'Cat-1',
        path: 'Parent > Custom-Category > Cat-1',
        isRefined: true,
        data: [],
        urlPath: '/category/custom-category/cat-1/',
      },
      {
        count: 10,
        exhaustive: true,
        name: 'Cat-2',
        path: 'Parent > Custom-Category > Cat-2',
        isRefined: true,
        data: [],
        urlPath: '/category/custom-category/cat-2/',
      },
    ],
    urlPath: '/category/custom-category/',
  }
}

class ErrorBoundary extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch() {
    // eslint-disable-next-line no-console
    console.error('render error')
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
