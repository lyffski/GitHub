import Component from './Accordion'
import { RenderFactory } from 'utils/test-helper'

describe('templates/PDP/Accordion', () => {
  const factory = new RenderFactory(Component, {
    children: 'foo'
  }, 'templates/PDP')

  it('shows/hides Accordion when label or arrow was clicked', async () => {
    const f = await factory.create()
    const ctx = () => f.context('templates/PDP').collection('Accordion')
    
    ctx().shouldNotHaveState('visible')

    await ctx().handle('toggle-btn').click(1)
    
    ctx().shouldHaveState('visible', 'arrow-up,content')

    await ctx().handle('toggle-btn').click(1)

    ctx().shouldNotHaveState('visible')
  })

  it('displays a label when set in props', async () => {
    const f = await factory.create(props => {
      props.label = 'label'
    })

    const ctx = () => f.context('templates/PDP').collection('Accordion')

    ctx().shouldHaveState('has-label')
  })

  it('is always extended when prop "disableToggle" is set', async () => {
    const f = await factory.create(props => {
      props.disableToggle = true
    })

    const ctx = () => f.context('templates/PDP').collection('Accordion')

    ctx().shouldHaveState('force-extend')
  })
})