import Component from './CategoryImageTeaser'
import { RenderFactory } from 'utils/test-helper'

describe('molecules/CategoryImageTeaser', () => {
  const factory = new RenderFactory(Component, {
    bg: '',
    link: '',
    title: '',
    type: 'prominent',
    numHits: 5,
  })
  it('shows info text when type !== "top"', async () => {
    const f = await factory.create()
    f.context('molecules/CategoryImageTeaser').shouldHaveState('show-info-text')
  })
})
