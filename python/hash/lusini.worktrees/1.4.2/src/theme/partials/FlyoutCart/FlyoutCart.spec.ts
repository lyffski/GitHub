import {FlyoutCart as Component} from './FlyoutCart'
import { RenderFactory } from 'utils/test-helper'

describe('partials/FlyoutCart', () => {
  const factory = new RenderFactory(Component, {
    remove: () => null,
  })

  beforeEach(() => {
    factory.clearMocks()
    factory.module('app-Header').var('gq-categories').fixture('empty')
  })

  it.todo('can display addtional options')

  it.todo('closes the flyout if overlay is clicked')

  it.todo('closes the flyout-cart when close button was clicked')

  it.todo('closes the flyout if we navigate to a pdp on mobile')

  it.todo('does not close the flyout if we navigate to a pdp on desktop')
})