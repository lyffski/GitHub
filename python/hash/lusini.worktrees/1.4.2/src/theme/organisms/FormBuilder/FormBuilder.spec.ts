import { RenderFactory } from 'utils/test-helper'
import Formbuilder from './FormBuilder'

describe('templates/oneToOneBundle', () => {
  const factory = new RenderFactory(Formbuilder, {
    formBuilder: [
      {
        type: 'text',
        name: 'name',
        label: 'Name',
        required: true,
        multiline: false,
      },
      {
        type: 'number',
        name: 'age',
        label: 'Age',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email',
        required: true,
      },
      {
        type: 'select',
        name: 'name',
        label: 'Select',
        required: false,
        options: ['option1', 'option2'],
      },
      {
        type: 'radioGroup',
        name: 'name',
        label: 'Select',
        required: false,
        options: ['option1', 'option2'],
      },
      {
        type: 'checkboxGroup',
        name: 'name',
        label: 'checkboxGroup',
        required: false,
        options: ['option1', 'option2'],
      },
    ],
    endPoint: 'https://example.com',
    submitButtonText: 'Submit',
    formSuccessMessage: 'Form submitted successfully',
  })

  it('should render all form elements', async () => {
    const f = await factory.create()
    const ctx = f.context('organisms/FormBuilder')
    expect(ctx.handle('text-input')).toBeDefined
    expect(ctx.handle('number-input')).toBeDefined
    expect(ctx.handle('email-input')).toBeDefined
    expect(ctx.handle('select')).toBeDefined
    expect(ctx.handle('checkbox-group')).toBeDefined
  })
  it('should validate email', async () => {
    const f = await factory.create()
    const ctx = f.context('organisms/FormBuilder')
    await ctx.handle('email-input').type('aloha')
    await ctx.handle('submit').click(1000)
    expect(ctx.unwrap().innerHTML).toContain('class="error"')
  })
  it('should take only number by type number', async () => {
    const f = await factory.create()
    const ctx = f.context('organisms/FormBuilder')
    await ctx.handle('number-input').type('aloha')
    ctx.handle('number-input').should('not.have.value', 'aloha')
  })
  it('should not send form if the form not validated', async () => {
    const f = await factory.create()
    const ctx = f.context('organisms/FormBuilder')
    await ctx.handle('submit').click()
    ctx.shouldNotHaveState('submit-success')
  })
  it('should show success message if the form submitted', async () => {
    const f = await factory.create()
    const ctx = f.context('organisms/FormBuilder')
    await ctx.handle('text-input').type('john')
    await ctx.handle('number-input').type('12')
    await ctx.handle('email-input').type('john@email.de')
    ctx.handle('hidden-checkbox').should('not.have.value', 'checked')
    await ctx.handle('radio-group').nth(0).click(1000)
    await ctx.handle('checkbox-group').nth(0).click(1000)
    await ctx.handle('submit').click(1000)
    ctx.shouldHaveState('submit-success')
  })
})
