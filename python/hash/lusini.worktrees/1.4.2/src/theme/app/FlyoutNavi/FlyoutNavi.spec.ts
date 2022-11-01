import Component from './FlyoutNavi'
import Header from '../Header/Header'
import { RenderFactory } from 'utils/test-helper'

describe('app/FlyoutNavi', () => {
  const factory = new RenderFactory(Component, {
    data: {
      staticBlock: {
        contentfulID: 'contentfulID',
        description: '',
        story: null,
        title: 'title',
      },
    },
    location: {
      pathname: '/',
      origin: 'https://www.lusini.com',
    },
    pageContext: {
      hrefLang: [],
    },
  })

  const headerFactory = new RenderFactory(Header, {})

  beforeEach(() => {
    factory.clearMocks()
    headerFactory.module('app-Header').var('gq-categories').fixture('empty')
    factory
      .module('app-FlyoutNavi')
      .var('root-graphql-query')
      .fixture('default')
    factory
      .module('app-FlyoutNavi')
      .var('branches-graphql-query')
      .fixture('default')
  })

  it('opens by clicking the burger-button in the header', async () => {
    const f = await factory.create()
    const hf = await headerFactory.create()
    const ctx = () => f.context('app/FlyoutNavi')

    ctx().shouldNotHaveState('visible')

    await hf.context('app/Header').handle('burger-menu').nth(0).click(1)

    ctx().shouldHaveState('visible')
  })

  it('opens by clicking a navi-link in the header and opens this category with k2-open', async () => {
    headerFactory
      .module('app-Header')
      .var('gq-categories')
      .set({
        k1: {
          nodes: [{ label: 'Category', urlPath: '/' }],
        },
      })
    factory
      .module('app-FlyoutNavi')
      .var('branches-graphql-query')
      .set({
        tree: {
          nodes: [
            {
              label: 'Category',
              path: 'Category', // label an path must match?
              urlPath: '/',
              categoryLevel: 1,
              childs: null,
            },
          ],
        },
      })
    const f = await factory.create()
    const hf = await headerFactory.create()
    const ctx = () => f.context('app/FlyoutNavi')

    ctx().shouldNotHaveState('visible')

    await hf.context('app/Header').handle('nav-link').nth(0).click(1)

    ctx().shouldHaveState('visible')
    ctx().shouldHaveState('k2-open')
  })

  it('open fallback to root-sidebar when k2 category was not found', async () => {
    headerFactory
      .module('app-Header')
      .var('gq-categories')
      .set({
        k1: {
          nodes: [{ label: 'Category', urlPath: '/' }],
        },
      })
    const f = await factory.create()
    const hf = await headerFactory.create()
    const ctx = () => f.context('app/FlyoutNavi')

    ctx().shouldNotHaveState('visible')

    await hf.context('app/Header').handle('nav-link').nth(0).click(1)

    ctx().shouldHaveState('visible')
    ctx().shouldNotHaveState('k2-open')
  })

  it('closes by clicking the overlay', async () => {
    const f = await factory.create()
    const hf = await headerFactory.create()
    const ctx = () => f.context('app/FlyoutNavi')

    ctx().shouldNotHaveState('visible')

    await hf.context('app/Header').handle('burger-menu').nth(0).click(1)

    ctx().shouldHaveState('visible')

    await ctx().handle('overlay').click(301) // 300ms delay

    ctx().shouldNotHaveState('visible')
  })

  it('closes by clicking the close-icon', async () => {
    const f = await factory.create()
    const hf = await headerFactory.create()
    const ctx = () => f.context('app/FlyoutNavi')

    ctx().shouldNotHaveState('visible')

    await hf.context('app/Header').handle('burger-menu').nth(0).click(1)

    ctx().shouldHaveState('visible')

    await ctx().handle('close-icon').click(301)

    ctx().shouldNotHaveState('visible')
  })

  it('opens k2 level when k1 label was clicked', async () => {
    factory
      .module('app-FlyoutNavi')
      .var('root-graphql-query')
      .set({
        navigation: {
          sidebar: [],
        },
        tree: {
          nodes: [
            {
              label: 'Category',
              path: 'Category',
              urlPath: '/',
            },
          ],
        },
      })
    factory
      .module('app-FlyoutNavi')
      .var('branches-graphql-query')
      .set({
        tree: {
          nodes: [
            {
              label: 'Category',
              path: 'Category', // label an path must match?
              urlPath: '/',
              categoryLevel: 1,
              childs: null,
            },
          ],
        },
      })

    const f = await factory.create()
    const hf = await headerFactory.create()
    const ctx = () => f.context('app/FlyoutNavi')

    ctx().shouldNotHaveState('visible')

    await hf.context('app/Header').handle('burger-menu').nth(0).click(1)

    ctx().shouldHaveState('visible')
    ctx().shouldHaveState('k1-open')
    ctx().shouldNotHaveState('k2-open')

    await ctx().handle('k1-item').nth(0).click(1)

    ctx().shouldHaveState('k2-open')
  })

  it('switches back to parent category if back-button is clicked', async () => {
    factory
      .module('app-FlyoutNavi')
      .var('root-graphql-query')
      .set({
        navigation: {
          sidebar: [],
        },
        tree: {
          nodes: [
            {
              label: 'Category',
              path: 'Category',
              urlPath: '/',
            },
          ],
        },
      })
    factory
      .module('app-FlyoutNavi')
      .var('branches-graphql-query')
      .set({
        tree: {
          nodes: [
            {
              label: 'Category',
              path: 'Category', // label an path must match?
              urlPath: '/',
              categoryLevel: 1,
              childs: null,
            },
          ],
        },
      })

    const f = await factory.create()
    const hf = await headerFactory.create()
    const ctx = () => f.context('app/FlyoutNavi')

    ctx().shouldNotHaveState('visible')

    await hf.context('app/Header').handle('burger-menu').nth(0).click(1)

    ctx().shouldHaveState('visible')
    ctx().shouldHaveState('k1-open')
    ctx().shouldNotHaveState('k2-open')

    await ctx().handle('k1-item').nth(0).click(1)

    ctx().shouldHaveState('k2-open')

    await ctx().handle('category-back').click(1)

    ctx().shouldNotHaveState('k2-open')
    ctx().shouldHaveState('k1-open')
  })

  it('can show teaser images on k2/k3 if defined in contentful as "Category.teaserImg"', async () => {
    factory
      .module('app-FlyoutNavi')
      .var('root-graphql-query')
      .set({
        navigation: {
          sidebar: [],
        },
        tree: {
          nodes: [
            {
              label: 'Category',
              path: 'Category',
              urlPath: '/',
            },
          ],
        },
      })
    factory
      .module('app-FlyoutNavi')
      .var('branches-graphql-query')
      .set({
        tree: {
          nodes: [
            {
              label: 'Category',
              path: 'Category', // label an path must match?
              urlPath: '/',
              categoryLevel: 1,
              childs: [
                {
                  label: 'Sub',
                  path: 'Category > Sub',
                  urlPath: '/',
                  categoryLevel: 1,
                  teaserImg: 'my-teaser-img',
                  position: 1,
                  childs: null,
                },
              ],
            },
          ],
        },
      })

    const f = await factory.create()
    const hf = await headerFactory.create()
    const ctx = () => f.context('app/FlyoutNavi')

    ctx().shouldNotHaveState('visible')

    await hf.context('app/Header').handle('burger-menu').nth(0).click(1)

    ctx().shouldHaveState('visible')
    ctx().shouldHaveState('k1-open')
    ctx().shouldNotHaveState('k2-open')

    await ctx().handle('k1-item').nth(0).click(1)

    ctx().shouldHaveState('k2-open')
    ctx().shouldHaveState('k2-has-teasers')
  })
})
