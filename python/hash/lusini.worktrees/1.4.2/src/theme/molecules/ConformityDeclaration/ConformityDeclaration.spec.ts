import Component from './ConformityDeclaration'
import { RenderFactory } from 'utils/test-helper'

describe('molecules/ConformityDeclaration', () => {
  const factory = new RenderFactory(Component, {
    firstname: '',
    surname: '',
    email: '',
    article_number: '',
    product_name: '',
    locale: '',
    apiCall: '',
    id: '',
    recipient: '',
    submit: '',
    formSuccessMessage: '',
    onClick: () => null,
  })
  it('should render by default submit form', async () => {
    const f = await factory.create()
    f.context('molecules/ConformityDeclaration').shouldHaveState('form-visible')
  })

  it('should render success component, after user successfully submitted form', async () => {
    factory.module('molecules-ConformityDeclaration').fn('postData').mock({
      value: {},
      sync: true,
    })
    const f = await factory.create()
    const ctx = f.context('molecules/ConformityDeclaration')
    await ctx.handle('submit').click(1000)
    ctx.shouldHaveState('submit-success')
  })
})
