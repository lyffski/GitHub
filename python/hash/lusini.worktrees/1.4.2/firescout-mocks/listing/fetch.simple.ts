import { api } from '../../src/modules/listing/types'

export const result: api.Fetch = {
  hits: [
    {
      sku: '100',
      title: 'Title',
      brand: 'Brand',
      subtitle: '',
      containerID: '100',
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
      attributes: {
        BRAND: {
          label: 'Marke',
          values: [
            {
              icon: 'pim/92a8f2/f4f1c2/e01903/fa84f8/5201f3/87/92a8f2f4f1c2e01903fa84f85201f387.svg',
              value: 'VEGA',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        COLOR: {
          label: 'Farbe',
          values: [
            {
              value: 'schwarz',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        WIDTH: {
          label: 'Breite',
          values: [
            {
              unit: 'cm',
              value: 42,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        HEIGHT: {
          label: 'Höhe',
          values: [
            {
              unit: 'cm',
              value: 72,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        LENGTH: {
          label: 'Länge',
          values: [
            {
              unit: 'cm',
              value: 42,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        MATERIAL: {
          label: 'Material',
          values: [
            {
              value: 'Stahl',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        EMG_BRAND: {
          label: 'EMG-Marke',
          values: [
            {
              value: 'Vega',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        HAS_STOCK: {
          label: 'Sofort verfügbar',
          values: [
            {
              value: true,
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        HIGHLIGHT: {
          label: 'Highlight',
          values: [
            {
              value: '.',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        COLORSPACE: {
          label: 'Farbton',
          values: [
            {
              icon: 'pim/1877f0/de4cf0/b754b7/970691/af0281/59/1877f0de4cf0b754b7970691af028159.svg',
              value: 'Schwarz',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        WEIGHT_NET: {
          label: 'Gewicht netto',
          values: [
            {
              unit: 'kg',
              value: 20.6,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        MEASUREMENTS: {
          label: 'Abmessung',
          values: [
            {
              value: '42x42x72 cm (BxLxH)',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        PRODUCT_NAME: {
          label: 'Produktname (Verkauf)',
          values: [
            {
              value: 'Tischsäule Nostalgie',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        PRODUCT_TYPE: {
          label: 'PRODUCT_TYPE',
          values: [
            {
              value: 'Tischsäulen',
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        LIMIT_TABLETOP: {
          label: 'Max. zul. Tischplattengröße',
          values: [
            {
              value: '80 cm (Ø), 70x70 cm (BxL)',
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        STYLE_CATEGORY: {
          label: 'Stilwelt',
          values: [
            {
              value: 'Local Treasuries',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        MATERIAL_DETAILS: {
          label: 'Materialdetails',
          values: [
            {
              value: 'Stahlguss pulverbeschichtet',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        DELIVERYCONDITION: {
          label: 'Lieferzustand',
          values: [
            {
              value: 'Zerlegt',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        OUTDOOR_INDOOR_USE: {
          label: 'Einsatzbereich',
          values: [
            {
              value: 'Innen',
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        PROPERTIES_PRODUCT: {
          label: 'Produkteigenschaft',
          values: [
            {
              value: 'besonders kratzfest',
            },
            {
              value: 'pflegeleicht',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        WARRANTY_REPURCHASE: {
          label: 'Nachkaufgarantie(Jahre)',
          values: [
            {
              icon: 'pim/66bfc1/feeab4/1e22ef/b777f1/7e8333/8d/66bfc1feeab41e22efb777f17e83338d.svg',
              value: '3 Jahre',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        LIMIT_TABLETOP_ROUND: {
          label: 'Max. empf. Tischplattengröße (rund)',
          values: [
            {
              value: '80 cm (Ø)',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        LOWER_LIMIT_TABLETOP: {
          label: 'Min. empf. Tischplattengröße',
          values: [
            {
              value: '60 cm (Ø), 50x50 cm (BxL)',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        LIMIT_TABLETOP_ANGULAR: {
          label: 'Max. empf. Tischplattengröße (eckig)',
          values: [
            {
              value: '70x70 cm (BxL)',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        LOW_LIMIT_TABLETOP_ROUND: {
          label: 'Min. empf. Tischplattengröße (rund)',
          values: [
            {
              value: '60 cm (Ø)',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        WARRANTY_REPURCHASE_ICON: {
          label: 'Nachkaufgarantie Icon',
          values: [
            {
              value: '400527',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        WIDTH_MAX_RECOM_TABLETOP: {
          label: 'Breite (max. empf. Tischplattengröße)',
          values: [
            {
              unit: 'cm',
              value: 70,
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        WIDTH_MIN_RECOM_TABLETOP: {
          label: 'Breite (min. empf. Tischplattengröße)',
          values: [
            {
              unit: 'cm',
              value: 50,
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        DIAMET_MAX_RECOM_TABLETOP: {
          label: 'Durchmesser (max. empf. Tischplattengröße)',
          values: [
            {
              unit: 'cm',
              value: 80,
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        DIAMET_MIN_RECOM_TABLETOP: {
          label: 'Durchmesser (min. empf. Tischplattengröße)',
          values: [
            {
              unit: 'cm',
              value: 60,
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        LENGTH_MAX_RECOM_TABLETOP: {
          label: 'Länge (max. empf. Tischplattengröße)',
          values: [
            {
              unit: 'cm',
              value: 70,
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        LENGTH_MIN_RECOM_TABLETOP: {
          label: 'Länge (min. empf. Tischplattengröße)',
          values: [
            {
              unit: 'cm',
              value: 50,
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        LOW_LIMIT_TABLETOP_ANGULA: {
          label: 'Min. empf. Tischplattengröße (eckig)',
          values: [
            {
              value: '50x50 cm (BxL)',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
      },
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
        packPriceNet: 23.99,
        discountGroup: 'Samuel IV',
        piecePriceNet: 23.99,
        packPriceGross: 28.55,
        piecePriceGross: 28.55,
        referencePriceNet: null,
        packPseudoPriceNet: 0,
        piecePriceNetString: '23,99 € / Stück',
        piecePseudoPriceNet: 0,
        referencePriceGross: null,
        packPseudoPriceGross: 0,
        piecePriceGrossString: '28,55 € / Stück',
        piecePseudoPriceGross: 0,
        referencePriceNetString: null,
        referencePriceGrossString: null,
        productCheapestPiecePriceNet: 22.07,
        productCheapestPiecePriceGross: 26.26,
        productMostexpensivePiecePriceNet: 23.99,
        productMostexpensivePiecePriceGross: 28.55,
        ecoTaxNet: null,
        ecoTaxGross: null,
      },
      priceRules: [
        {
          customerGroupKey: 'DE',
          from: 0,
          to: 4,
          discountGroup: 'Samuel IV',
          packPriceNet: 23.99,
          packPriceGross: 28.55,
          piecePriceNet: 23.99,
          piecePriceGross: 28.55,
          packPseudoPriceNet: 0,
          packPseudoPriceGross: 0,
          piecePseudoPriceNet: 0,
          piecePseudoPriceGross: 0,
          piecePriceNetString: '23,99 € / Stück',
          piecePriceGrossString: '28,55 € / Stück',
          referencePriceNet: null,
          referencePriceGross: null,
          referencePriceNetString: null,
          referencePriceGrossString: null,
          productCheapestPiecePriceNet: 22.07,
          productCheapestPiecePriceGross: 26.26,
          productMostexpensivePiecePriceNet: 23.99,
          productMostexpensivePiecePriceGross: 28.55,
          ecoTaxNet: null,
          ecoTaxGross: null,
        },
        {
          customerGroupKey: 'DE',
          from: 5,
          to: 'beliebig',
          discountGroup: 'Samuel IV',
          packPriceNet: 22.07,
          packPriceGross: 26.26,
          piecePriceNet: 22.07,
          piecePriceGross: 26.26,
          packPseudoPriceNet: 0,
          packPseudoPriceGross: 0,
          piecePseudoPriceNet: 0,
          piecePseudoPriceGross: 0,
          piecePriceNetString: '22,07 € / Stück',
          piecePriceGrossString: '26,26 € / Stück',
          referencePriceNet: null,
          referencePriceGross: null,
          referencePriceNetString: null,
          referencePriceGrossString: null,
          productCheapestPiecePriceNet: 22.07,
          productCheapestPiecePriceGross: 26.26,
          productMostexpensivePiecePriceNet: 23.99,
          productMostexpensivePiecePriceGross: 28.55,
          ecoTaxNet: null,
          ecoTaxGross: null,
        },
      ],
      images: {
        imageWeb: [
          {
            url: 'pim/162fa2/c6b3b9/3e1f79/737b27/4ce1ef/07/162fa2c6b3b93e1f79737b274ce1ef07.jpeg',
            classes: ['ASSET_FS'],
          },
          {
            url: 'pim/dea84b/fe667a/3bc256/97d54d/4d3ab7/4a/dea84bfe667a3bc25697d54d4d3ab74a.jpeg',
            classes: ['ASSET_M'],
          },
        ],
      },
      variantImages: [
        'pim/162fa2/c6b3b9/3e1f79/737b27/4ce1ef/07/162fa2c6b3b93e1f79737b274ce1ef07.jpeg',
        'pim/b9c057/760a20/334fa3/e8d81f/f9a4eb/49/b9c057760a20334fa3e8d81ff9a4eb49.jpeg',
      ],
      flags: [],
      objectID: '10002717',
    },
  ],
  page: 0,
  nbPages: 3,
  minPrice: 10.39,
  maxPrice: 89.99,
  numericFacets: {
    LENGTH: { min: 3, max: 15 },
  },
  facets: {
    HAS_STOCK: [
      {
        label: 'true',
        nbHits: 50,
      },
      {
        label: 'false',
        nbHits: 5,
      },
    ],
    COLORSPACE: [
      {
        label: 'Weiß',
        nbHits: 23,
      },
      {
        label: 'Grau',
        nbHits: 8,
      },
      {
        label: 'Mehrfarbig',
        nbHits: 8,
      },
      {
        label: 'Blau',
        nbHits: 7,
      },
      {
        label: 'Schwarz',
        nbHits: 7,
      },
      {
        label: 'Grün',
        nbHits: 1,
      },
      {
        label: 'Rot',
        nbHits: 1,
      },
    ],
    MATERIAL: [
      {
        label: 'Mischgewebe',
        nbHits: 30,
      },
      {
        label: 'Baumwolle',
        nbHits: 25,
      },
    ],
    LENGTH: [],
    WIDTH: [],
    DIAMETER: [],
    HEIGHT: [],
    SHAPE: [],
    OUTDOOR_INDOOR_USE: [],
    CONTENT: [],
    SIZE: [],
    CLOTHINGSIZE: [
      {
        label: '44',
        nbHits: 29,
      },
      {
        label: '46',
        nbHits: 6,
      },
      {
        label: '48',
        nbHits: 1,
      },
      {
        label: '50',
        nbHits: 2,
      },
      {
        label: '52',
        nbHits: 3,
      },
      {
        label: '54',
        nbHits: 1,
      },
      {
        label: '56',
        nbHits: 1,
      },
      {
        label: '58',
        nbHits: 4,
      },
      {
        label: '60',
        nbHits: 3,
      },
      {
        label: '64',
        nbHits: 1,
      },
      {
        label: 'XS',
        nbHits: 2,
      },
      {
        label: '44/46',
        nbHits: 1,
      },
      {
        label: 'XL',
        nbHits: 1,
      },
    ],
    MATERIAL_BASE: [],
    SHOESIZE: [],
    WIDTH_PILLOW: [],
    LENGTH_PILLOW: [],
    PRODUCT_TYPE: [
      {
        label: 'Jacken',
        nbHits: 47,
      },
      {
        label: 'Kochjacken',
        nbHits: 7,
      },
    ],
    MATERIAL_SEAT: [],
    USERGROUP: [
      {
        label: 'Herren',
        nbHits: 53,
      },
      {
        label: 'Unisex',
        nbHits: 2,
      },
    ],
    YARN_TYPE: [],
    GRAMMAGE: [
      {
        label: '175 g/m²',
        nbHits: 11,
      },
      {
        label: '200 g/m²',
        nbHits: 10,
      },
      {
        label: '215 g/m²',
        nbHits: 6,
      },
      {
        label: '160 g/m²',
        nbHits: 5,
      },
      {
        label: '205 g/m²',
        nbHits: 4,
      },
      {
        label: '180 g/m²',
        nbHits: 3,
      },
      {
        label: '212 g/m²',
        nbHits: 3,
      },
      {
        label: '170 g/m²',
        nbHits: 2,
      },
      {
        label: '185 g/m²',
        nbHits: 2,
      },
      {
        label: '190 g/m²',
        nbHits: 2,
      },
      {
        label: '255 g/m²',
        nbHits: 2,
      },
      {
        label: '195 g/m²',
        nbHits: 1,
      },
      {
        label: '210 g/m²',
        nbHits: 1,
      },
      {
        label: '220 g/m²',
        nbHits: 1,
      },
      {
        label: '245 g/m²',
        nbHits: 1,
      },
    ],
    BRAND: [
      {
        label: 'JOBELINE',
        nbHits: 39,
      },
      {
        label: 'PULSIVA',
        nbHits: 16,
      },
    ],
    DEPTH: [],
    STACKABLE: [],
    FITTING: [
      {
        label: 'Regular Fit',
        nbHits: 13,
      },
    ],
    FILLING_MARK: [],
    SLEEVE_LENGTH: [
      {
        label: 'Langarm',
        nbHits: 34,
      },
      {
        label: 'Halbarm',
        nbHits: 19,
      },
      {
        label: 'Dreiviertelarm',
        nbHits: 1,
      },
    ],
    ARMRESTS: [],
    WEAVING: [
      {
        label: 'Köper',
        nbHits: 10,
      },
      {
        label: 'Denim',
        nbHits: 7,
      },
      {
        label: 'Leinwand',
        nbHits: 3,
      },
      {
        label: 'Chambray',
        nbHits: 2,
      },
      {
        label: 'Waffelpiqué',
        nbHits: 2,
      },
    ],
    IS_WIPEABLE: [],
    THICKNESS: [],
    GN_COMPATIBILITY: [],
    MATERIAL_HANDLE: [],
    HEIGHT_ARMREST: [],
    TYPE_CLASP: [],
    HEIGHT_SEAT: [],
    MATERIAL_TABLE: [],
    COLOR_TABLE: [],
    PATTERN: [
      {
        label: 'einfarbig',
        nbHits: 48,
      },
      {
        label: 'gestreift',
        nbHits: 1,
      },
    ],
    DIAMETER_MAX: [],
    MATERIAL_FILL: [],
    DIAMETER_MIRROR: [],
    HOBTYPE: [],
    DIAMETER_POT: [],
    BURNING_TIME: [],
    LOAD_MAX: [],
    SCENT: [],
    STACKABLE_FURNITURE: [],
    MATERIAL_PILLOWCASE: [],
    LIMIT_TABLETOP: [],
    KNIFETYPE: [],
    SHAPE_COLLAR: [
      {
        label: 'Schalkragen',
        nbHits: 1,
      },
    ],
    LIMIT_HEIGHT_MATTRESS: [],
    WIDTH_MIN: [],
    WIDTH_MAX: [],
    WEIGHT_FILL: [],
    SLIDEINSYSTEM: [],
    MATERIAL_FRAME: [],
    LENGTH_MIN: [],
    LENGTH_MAX: [],
    WEIGHT_NET: [],
    FOLDABLE: [],
    CONNECTOR_POWER: [],
    ENERGY_EFFICIENCY_CLASS: [],
    ILLUMINANT: [],
    MATERIAL_LINING: [],
    MATERIAL_SOLE: [],
    MATERIAL_UPPERS: [],
    POWER: [],
    SOCKET: [],
    WIDTH_MIRROR: [],
    WIDTH_RIM: [],
    WIDTH_SEAT: [],
  },
  categoryTree: [
    {
      name: 'Barzubehör',
      path: 'Barzubehör',
      count: 414,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/barzubehoer/',
    },
    {
      name: 'Berufsbekleidung',
      path: 'Berufsbekleidung',
      count: 98,
      isRefined: true,
      exhaustive: true,
      data: [
        {
          name: 'Kochbekleidung',
          path: 'Berufsbekleidung > Kochbekleidung',
          count: 98,
          isRefined: true,
          exhaustive: true,
          data: [
            {
              name: 'Kochjacken',
              path: 'Berufsbekleidung > Kochbekleidung > Kochjacken',
              count: 98,
              isRefined: true,
              exhaustive: true,
              data: [
                {
                  name: 'Kochjacken Damen',
                  path: 'Berufsbekleidung > Kochbekleidung > Kochjacken > Kochjacken Damen',
                  count: 45,
                  isRefined: false,
                  exhaustive: true,
                  data: null,
                  urlPath:
                    '/category/berufsbekleidung/kochbekleidung/kochjacken/kochjacken-damen/',
                },
                {
                  name: 'Kochjacken Herren',
                  path: 'Berufsbekleidung > Kochbekleidung > Kochjacken > Kochjacken Herren',
                  count: 55,
                  isRefined: true,
                  exhaustive: true,
                  data: [],
                  urlPath:
                    '/category/berufsbekleidung/kochbekleidung/kochjacken/kochjacken-herren/',
                },
                {
                  name: 'Kochjacken-Serien',
                  path: 'Berufsbekleidung > Kochbekleidung > Kochjacken > Kochjacken-Serien',
                  count: 68,
                  isRefined: false,
                  exhaustive: true,
                  data: null,
                  urlPath:
                    '/category/berufsbekleidung/kochbekleidung/kochjacken/kochjacken-serien/',
                },
              ],
              urlPath: '/category/berufsbekleidung/kochbekleidung/kochjacken/',
            },
          ],
          urlPath: '/category/berufsbekleidung/kochbekleidung/',
        },
      ],
      urlPath: '/category/berufsbekleidung/',
    },
    {
      name: 'Besteck',
      path: 'Besteck',
      count: 602,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/besteck/',
    },
    {
      name: 'Buffet',
      path: 'Buffet',
      count: 2219,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/buffet/',
    },
    {
      name: 'Deko',
      path: 'Deko',
      count: 540,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/deko/',
    },
    {
      name: 'Geschirr',
      path: 'Geschirr',
      count: 1473,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/geschirr/',
    },
    {
      name: 'Gläser',
      path: 'Gläser',
      count: 548,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/glaeser/',
    },
    {
      name: 'Hotelbedarf',
      path: 'Hotelbedarf',
      count: 765,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/hotelbedarf/',
    },
    {
      name: 'Küche',
      path: 'Küche',
      count: 2462,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/kueche/',
    },
    {
      name: 'Marken',
      path: 'Marken',
      count: 6753,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/marken/',
    },
    {
      name: 'Möbel',
      path: 'Möbel',
      count: 1122,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/moebel/',
    },
    {
      name: 'Schutzprodukte',
      path: 'Schutzprodukte',
      count: 134,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/schutzprodukte/',
    },
    {
      name: 'Speisekarten & Tafeln',
      path: 'Speisekarten & Tafeln',
      count: 242,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/speisekarten-und-tafeln/',
    },
    {
      name: 'Take Away',
      path: 'Take Away',
      count: 812,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/take-away/',
    },
    {
      name: 'Textilien',
      path: 'Textilien',
      count: 1091,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/textilien/',
    },
    {
      name: 'Tischzubehör',
      path: 'Tischzubehör',
      count: 727,
      isRefined: false,
      exhaustive: true,
      data: null,
      urlPath: '/category/tischzubehoer/',
    },
  ],
  nbHits: 55,
}

export default result
