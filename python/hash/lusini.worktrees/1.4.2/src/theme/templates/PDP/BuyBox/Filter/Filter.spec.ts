import Component from './Filter'
import { RenderFactory } from 'utils/test-helper'
import { useFilter } from 'modules/productDetail'

describe('templates/PDP/Filter', () => {
  const factory = new RenderFactory(
    Component,
    {
      filterKey: 'size',
      label: 'size_label',
      onInteract: () => null,
    },
    'templates/PDP'
  )

  beforeEach(async () => {
    factory.clearMocks()
    await factory.module('productDetail').fn('fetch').mock('simple')
  })

  it('does not exist if filter is empty', async () => {
    const filterResult: ReturnType<typeof useFilter> = {
      highlight: false,
      setValue: () => null as any,
      data: {
        key: 'size',
        value: null,
        options: [],
      },
    }
    factory.module('productDetail').fn('useFilter').mock({
      sync: true,
      value: filterResult,
    })

    const f = await factory.create()

    const wrapper = f.context('templates/PDP').unwrap() as HTMLDivElement
    expect(wrapper.innerHTML).toBe('')
  })

  it('displays the value when filter-value was set', async () => {
    const filterResult: ReturnType<typeof useFilter> = {
      highlight: false,
      setValue: () => null as any,
      data: {
        key: 'size',
        value: 'opt-1',
        options: [
          { image: { classes: [], url: '' }, label: 'opt-1', selectable: true },
        ],
      },
    }
    factory.module('productDetail').fn('useFilter').mock({
      sync: true,
      value: filterResult,
    })

    const f = await factory.create()
    const ctx = f.context('templates/PDP').collection('Filter')
    ctx.shouldHaveState('has-value')
  })

  it('displays an arrow right to open the selection-drawer when more than one option is available', async () => {
    const filterResult: ReturnType<typeof useFilter> = {
      highlight: false,
      setValue: () => null as any,
      data: {
        key: 'size',
        value: null,
        options: [
          { image: { classes: [], url: '' }, label: 'opt-1', selectable: true },
          { image: { classes: [], url: '' }, label: 'opt-2', selectable: true },
        ],
      },
    }
    factory.module('productDetail').fn('useFilter').mock({
      sync: true,
      value: filterResult,
    })

    const f = await factory.create()
    const ctx = f.context('templates/PDP').collection('Filter')

    ctx.shouldHaveState('multi-options')
  })
})
