/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const NullDefaultComponent = () => ({
  __esModule: true,
  default: () => null,
})

jest.mock('hooks/useTranslations')
jest.mock('utils/createAlgoliaHelper')
jest.mock('algoliasearch')
jest.mock('config', () =>
  JSON.parse(JSON.stringify(require('./firescout-mocks/Config/config')))
)
jest.mock('theme/app/FlyoutNavi', NullDefaultComponent)
jest.mock('theme/app/Footer', NullDefaultComponent)
jest.mock('theme/app/Header', NullDefaultComponent)
jest.mock('theme/app/Modal', NullDefaultComponent)
jest.mock('features', NullDefaultComponent)
jest.mock('theme/partials/FlyoutCart', NullDefaultComponent)

global.___loader = {
  enqueue: jest.fn(),
}

// @ts-expect-error
window.IntersectionObserver = class IntersectionObserver {
  disconnect() {}
  observe() {}
  takeRecords() {}
  unobserve() {}
}

window.scrollTo = () => null

window.fetch = () => {
  throw new Error(
    'window.fetch is not avvailable during testing. please mock your side-effects'
  )
}
