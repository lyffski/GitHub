import { PDP as Component } from './PDP'
import { RenderFactory } from 'utils/test-helper'
import { Variant } from 'modules/productDetail/types'
import config from 'config'

describe('templates/PDP', () => {
  const factory = new RenderFactory(Component, {
    '*': '123456',
    location: {
      pathname: '/pdp/123456/',
      origin: 'https://www.lusini.com',
    },
    pageContext: {
      hrefLang: [],
      brandPath: '',
    },
  })

  beforeEach(async () => {
    factory.clearMocks()
    await factory.module('templates-PDP').fn('useRelatedSkus').mock('empty')
    await factory.module('productDetail').fn('fetch').mock('simple')
  })

  it('displays a blurred dummy product while fetching the data', async () => {
    await factory.module('productDetail').fn('fetch').mock({
      fixture: 'simple',
      timeout: 100,
    })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('is-dummy')
    await f.wait(100)
    ctx.shouldNotHaveState('is-dummy')
  })

  it('displays eco-tax info for products that have eco-tax prices', async () => {
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].prices.ecoTaxNet = 1
          data[0].prices.ecoTaxGross = 1
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('hasEcoTax')
  })

  it('displays a brand logo on the product page when article has BRAND attribute', async () => {
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].attributes = {
            BRAND: {
              label: '',
              is_filter: false,
              is_pdp_attribute: false,
              values: [
                {
                  icon: '/pim/92a8f2/f4f1c2/e01903/fa84f8/5201f3/87/92a8f2f4f1c2e01903fa84f85201f387.svg',
                  value: 'VEGA',
                },
              ],
            },
          }
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('has-brand-logo')
  })

  it('displays strike-price if article has a pseudo-price', async () => {
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].prices.packPseudoPriceNet = 2
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('has-strike-price', 'piece,piece-reduction,pack')
  })

  it('displays the add-to-cart button when @utils/calculateDeliveryDate yields buyable', async () => {
    await factory.module('utils').fn('calculateDeliveryDate').mock('buyable')

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('is-sellable')
  })

  it('displays a blurred add-to-cart button when @utils/calculateDeliveryDate yields not-buyable', async () => {
    await factory
      .module('utils')
      .fn('calculateDeliveryDate')
      .mock('not-buyable')

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('not-sellable')
  })

  it('displays baseprice with currency when article has a reference-price', async () => {
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].prices.referencePriceGrossString = '0,93 € / 100 g'
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('has-baseprice')
  })

  it('displays energy-label when product has ENERGY_EFFICIENCY_CLASS attribute', async () => {
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].attributes = {
            ENERGY_EFFICIENCY_CLASS: {
              label: '',
              is_filter: false,
              is_pdp_attribute: false,
              values: [
                {
                  icon: '/pim/92a8f2/f4f1c2/e01903/fa84f8/5201f3/87/92a8f2f4f1c2e01903fa84f85201f387.svg',
                  value: '+',
                },
              ],
            },
          }
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('show-energy-label')
  })

  it('displays pack-information when article has a purchase unit > 1', async () => {
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].unit.purchaseUnit = 2
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('pack-information')
  })

  it('displays downloadable documents if article has attached documents', async () => {
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].documents = [
            { title: 'doc-1', url: '-' },
            { title: 'doc-2', url: '-' },
          ]
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('show-downloads')
  })

  it('displays icons for article attributes that have flag "display_on_pdp" and have a icon', async () => {
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].attributes = {
            ATTR1: {
              label: '',
              is_filter: false,
              is_pdp_attribute: true,
              values: [
                {
                  icon: '/pim/92a8f2/f4f1c2/e01903/fa84f8/5201f3/87/92a8f2f4f1c2e01903fa84f85201f387.svg',
                },
              ],
            },
            ATTR2: {
              label: '',
              is_filter: false,
              is_pdp_attribute: true,
              values: [
                {
                  icon: '/pim/92a8f2/f4f1c2/e01903/fa84f8/5201f3/87/92a8f2f4f1c2e01903fa84f85201f387.svg',
                },
              ],
            },
          }
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('show-icons')
  })

  it('displays a label-list for article attributes that have no document attached, no icon and have the flag "display_on_pdp"', async () => {
    // TODO: refactor to seperate "getAttributes" test
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].attributes = {
            ATTR1: {
              label: '',
              is_filter: false,
              is_pdp_attribute: true,
              values: [{ value: 'val-1', unit: 'U' }],
            },
            ATTR2: {
              label: '',
              is_filter: false,
              is_pdp_attribute: false, // will be kicked
              values: [{ value: 'val-2' }],
            },
            ATTR3: {
              label: '',
              is_filter: false,
              is_pdp_attribute: true,
              values: [{ value: 'val-3', icon: 'should-not-display' }], // will be kicked
            },
            ATTR4: {
              label: '',
              is_filter: false,
              is_pdp_attribute: true,
              values: [{ value: 'val-4', document: 'should-not-display' }], // will be kicked
            },
            ATTR5: {
              label: '',
              is_filter: false,
              is_pdp_attribute: true,
              values: [{ value: 'val-5' }],
            },
          }
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('show-information-labels')
  })

  it('displays the oneToOneBundle-button, if it is a configurable product and sellable/buyable', async () => {
    await factory.module('utils').fn('calculateDeliveryDate').mock('buyable')
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].sellable = true
          data[0].related = {
            alternatives: [],
            crossSells: [],
            optionalAdditions: [],
            configurableRelations: [
              {
                skus: ['a', 'b'],
                type: 'type',
              },
            ],
          }
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('is-configurable')
  })

  it('displays a cross-sell product-slider when article has maintained related cross-sell articles', async () => {
    await factory.module('productListFetcher').fn('bySku').mock('list')
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].sellable = true
          data[0].related = {
            alternatives: [],
            crossSells: ['123456', '234567'],
            optionalAdditions: [],
          }
          return data
        },
      })

    const f = await factory.create()
    const ctx = f.context('templates/PDP')

    ctx.shouldHaveState('slider-crosssells-shown')
  })

  it('can add article to cart', async () => {
    await factory
      .module('productDetail')
      .fn('fetch')
      .mock({
        fixture: 'simple',
        transform: (data: Variant[]) => {
          data[0].sku = '123456789'
          return data
        },
      })
    const addItem = await factory
      .module('cart')
      .fn('addItem')
      .mock('oneItem', jest.fn)

    const f = await factory.create()
    const ctx = f.context('templates/PDP')
    await ctx.handle('add-to-cart').click(1)

    expect(addItem).toBeCalledTimes(1)
    expect(addItem).toBeCalledWith({
      sku: '123456789',
      amount: 1,
    })
  })

  describe('cart-button and amount-input', () => {
    beforeEach(async () => {
      await factory
        .module('productDetail')
        .fn('fetch')
        .mock({
          fixture: 'simple',
          transform: (data: Variant[]) => {
            data[0].sellable = true
            return data
          },
        })
    })

    it('displays amount-controlls when article is sellable', async () => {
      await factory
        .module('productDetail')
        .fn('fetch')
        .mock({
          fixture: 'simple',
          transform: (data: Variant[]) => {
            data[0].sellable = true
            return data
          },
        })

      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      ctx.shouldHaveState('has-amount-controls')
    })

    it('hides amount-controlls when article is not sellable', async () => {
      await factory
        .module('productDetail')
        .fn('fetch')
        .mock({
          fixture: 'simple',
          transform: (data: Variant[]) => {
            data[0].sellable = false
            return data
          },
        })

      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      ctx.shouldNotHaveState('has-amount-controls')
    })

    it('can update amount with plus/minus buttons and by editing the amount field', async () => {
      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      ctx.handle('amount').should('have.value', '1')

      await ctx.handle('increase-amount').click(1)
      ctx.handle('amount').should('have.value', '2')

      await ctx.handle('decrease-amount').click(1)
      ctx.handle('amount').should('have.value', '1')

      await ctx.handle('amount').type('4', 1)
      ctx.handle('amount').should('have.value', '4')
    })

    it('cannot set amount greater 999', async () => {
      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      await ctx.handle('amount').type('999', 1)
      ctx.handle('amount').should('have.value', '999')

      await ctx.handle('increase-amount').click(1)
      ctx.handle('amount').should('have.value', '999')
    })

    it('cannot set amount below 1', async () => {
      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      ctx.handle('amount').should('have.value', '1')

      await ctx.handle('decrease-amount').click(1)
      ctx.handle('amount').should('have.value', '1')
    })

    it('can not set characters except numbers (remove illegal chars)', async () => {
      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      await ctx.handle('amount').type('3j4n!?')
      ctx.handle('amount').should('have.value', '34')
    })

    it('updates the price when amount increases/decreases', async () => {
      await factory
        .module('productDetail')
        .fn('fetch')
        .mock({
          fixture: 'simple',
          transform: (data: Variant[]) => {
            data[0].sellable = true
            data[0].prices.packPriceGross = 2
            data[0].prices.packPriceNet = 2
            return data
          },
        })
      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      ctx.handle('pack-price-sum').should('contain.text', '2,00')

      await ctx.handle('increase-amount').click(1)
      ctx.handle('pack-price-sum').should('contain.text', '4,00')
    })
  })

  describe('special icons', () => {
    it('displays energy-label when article has attribute ENERGY_EFFICIENCY_CLASS', async () => {
      await factory
        .module('productDetail')
        .fn('fetch')
        .mock({
          fixture: 'simple',
          transform: (data: Variant[]) => {
            data[0].attributes = {
              ENERGY_EFFICIENCY_CLASS: {
                is_filter: false,
                is_pdp_attribute: false,
                label: 'Energieeffizienzklasse',
                values: [{ value: 'A' }],
              },
            }
            return data
          },
        })

      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      ctx.shouldHaveState('show-energy-label')
    })

    it('displays warranty-repurchase icon when article has attribute WARRANTY_REPURCHASE', async () => {
      await factory
        .module('productDetail')
        .fn('fetch')
        .mock({
          fixture: 'simple',
          transform: (data: Variant[]) => {
            data[0].attributes = {
              WARRANTY_REPURCHASE: {
                is_filter: false,
                is_pdp_attribute: true,
                label: 'Nachkaufgarantie (Jahre)',
                values: [{ value: '10 Jahre' }],
              },
            }
            return data
          },
        })

      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      ctx.shouldHaveState('show-warrantyRepurchase')
    })

    it('hides warranty-repurchase icon when article has attribute ENERGY_EFFICIENCY_CLASS', async () => {
      await factory
        .module('productDetail')
        .fn('fetch')
        .mock({
          fixture: 'simple',
          transform: (data: Variant[]) => {
            data[0].attributes = {
              ENERGY_EFFICIENCY_CLASS: {
                is_filter: false,
                is_pdp_attribute: false,
                label: 'Energieeffizienzklasse',
                values: [{ value: 'A' }],
              },
              WARRANTY_REPURCHASE: {
                is_filter: false,
                is_pdp_attribute: true,
                label: 'Nachkaufgarantie (Jahre)',
                values: [{ value: '10 Jahre' }],
              },
            }
            return data
          },
        })

      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      ctx.shouldNotHaveState('show-warrantyRepurchase')
    })

    it('displays diposal of legacy device icon when article has attribute DISPOSAL_OF_LEGACY_DEVICE and feature is activated in config', async () => {
      config.features.disposalOfLegacyDevice = '?'
      await factory
        .module('productDetail')
        .fn('fetch')
        .mock({
          fixture: 'simple',
          transform: (data: Variant[]) => {
            data[0].attributes = {
              DISPOSAL_OF_LEGACY_DEVICE: {
                is_filter: false,
                is_pdp_attribute: false,
                label: 'Altgerät Entsorgung',
                values: [{ value: 'Ja' }],
              },
            }
            return data
          },
        })

      const f = await factory.create()
      const ctx = f.context('templates/PDP')

      ctx.shouldHaveState('legacyDevice')
    })
  })
})
