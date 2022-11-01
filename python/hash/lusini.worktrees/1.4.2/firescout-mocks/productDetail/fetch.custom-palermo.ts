import { api } from '../../../../src/modules/productDetail/types'

/**
 * @since 29.04.2022
 * @from http://localhost:8000/pdp/124430/#sku=30025858
 *
 * - 5 colors
 * - 4 shapes
 * - 2 brink types
 *
 */

const data: api.Fetch =
  /*fs-start*/
  [
    {
      sku: '30025858',
      title: 'Tischwäsche Palermo nach Maß genäht je m²',
      subtitle: ' weiß',
      description:
        '<p>Tischdecke Palermo im Wunschmaß</p>\n<p>Sie möchten die Tischwäsche Palermo in Ihrer Wunschgröße kaufen? Dann fertigt unser Nähservice gerne Tischdecken, Mitteldecken &amp; Co. nach Ihren individuellen Vorgaben für Sie an. Nutzen Sie unseren Nähkonfigurator für Ihre individuelle Maßanfertigung. Die erstklassige Damast-Tischwäsche Palermo eignet sich für den täglichen Gebrauch im Restaurant als Deckserviette und lässt sich wunderbar mit anderer Tischwäsche kombinieren. Zudem ist sie pflegeleicht und strapazierfähig.</p>\n<ul>\n<li>Stofftischdecke nach Ihren individuellen Wünschen gefertigt</li>\n<li>in erstklassiger Damast-Qualität</li>\n<li>feine Glattwebung</li>\n<li>schöner Glanzeffekt und Formstabilität durch Mercerisierung</li>\n<li>langlebiges Vollzwirn-Material</li>\n<li>in verschiedenen stilvollen Farben erhältlich</li>\n<li>Kuvertsaum oder Normalsaum möglich</li>\n<li>Einstickungen auf Anfrage möglich – nutzen Sie unseren Nähservice!</li>\n<li>aus 100% Baumwolle</li>\n<li>bei 95 °C maschinenwaschbar, kann gechlort werden, trocknergeeignet</li>\n<li>Gewicht ca. 195 g/m²</li>\n<li>Bitte beachten Sie, dass Sondergrößen vom Umtausch ausgeschlossen sind</li>\n</ul>\n<p>Bestellen Sie Ihre maßgeschneiderte Tischwäsche Palermo einfach und unkompliziert über unseren Nähkonfigurator.</p>',
      brand: 'ERWIN M.',
      containerID: '124430',
      sellable: true,
      sellOut: false,
      stock: 0,
      shippingFree: false,
      specialDelivery: false,
      deliveryDate: '2022-05-05',
      deliveryDays: 7,
      specimen: {
        isSpecimen: false,
        hasSpecimenProducts: ['124060', '124063'],
      },
      product_line: ['tischwaesche-serie-palermo'],
      series: ['Tischwäsche-Serie Palermo'],
      variantData: {
        size: {},
        color: {
          label: 'weiß',
        },
        style: {},
        variant: {},
      },
      attributes: {
        BRAND: {
          label: 'Marke',
          values: [
            {
              icon: 'pim/e9fdfd/02b291/8398b0/a53537/141af4/8e/e9fdfd02b2918398b0a53537141af48e.svg',
              value: 'ERWIN M.',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        COLOR: {
          label: 'Farbe',
          values: [
            {
              value: 'weiß',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        FEATURE: {
          label: 'Feature',
          values: [
            {
              value: 'besonders strapazierfähig',
            },
            {
              value: 'mercerisiert',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        GRAMMAGE: {
          label: 'Grammatur',
          values: [
            {
              value: '195 g/m²',
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        MATERIAL: {
          label: 'Material',
          values: [
            {
              value: 'Baumwolle',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        EMG_BRAND: {
          label: 'EMG-Marke',
          values: [
            {
              value: 'Hotelwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        HAS_STOCK: {
          label: 'Sofort verfügbar',
          values: [
            {
              value: 'false',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        HIGHLIGHT: {
          label: 'Highlight',
          values: [
            {
              value:
                '100% Baumwolle, Vollzwirn, mercerisiert. Gewicht ca. 195 g/m².',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SHRINKAGE: {
          label: 'Einsprung',
          values: [
            {
              value: '5 %',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        WIDTH_MAX: {
          label: 'Breite (max)',
          values: [
            {
              unit: 'cm',
              value: 258,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        WIDTH_MIN: {
          label: 'Breite (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        COLORSPACE: {
          label: 'Farbton',
          values: [
            {
              icon: 'pim/6ec6b7/971c26/70fe96/6f5ca9/b397f5/61/6ec6b7971c2670fe966f5ca9b397f561.svg',
              value: 'Weiß',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        LENGTH_MAX: {
          label: 'Länge (max)',
          values: [
            {
              unit: 'cm',
              value: 4000,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        LENGTH_MIN: {
          label: 'Länge (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        PRODUCT_NAME: {
          label: 'Produktname (Verkauf)',
          values: [
            {
              value: 'Tischwäsche Palermo nach Maß genäht je m²',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        CUSTOMIZEABLE: {
          label: 'Customizebar',
          values: [
            {
              value: 'Muss',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SKU_SORT_NUMBER: {
          label: 'SKU Sort Number',
          values: [
            {
              value: '2',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        MATERIAL_DETAILS: {
          label: 'Materialdetails',
          values: [
            {
              value: '100% Baumwolle',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CARE_INSTRUCTIONS: {
          label: 'Pflegehinweise',
          values: [
            {
              icon: 'pim/739566/034d0d/4354a3/67e634/967834/af/739566034d0d4354a367e634967834af.svg',
              value: 'Im Standardprogramm des Trockners trocknen',
            },
            {
              icon: 'pim/7a00bd/89d5d5/f7d4ca/cdc49c/e9292e/d5/7a00bd89d5d5f7d4cacdc49ce9292ed5.svg',
              value: 'Normalwaschgang bis 95°C',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CONFIGURATION_MODEL: {
          label: 'Konfigurationsmodell',
          values: [
            {
              value: 'Nähen Tischwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
      },
      categories: { lvl0: [''] },
      unit: {
        unitName: 'Meter',
        purchaseUnit: 1,
        referenceUnit: 1,
        packUnit: 'Meter',
      },
      prices: {
        ecoTaxNet: null,
        ecoTaxGross: null,
        packPriceNet: 13.99,
        discountGroup: null,
        piecePriceNet: 13.99,
        packPriceGross: 16.65,
        piecePriceGross: 16.65,
        referencePriceNet: null,
        packPseudoPriceNet: 0,
        piecePriceNetString: '13,99 € / Meter',
        piecePseudoPriceNet: 0,
        referencePriceGross: null,
        packPseudoPriceGross: 0,
        piecePriceGrossString: '16,65 € / Meter',
        piecePseudoPriceGross: 0,
        referencePriceNetString: null,
        referencePriceGrossString: null,
        piecePriceNetString_template: '13,99 € / {$unit}',
        productCheapestPiecePriceNet: 13.99,
        piecePriceGrossString_template: '16,65 € / {$unit}',
        productCheapestPiecePriceGross: 16.65,
        productMostexpensivePiecePriceNet: 13.99,
        productMostexpensivePiecePriceGross: 16.65,
      },
      priceRules: [
        {
          customerGroupKey: 'DE',
          from: 0,
          to: 'beliebig',
          discountGroup: null,
          packPriceNet: 13.99,
          packPriceGross: 16.65,
          piecePriceNet: 13.99,
          piecePriceGross: 16.65,
          packPseudoPriceNet: 0,
          packPseudoPriceGross: 0,
          piecePseudoPriceNet: 0,
          piecePseudoPriceGross: 0,
          piecePriceNetString: '13,99 € / Meter',
          piecePriceGrossString: '16,65 € / Meter',
          piecePriceNetString_template: '13,99 € / {$unit}',
          piecePriceGrossString_template: '16,65 € / {$unit}',
          referencePriceNet: null,
          referencePriceGross: null,
          referencePriceNetString: null,
          referencePriceGrossString: null,
          productCheapestPiecePriceNet: 13.99,
          productCheapestPiecePriceGross: 16.65,
          productMostexpensivePiecePriceNet: 13.99,
          productMostexpensivePiecePriceGross: 16.65,
          ecoTaxNet: null,
          ecoTaxGross: null,
        },
      ],
      images: {
        imageWeb: [
          {
            url: 'pim/f47195/7cec3a/fd7cf6/5059b8/9b82f1/5a/f471957cec3afd7cf65059b89b82f15a.jpeg',
            classes: ['ASSET_FS'],
          },
        ],
        image360: [],
        video: [],
      },
      flags: ['series'],
      related: {
        crossSells: ['10014924', '10013943', '10014976', '10014977'],
        alternatives: ['30026185', '30051824', '30026125'],
        optionalAdditions: [],
        configurableRelations: [],
      },
      documents: [],
      hreflang: [
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
      ],
      mainCategory: { lvl0: [''] },
      configurations: {
        custom_tailor: {
          is_custom_tailor: true,
          configuration_data: {
            brinks: [
              {
                type: 'normal',
                length: [],
              },
              {
                type: 'cuvert',
                length: [3, 4, 5],
                activeAt: ['rectangular', 'square'],
                additionalPricePercent: 0.2,
              },
            ],
            shapes: ['oval', 'rectangular', 'round', 'square'],
          },
        },
      },
      objectID: '30025858',
    },
    {
      sku: '30025857',
      title: 'Tischwäsche Palermo nach Maß genäht je m²',
      subtitle: ' steingrau',
      description:
        '<p>Tischdecke Palermo im Wunschmaß</p>\n<p>Sie möchten die Tischwäsche Palermo in Ihrer Wunschgröße kaufen? Dann fertigt unser Nähservice gerne Tischdecken, Mitteldecken &amp; Co. nach Ihren individuellen Vorgaben für Sie an. Nutzen Sie unseren Nähkonfigurator für Ihre individuelle Maßanfertigung. Die erstklassige Damast-Tischwäsche Palermo eignet sich für den täglichen Gebrauch im Restaurant als Deckserviette und lässt sich wunderbar mit anderer Tischwäsche kombinieren. Zudem ist sie pflegeleicht und strapazierfähig.</p>\n<ul>\n<li>Stofftischdecke nach Ihren individuellen Wünschen gefertigt</li>\n<li>in erstklassiger Damast-Qualität</li>\n<li>feine Glattwebung</li>\n<li>schöner Glanzeffekt und Formstabilität durch Mercerisierung</li>\n<li>langlebiges Vollzwirn-Material</li>\n<li>in verschiedenen stilvollen Farben erhältlich</li>\n<li>Kuvertsaum oder Normalsaum möglich</li>\n<li>Einstickungen auf Anfrage möglich – nutzen Sie unseren Nähservice!</li>\n<li>aus 100% Baumwolle</li>\n<li>bei 95 °C maschinenwaschbar, kann gechlort werden, trocknergeeignet</li>\n<li>Gewicht ca. 195 g/m²</li>\n<li>Bitte beachten Sie, dass Sondergrößen vom Umtausch ausgeschlossen sind</li>\n</ul>\n<p>Bestellen Sie Ihre maßgeschneiderte Tischwäsche Palermo einfach und unkompliziert über unseren Nähkonfigurator.</p>',
      brand: 'ERWIN M.',
      containerID: '124430',
      sellable: true,
      sellOut: false,
      stock: 0,
      shippingFree: false,
      specialDelivery: false,
      deliveryDate: '2022-05-05',
      deliveryDays: 7,
      specimen: {
        isSpecimen: false,
        hasSpecimenProducts: ['124060', '124063'],
      },
      product_line: ['tischwaesche-serie-palermo'],
      series: ['Tischwäsche-Serie Palermo'],
      variantData: {
        size: {},
        color: {
          label: 'steingrau',
        },
        style: {},
        variant: {},
      },
      attributes: {
        BRAND: {
          label: 'Marke',
          values: [
            {
              icon: 'pim/e9fdfd/02b291/8398b0/a53537/141af4/8e/e9fdfd02b2918398b0a53537141af48e.svg',
              value: 'ERWIN M.',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        COLOR: {
          label: 'Farbe',
          values: [
            {
              value: 'steingrau',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        FEATURE: {
          label: 'Feature',
          values: [
            {
              value: 'besonders strapazierfähig',
            },
            {
              value: 'mercerisiert',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        GRAMMAGE: {
          label: 'Grammatur',
          values: [
            {
              value: '195 g/m²',
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        MATERIAL: {
          label: 'Material',
          values: [
            {
              value: 'Baumwolle',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        EMG_BRAND: {
          label: 'EMG-Marke',
          values: [
            {
              value: 'Hotelwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        HAS_STOCK: {
          label: 'Sofort verfügbar',
          values: [
            {
              value: 'false',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        HIGHLIGHT: {
          label: 'Highlight',
          values: [
            {
              value:
                '100% Baumwolle, Vollzwirn, mercerisiert. Gewicht ca. 195 g/m².',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SHRINKAGE: {
          label: 'Einsprung',
          values: [
            {
              value: '5 %',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        WIDTH_MAX: {
          label: 'Breite (max)',
          values: [
            {
              unit: 'cm',
              value: 258,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        WIDTH_MIN: {
          label: 'Breite (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        COLORSPACE: {
          label: 'Farbton',
          values: [
            {
              icon: 'pim/7a5bb7/c25cac/3f037b/313ac2/ef358e/0b/7a5bb7c25cac3f037b313ac2ef358e0b.svg',
              value: 'Grau',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        LENGTH_MAX: {
          label: 'Länge (max)',
          values: [
            {
              unit: 'cm',
              value: 4000,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        LENGTH_MIN: {
          label: 'Länge (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        PRODUCT_NAME: {
          label: 'Produktname (Verkauf)',
          values: [
            {
              value: 'Tischwäsche Palermo nach Maß genäht je m²',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        CUSTOMIZEABLE: {
          label: 'Customizebar',
          values: [
            {
              value: 'Muss',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SKU_SORT_NUMBER: {
          label: 'SKU Sort Number',
          values: [
            {
              value: '7',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        MATERIAL_DETAILS: {
          label: 'Materialdetails',
          values: [
            {
              value: '100% Baumwolle',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CARE_INSTRUCTIONS: {
          label: 'Pflegehinweise',
          values: [
            {
              icon: 'pim/739566/034d0d/4354a3/67e634/967834/af/739566034d0d4354a367e634967834af.svg',
              value: 'Im Standardprogramm des Trockners trocknen',
            },
            {
              icon: 'pim/7a00bd/89d5d5/f7d4ca/cdc49c/e9292e/d5/7a00bd89d5d5f7d4cacdc49ce9292ed5.svg',
              value: 'Normalwaschgang bis 95°C',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CONFIGURATION_MODEL: {
          label: 'Konfigurationsmodell',
          values: [
            {
              value: 'Nähen Tischwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
      },
      categories: { lvl0: [''] },
      unit: {
        unitName: 'Meter',
        purchaseUnit: 1,
        referenceUnit: 1,
        packUnit: 'Meter',
      },
      prices: {
        ecoTaxNet: null,
        ecoTaxGross: null,
        packPriceNet: 13.99,
        discountGroup: null,
        piecePriceNet: 13.99,
        packPriceGross: 16.65,
        piecePriceGross: 16.65,
        referencePriceNet: null,
        packPseudoPriceNet: 0,
        piecePriceNetString: '13,99 € / Meter',
        piecePseudoPriceNet: 0,
        referencePriceGross: null,
        packPseudoPriceGross: 0,
        piecePriceGrossString: '16,65 € / Meter',
        piecePseudoPriceGross: 0,
        referencePriceNetString: null,
        referencePriceGrossString: null,
        piecePriceNetString_template: '13,99 € / {$unit}',
        productCheapestPiecePriceNet: 13.99,
        piecePriceGrossString_template: '16,65 € / {$unit}',
        productCheapestPiecePriceGross: 16.65,
        productMostexpensivePiecePriceNet: 13.99,
        productMostexpensivePiecePriceGross: 16.65,
      },
      priceRules: [
        {
          customerGroupKey: 'DE',
          from: 0,
          to: 'beliebig',
          discountGroup: null,
          packPriceNet: 13.99,
          packPriceGross: 16.65,
          piecePriceNet: 13.99,
          piecePriceGross: 16.65,
          packPseudoPriceNet: 0,
          packPseudoPriceGross: 0,
          piecePseudoPriceNet: 0,
          piecePseudoPriceGross: 0,
          piecePriceNetString: '13,99 € / Meter',
          piecePriceGrossString: '16,65 € / Meter',
          piecePriceNetString_template: '13,99 € / {$unit}',
          piecePriceGrossString_template: '16,65 € / {$unit}',
          referencePriceNet: null,
          referencePriceGross: null,
          referencePriceNetString: null,
          referencePriceGrossString: null,
          productCheapestPiecePriceNet: 13.99,
          productCheapestPiecePriceGross: 16.65,
          productMostexpensivePiecePriceNet: 13.99,
          productMostexpensivePiecePriceGross: 16.65,
          ecoTaxNet: null,
          ecoTaxGross: null,
        },
      ],
      images: {
        imageWeb: [
          {
            url: 'pim/b75051/6ce7c8/87d0d9/95d41f/08cac4/f4/b750516ce7c887d0d995d41f08cac4f4.jpeg',
            classes: ['ASSET_FS'],
          },
          {
            url: 'pim/c753fe/fbe6c6/e6b77f/e638e3/73ec33/2d/c753fefbe6c6e6b77fe638e373ec332d.jpeg',
            classes: ['ASSET_M'],
          },
          {
            url: 'pim/d9c8a1/083015/3576c7/495257/f08b88/7c/d9c8a10830153576c7495257f08b887c.jpeg',
            classes: ['ASSET_M'],
          },
        ],
        image360: [],
        video: [],
      },
      flags: ['series'],
      related: {
        crossSells: ['10025650', '10029162', '10029164', '10029166'],
        alternatives: ['30026185', '30051824', '30026176'],
        optionalAdditions: [],
        configurableRelations: [],
      },
      documents: [],
      hreflang: [
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
      ],
      mainCategory: { lvl0: [''] },
      configurations: {
        custom_tailor: {
          is_custom_tailor: true,
          configuration_data: {
            brinks: [
              {
                type: 'normal',
                length: [],
              },
              {
                type: 'cuvert',
                length: [3, 4, 5],
                activeAt: ['rectangular', 'square'],
                additionalPricePercent: 0.2,
              },
            ],
            shapes: ['oval', 'rectangular', 'round', 'square'],
          },
        },
      },
      objectID: '30025857',
    },
    {
      sku: '30025856',
      title: 'Tischwäsche Palermo nach Maß genäht je m²',
      subtitle: ' sekt',
      description:
        '<p>Tischdecke Palermo im Wunschmaß</p>\n<p>Sie möchten die Tischwäsche Palermo in Ihrer Wunschgröße kaufen? Dann fertigt unser Nähservice gerne Tischdecken, Mitteldecken &amp; Co. nach Ihren individuellen Vorgaben für Sie an. Nutzen Sie unseren Nähkonfigurator für Ihre individuelle Maßanfertigung. Die erstklassige Damast-Tischwäsche Palermo eignet sich für den täglichen Gebrauch im Restaurant als Deckserviette und lässt sich wunderbar mit anderer Tischwäsche kombinieren. Zudem ist sie pflegeleicht und strapazierfähig.</p>\n<ul>\n<li>Stofftischdecke nach Ihren individuellen Wünschen gefertigt</li>\n<li>in erstklassiger Damast-Qualität</li>\n<li>feine Glattwebung</li>\n<li>schöner Glanzeffekt und Formstabilität durch Mercerisierung</li>\n<li>langlebiges Vollzwirn-Material</li>\n<li>in verschiedenen stilvollen Farben erhältlich</li>\n<li>Kuvertsaum oder Normalsaum möglich</li>\n<li>Einstickungen auf Anfrage möglich – nutzen Sie unseren Nähservice!</li>\n<li>aus 100% Baumwolle</li>\n<li>bei 95 °C maschinenwaschbar, kann gechlort werden, trocknergeeignet</li>\n<li>Gewicht ca. 195 g/m²</li>\n<li>Bitte beachten Sie, dass Sondergrößen vom Umtausch ausgeschlossen sind</li>\n</ul>\n<p>Bestellen Sie Ihre maßgeschneiderte Tischwäsche Palermo einfach und unkompliziert über unseren Nähkonfigurator.</p>',
      brand: 'ERWIN M.',
      containerID: '124430',
      sellable: true,
      sellOut: false,
      stock: 0,
      shippingFree: false,
      specialDelivery: false,
      deliveryDate: '2022-05-05',
      deliveryDays: 7,
      specimen: {
        isSpecimen: false,
        hasSpecimenProducts: ['124060', '124063'],
      },
      product_line: ['tischwaesche-serie-palermo'],
      series: ['Tischwäsche-Serie Palermo'],
      variantData: {
        size: {},
        color: {
          label: 'sekt',
        },
        style: {},
        variant: {},
      },
      attributes: {
        BRAND: {
          label: 'Marke',
          values: [
            {
              icon: 'pim/e9fdfd/02b291/8398b0/a53537/141af4/8e/e9fdfd02b2918398b0a53537141af48e.svg',
              value: 'ERWIN M.',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        COLOR: {
          label: 'Farbe',
          values: [
            {
              value: 'sekt',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        FEATURE: {
          label: 'Feature',
          values: [
            {
              value: 'besonders strapazierfähig',
            },
            {
              value: 'mercerisiert',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        GRAMMAGE: {
          label: 'Grammatur',
          values: [
            {
              value: '195 g/m²',
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        MATERIAL: {
          label: 'Material',
          values: [
            {
              value: 'Baumwolle',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        EMG_BRAND: {
          label: 'EMG-Marke',
          values: [
            {
              value: 'Hotelwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        HAS_STOCK: {
          label: 'Sofort verfügbar',
          values: [
            {
              value: 'false',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        HIGHLIGHT: {
          label: 'Highlight',
          values: [
            {
              value:
                '100% Baumwolle, Vollzwirn, mercerisiert. Gewicht ca. 195 g/m².',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SHRINKAGE: {
          label: 'Einsprung',
          values: [
            {
              value: '5 %',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        WIDTH_MAX: {
          label: 'Breite (max)',
          values: [
            {
              unit: 'cm',
              value: 258,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        WIDTH_MIN: {
          label: 'Breite (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        COLORSPACE: {
          label: 'Farbton',
          values: [
            {
              icon: 'pim/085346/868320/845cc1/baaf63/ea2918/0c/085346868320845cc1baaf63ea29180c.svg',
              value: 'Beige',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        LENGTH_MAX: {
          label: 'Länge (max)',
          values: [
            {
              unit: 'cm',
              value: 4000,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        LENGTH_MIN: {
          label: 'Länge (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        PRODUCT_NAME: {
          label: 'Produktname (Verkauf)',
          values: [
            {
              value: 'Tischwäsche Palermo nach Maß genäht je m²',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        CUSTOMIZEABLE: {
          label: 'Customizebar',
          values: [
            {
              value: 'Muss',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SKU_SORT_NUMBER: {
          label: 'SKU Sort Number',
          values: [
            {
              value: '3',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        MATERIAL_DETAILS: {
          label: 'Materialdetails',
          values: [
            {
              value: '100% Baumwolle',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CARE_INSTRUCTIONS: {
          label: 'Pflegehinweise',
          values: [
            {
              icon: 'pim/739566/034d0d/4354a3/67e634/967834/af/739566034d0d4354a367e634967834af.svg',
              value: 'Im Standardprogramm des Trockners trocknen',
            },
            {
              icon: 'pim/7a00bd/89d5d5/f7d4ca/cdc49c/e9292e/d5/7a00bd89d5d5f7d4cacdc49ce9292ed5.svg',
              value: 'Normalwaschgang bis 95°C',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CONFIGURATION_MODEL: {
          label: 'Konfigurationsmodell',
          values: [
            {
              value: 'Nähen Tischwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
      },
      categories: { lvl0: [''] },
      unit: {
        unitName: 'Meter',
        purchaseUnit: 1,
        referenceUnit: 1,
        packUnit: 'Meter',
      },
      prices: {
        ecoTaxNet: null,
        ecoTaxGross: null,
        packPriceNet: 13.99,
        discountGroup: null,
        piecePriceNet: 13.99,
        packPriceGross: 16.65,
        piecePriceGross: 16.65,
        referencePriceNet: null,
        packPseudoPriceNet: 0,
        piecePriceNetString: '13,99 € / Meter',
        piecePseudoPriceNet: 0,
        referencePriceGross: null,
        packPseudoPriceGross: 0,
        piecePriceGrossString: '16,65 € / Meter',
        piecePseudoPriceGross: 0,
        referencePriceNetString: null,
        referencePriceGrossString: null,
        piecePriceNetString_template: '13,99 € / {$unit}',
        productCheapestPiecePriceNet: 13.99,
        piecePriceGrossString_template: '16,65 € / {$unit}',
        productCheapestPiecePriceGross: 16.65,
        productMostexpensivePiecePriceNet: 13.99,
        productMostexpensivePiecePriceGross: 16.65,
      },
      priceRules: [
        {
          customerGroupKey: 'DE',
          from: 0,
          to: 'beliebig',
          discountGroup: null,
          packPriceNet: 13.99,
          packPriceGross: 16.65,
          piecePriceNet: 13.99,
          piecePriceGross: 16.65,
          packPseudoPriceNet: 0,
          packPseudoPriceGross: 0,
          piecePseudoPriceNet: 0,
          piecePseudoPriceGross: 0,
          piecePriceNetString: '13,99 € / Meter',
          piecePriceGrossString: '16,65 € / Meter',
          piecePriceNetString_template: '13,99 € / {$unit}',
          piecePriceGrossString_template: '16,65 € / {$unit}',
          referencePriceNet: null,
          referencePriceGross: null,
          referencePriceNetString: null,
          referencePriceGrossString: null,
          productCheapestPiecePriceNet: 13.99,
          productCheapestPiecePriceGross: 16.65,
          productMostexpensivePiecePriceNet: 13.99,
          productMostexpensivePiecePriceGross: 16.65,
          ecoTaxNet: null,
          ecoTaxGross: null,
        },
      ],
      images: {
        imageWeb: [
          {
            url: 'pim/2698ca/f72124/e92e38/49fad8/b687e5/6d/2698caf72124e92e3849fad8b687e56d.jpeg',
            classes: ['ASSET_FS'],
          },
        ],
        image360: [],
        video: [],
      },
      flags: ['series'],
      related: {
        crossSells: ['10029141', '10029143', '10029144', '10029158'],
        alternatives: ['30051823', '30026185', '30026132'],
        optionalAdditions: [],
        configurableRelations: [],
      },
      documents: [],
      hreflang: [
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
      ],
      mainCategory: { lvl0: [''] },
      configurations: {
        custom_tailor: {
          is_custom_tailor: true,
          configuration_data: {
            brinks: [
              {
                type: 'normal',
                length: [],
              },
              {
                type: 'cuvert',
                length: [3, 4, 5],
                activeAt: ['rectangular', 'square'],
                additionalPricePercent: 0.2,
              },
            ],
            shapes: ['oval', 'rectangular', 'round', 'square'],
          },
        },
      },
      objectID: '30025856',
    },
    {
      sku: '30025855',
      title: 'Tischwäsche Palermo nach Maß genäht je m²',
      subtitle: ' sand',
      description:
        '<p>Tischdecke Palermo im Wunschmaß</p>\n<p>Sie möchten die Tischwäsche Palermo in Ihrer Wunschgröße kaufen? Dann fertigt unser Nähservice gerne Tischdecken, Mitteldecken &amp; Co. nach Ihren individuellen Vorgaben für Sie an. Nutzen Sie unseren Nähkonfigurator für Ihre individuelle Maßanfertigung. Die erstklassige Damast-Tischwäsche Palermo eignet sich für den täglichen Gebrauch im Restaurant als Deckserviette und lässt sich wunderbar mit anderer Tischwäsche kombinieren. Zudem ist sie pflegeleicht und strapazierfähig.</p>\n<ul>\n<li>Stofftischdecke nach Ihren individuellen Wünschen gefertigt</li>\n<li>in erstklassiger Damast-Qualität</li>\n<li>feine Glattwebung</li>\n<li>schöner Glanzeffekt und Formstabilität durch Mercerisierung</li>\n<li>langlebiges Vollzwirn-Material</li>\n<li>in verschiedenen stilvollen Farben erhältlich</li>\n<li>Kuvertsaum oder Normalsaum möglich</li>\n<li>Einstickungen auf Anfrage möglich – nutzen Sie unseren Nähservice!</li>\n<li>aus 100% Baumwolle</li>\n<li>bei 95 °C maschinenwaschbar, kann gechlort werden, trocknergeeignet</li>\n<li>Gewicht ca. 195 g/m²</li>\n<li>Bitte beachten Sie, dass Sondergrößen vom Umtausch ausgeschlossen sind</li>\n</ul>\n<p>Bestellen Sie Ihre maßgeschneiderte Tischwäsche Palermo einfach und unkompliziert über unseren Nähkonfigurator.</p>',
      brand: 'ERWIN M.',
      containerID: '124430',
      sellable: true,
      sellOut: false,
      stock: 0,
      shippingFree: false,
      specialDelivery: false,
      deliveryDate: '2022-05-05',
      deliveryDays: 7,
      specimen: {
        isSpecimen: false,
        hasSpecimenProducts: ['124060', '124063'],
      },
      product_line: ['tischwaesche-serie-palermo'],
      series: ['Tischwäsche-Serie Palermo'],
      variantData: {
        size: {},
        color: {
          label: 'sand',
        },
        style: {},
        variant: {},
      },
      attributes: {
        BRAND: {
          label: 'Marke',
          values: [
            {
              icon: 'pim/e9fdfd/02b291/8398b0/a53537/141af4/8e/e9fdfd02b2918398b0a53537141af48e.svg',
              value: 'ERWIN M.',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        COLOR: {
          label: 'Farbe',
          values: [
            {
              value: 'sand',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        FEATURE: {
          label: 'Feature',
          values: [
            {
              value: 'besonders strapazierfähig',
            },
            {
              value: 'mercerisiert',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        GRAMMAGE: {
          label: 'Grammatur',
          values: [
            {
              value: '195 g/m²',
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        MATERIAL: {
          label: 'Material',
          values: [
            {
              value: 'Baumwolle',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        EMG_BRAND: {
          label: 'EMG-Marke',
          values: [
            {
              value: 'Hotelwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        HAS_STOCK: {
          label: 'Sofort verfügbar',
          values: [
            {
              value: 'false',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        HIGHLIGHT: {
          label: 'Highlight',
          values: [
            {
              value:
                '100% Baumwolle, Vollzwirn, mercerisiert. Gewicht ca. 195 g/m².',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SHRINKAGE: {
          label: 'Einsprung',
          values: [
            {
              value: '5 %',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        WIDTH_MAX: {
          label: 'Breite (max)',
          values: [
            {
              unit: 'cm',
              value: 258,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        WIDTH_MIN: {
          label: 'Breite (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        COLORSPACE: {
          label: 'Farbton',
          values: [
            {
              icon: 'pim/085346/868320/845cc1/baaf63/ea2918/0c/085346868320845cc1baaf63ea29180c.svg',
              value: 'Beige',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        LENGTH_MAX: {
          label: 'Länge (max)',
          values: [
            {
              unit: 'cm',
              value: 4000,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        LENGTH_MIN: {
          label: 'Länge (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        PRODUCT_NAME: {
          label: 'Produktname (Verkauf)',
          values: [
            {
              value: 'Tischwäsche Palermo nach Maß genäht je m²',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        CUSTOMIZEABLE: {
          label: 'Customizebar',
          values: [
            {
              value: 'Muss',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SKU_SORT_NUMBER: {
          label: 'SKU Sort Number',
          values: [
            {
              value: '5',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        MATERIAL_DETAILS: {
          label: 'Materialdetails',
          values: [
            {
              value: '100% Baumwolle',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CARE_INSTRUCTIONS: {
          label: 'Pflegehinweise',
          values: [
            {
              icon: 'pim/739566/034d0d/4354a3/67e634/967834/af/739566034d0d4354a367e634967834af.svg',
              value: 'Im Standardprogramm des Trockners trocknen',
            },
            {
              icon: 'pim/7a00bd/89d5d5/f7d4ca/cdc49c/e9292e/d5/7a00bd89d5d5f7d4cacdc49ce9292ed5.svg',
              value: 'Normalwaschgang bis 95°C',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CONFIGURATION_MODEL: {
          label: 'Konfigurationsmodell',
          values: [
            {
              value: 'Nähen Tischwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
      },
      categories: { lvl0: [''] },
      unit: {
        unitName: 'Meter',
        purchaseUnit: 1,
        referenceUnit: 1,
        packUnit: 'Meter',
      },
      prices: {
        ecoTaxNet: null,
        ecoTaxGross: null,
        packPriceNet: 13.99,
        discountGroup: null,
        piecePriceNet: 13.99,
        packPriceGross: 16.65,
        piecePriceGross: 16.65,
        referencePriceNet: null,
        packPseudoPriceNet: 0,
        piecePriceNetString: '13,99 € / Meter',
        piecePseudoPriceNet: 0,
        referencePriceGross: null,
        packPseudoPriceGross: 0,
        piecePriceGrossString: '16,65 € / Meter',
        piecePseudoPriceGross: 0,
        referencePriceNetString: null,
        referencePriceGrossString: null,
        piecePriceNetString_template: '13,99 € / {$unit}',
        productCheapestPiecePriceNet: 13.99,
        piecePriceGrossString_template: '16,65 € / {$unit}',
        productCheapestPiecePriceGross: 16.65,
        productMostexpensivePiecePriceNet: 13.99,
        productMostexpensivePiecePriceGross: 16.65,
      },
      priceRules: [
        {
          customerGroupKey: 'DE',
          from: 0,
          to: 'beliebig',
          discountGroup: null,
          packPriceNet: 13.99,
          packPriceGross: 16.65,
          piecePriceNet: 13.99,
          piecePriceGross: 16.65,
          packPseudoPriceNet: 0,
          packPseudoPriceGross: 0,
          piecePseudoPriceNet: 0,
          piecePseudoPriceGross: 0,
          piecePriceNetString: '13,99 € / Meter',
          piecePriceGrossString: '16,65 € / Meter',
          piecePriceNetString_template: '13,99 € / {$unit}',
          piecePriceGrossString_template: '16,65 € / {$unit}',
          referencePriceNet: null,
          referencePriceGross: null,
          referencePriceNetString: null,
          referencePriceGrossString: null,
          productCheapestPiecePriceNet: 13.99,
          productCheapestPiecePriceGross: 16.65,
          productMostexpensivePiecePriceNet: 13.99,
          productMostexpensivePiecePriceGross: 16.65,
          ecoTaxNet: null,
          ecoTaxGross: null,
        },
      ],
      images: {
        imageWeb: [
          {
            url: 'pim/5d6172/df15af/c6f7d5/20f521/669194/c7/5d6172df15afc6f7d520f521669194c7.jpeg',
            classes: ['ASSET_FS'],
          },
        ],
        image360: [],
        video: [],
      },
      flags: ['series'],
      related: {
        crossSells: ['10024296', '10024468', '10024502', '10024769'],
        alternatives: ['30026185', '30051827', '30026125'],
        optionalAdditions: [],
        configurableRelations: [],
      },
      documents: [],
      hreflang: [
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
      ],
      mainCategory: { lvl0: [''] },
      configurations: {
        custom_tailor: {
          is_custom_tailor: true,
          configuration_data: {
            brinks: [
              {
                type: 'normal',
                length: [],
              },
              {
                type: 'cuvert',
                length: [3, 4, 5],
                activeAt: ['rectangular', 'square'],
                additionalPricePercent: 0.2,
              },
            ],
            shapes: ['oval', 'rectangular', 'round', 'square'],
          },
        },
      },
      objectID: '30025855',
    },
    {
      sku: '30025853',
      title: 'Tischwäsche Palermo nach Maß genäht je m²',
      subtitle: ' burgund',
      description:
        '<p>Tischdecke Palermo im Wunschmaß</p>\n<p>Sie möchten die Tischwäsche Palermo in Ihrer Wunschgröße kaufen? Dann fertigt unser Nähservice gerne Tischdecken, Mitteldecken &amp; Co. nach Ihren individuellen Vorgaben für Sie an. Nutzen Sie unseren Nähkonfigurator für Ihre individuelle Maßanfertigung. Die erstklassige Damast-Tischwäsche Palermo eignet sich für den täglichen Gebrauch im Restaurant als Deckserviette und lässt sich wunderbar mit anderer Tischwäsche kombinieren. Zudem ist sie pflegeleicht und strapazierfähig.</p>\n<ul>\n<li>Stofftischdecke nach Ihren individuellen Wünschen gefertigt</li>\n<li>in erstklassiger Damast-Qualität</li>\n<li>feine Glattwebung</li>\n<li>schöner Glanzeffekt und Formstabilität durch Mercerisierung</li>\n<li>langlebiges Vollzwirn-Material</li>\n<li>in verschiedenen stilvollen Farben erhältlich</li>\n<li>Kuvertsaum oder Normalsaum möglich</li>\n<li>Einstickungen auf Anfrage möglich – nutzen Sie unseren Nähservice!</li>\n<li>aus 100% Baumwolle</li>\n<li>bei 95 °C maschinenwaschbar, kann gechlort werden, trocknergeeignet</li>\n<li>Gewicht ca. 195 g/m²</li>\n<li>Bitte beachten Sie, dass Sondergrößen vom Umtausch ausgeschlossen sind</li>\n</ul>\n<p>Bestellen Sie Ihre maßgeschneiderte Tischwäsche Palermo einfach und unkompliziert über unseren Nähkonfigurator.</p>',
      brand: 'ERWIN M.',
      containerID: '124430',
      sellable: true,
      sellOut: false,
      stock: 0,
      shippingFree: false,
      specialDelivery: false,
      deliveryDate: '2022-05-05',
      deliveryDays: 7,
      specimen: {
        isSpecimen: false,
        hasSpecimenProducts: ['124060', '124063'],
      },
      product_line: ['tischwaesche-serie-palermo'],
      series: ['Tischwäsche-Serie Palermo'],
      variantData: {
        size: {},
        color: {
          label: 'burgund',
        },
        style: {},
        variant: {},
      },
      attributes: {
        BRAND: {
          label: 'Marke',
          values: [
            {
              icon: 'pim/e9fdfd/02b291/8398b0/a53537/141af4/8e/e9fdfd02b2918398b0a53537141af48e.svg',
              value: 'ERWIN M.',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        COLOR: {
          label: 'Farbe',
          values: [
            {
              value: 'burgund',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        FEATURE: {
          label: 'Feature',
          values: [
            {
              value: 'besonders strapazierfähig',
            },
            {
              value: 'mercerisiert',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        GRAMMAGE: {
          label: 'Grammatur',
          values: [
            {
              value: '195 g/m²',
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        MATERIAL: {
          label: 'Material',
          values: [
            {
              value: 'Baumwolle',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        EMG_BRAND: {
          label: 'EMG-Marke',
          values: [
            {
              value: 'Hotelwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        HAS_STOCK: {
          label: 'Sofort verfügbar',
          values: [
            {
              value: 'false',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        HIGHLIGHT: {
          label: 'Highlight',
          values: [
            {
              value:
                '100% Baumwolle, Vollzwirn, mercerisiert. Gewicht ca. 195 g/m².',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SHRINKAGE: {
          label: 'Einsprung',
          values: [
            {
              value: '5 %',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        WIDTH_MAX: {
          label: 'Breite (max)',
          values: [
            {
              unit: 'cm',
              value: 258,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        WIDTH_MIN: {
          label: 'Breite (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        COLORSPACE: {
          label: 'Farbton',
          values: [
            {
              icon: 'pim/76a5d2/1a9207/fd1e16/ed866c/b994d6/22/76a5d21a9207fd1e16ed866cb994d622.svg',
              value: 'Rot',
            },
          ],
          is_filter: true,
          is_pdp_attribute: false,
        },
        LENGTH_MAX: {
          label: 'Länge (max)',
          values: [
            {
              unit: 'cm',
              value: 4000,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        LENGTH_MIN: {
          label: 'Länge (min)',
          values: [
            {
              unit: 'cm',
              value: 15,
            },
          ],
          is_filter: true,
          is_pdp_attribute: true,
        },
        PRODUCT_NAME: {
          label: 'Produktname (Verkauf)',
          values: [
            {
              value: 'Tischwäsche Palermo nach Maß genäht je m²',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        CUSTOMIZEABLE: {
          label: 'Customizebar',
          values: [
            {
              value: 'Muss',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        SKU_SORT_NUMBER: {
          label: 'SKU Sort Number',
          values: [
            {
              value: '5.5',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
        MATERIAL_DETAILS: {
          label: 'Materialdetails',
          values: [
            {
              value: '100% Baumwolle',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CARE_INSTRUCTIONS: {
          label: 'Pflegehinweise',
          values: [
            {
              icon: 'pim/739566/034d0d/4354a3/67e634/967834/af/739566034d0d4354a367e634967834af.svg',
              value: 'Im Standardprogramm des Trockners trocknen',
            },
            {
              icon: 'pim/7a00bd/89d5d5/f7d4ca/cdc49c/e9292e/d5/7a00bd89d5d5f7d4cacdc49ce9292ed5.svg',
              value: 'Normalwaschgang bis 95°C',
            },
          ],
          is_filter: false,
          is_pdp_attribute: true,
        },
        CONFIGURATION_MODEL: {
          label: 'Konfigurationsmodell',
          values: [
            {
              value: 'Nähen Tischwäsche',
            },
          ],
          is_filter: false,
          is_pdp_attribute: false,
        },
      },
      categories: { lvl0: [''] },
      unit: {
        unitName: 'Meter',
        purchaseUnit: 1,
        referenceUnit: 1,
        packUnit: 'Meter',
      },
      prices: {
        ecoTaxNet: null,
        ecoTaxGross: null,
        packPriceNet: 13.99,
        discountGroup: null,
        piecePriceNet: 13.99,
        packPriceGross: 16.65,
        piecePriceGross: 16.65,
        referencePriceNet: null,
        packPseudoPriceNet: 0,
        piecePriceNetString: '13,99 € / Meter',
        piecePseudoPriceNet: 0,
        referencePriceGross: null,
        packPseudoPriceGross: 0,
        piecePriceGrossString: '16,65 € / Meter',
        piecePseudoPriceGross: 0,
        referencePriceNetString: null,
        referencePriceGrossString: null,
        piecePriceNetString_template: '13,99 € / {$unit}',
        productCheapestPiecePriceNet: 13.99,
        piecePriceGrossString_template: '16,65 € / {$unit}',
        productCheapestPiecePriceGross: 16.65,
        productMostexpensivePiecePriceNet: 13.99,
        productMostexpensivePiecePriceGross: 16.65,
      },
      priceRules: [
        {
          customerGroupKey: 'DE',
          from: 0,
          to: 'beliebig',
          discountGroup: null,
          packPriceNet: 13.99,
          packPriceGross: 16.65,
          piecePriceNet: 13.99,
          piecePriceGross: 16.65,
          packPseudoPriceNet: 0,
          packPseudoPriceGross: 0,
          piecePseudoPriceNet: 0,
          piecePseudoPriceGross: 0,
          piecePriceNetString: '13,99 € / Meter',
          piecePriceGrossString: '16,65 € / Meter',
          piecePriceNetString_template: '13,99 € / {$unit}',
          piecePriceGrossString_template: '16,65 € / {$unit}',
          referencePriceNet: null,
          referencePriceGross: null,
          referencePriceNetString: null,
          referencePriceGrossString: null,
          productCheapestPiecePriceNet: 13.99,
          productCheapestPiecePriceGross: 16.65,
          productMostexpensivePiecePriceNet: 13.99,
          productMostexpensivePiecePriceGross: 16.65,
          ecoTaxNet: null,
          ecoTaxGross: null,
        },
      ],
      images: {
        imageWeb: [
          {
            url: 'pim/60ea23/9c3374/644cc8/c6dc99/b9365f/15/60ea239c3374644cc8c6dc99b9365f15.jpeg',
            classes: ['ASSET_FS'],
          },
        ],
        image360: [],
        video: [],
      },
      flags: ['series'],
      related: {
        crossSells: ['10024815', '10029187', '10029188', '10029193'],
        alternatives: ['30051826', '30026185', '30026155'],
        optionalAdditions: [],
        configurableRelations: [],
      },
      documents: [],
      hreflang: [
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_DE',
          url: 'https://www.hotelwaesche.de/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'de_AT',
          url: 'https://www.hotelwaesche.at/tischwaesche-palermo-nach-mass-genaeht-je-m2-124430',
        },
        {
          lang: 'fr_FR',
          url: 'https://www.vega-direct.com/fr-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'de_CH',
          url: 'https://www.erwinmueller.ch/ch-de/tischwaesche-palermo-nach-mass-genaeht-124430',
        },
        {
          lang: 'fr_CH',
          url: 'https://www.erwinmueller.ch/ch-fr/linge-de-table-sur-mesure-palerme-124430',
        },
        {
          lang: 'sv_SE',
          url: 'https://www.vega-direct.com/se-se/duk-palermo-maattsydd-124430',
        },
        {
          lang: 'nb_NO',
          url: 'https://www.vega-direct.com/no-no/duk-palermo-maalsydd-124430',
        },
        {
          lang: 'it_IT',
          url: 'https://www.vega-direct.com/it-it/tovagliato-palermo-su-misura-124430',
        },
        {
          lang: 'es_ES',
          url: 'https://www.vega-direct.com/es-es/manteleria-palermo-a-medida-124430',
        },
        {
          lang: 'nl_NL',
          url: 'https://www.vega-direct.com/nl-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'en',
          url: 'https://www.vega-direct.com/en-us/table-linen-palermo-customized-124430',
        },
        {
          lang: 'nl_BE',
          url: 'https://www.vega-direct.com/be-nl/tafellinnen-palermo-maatwerk-124430',
        },
        {
          lang: 'fr_BE',
          url: 'https://www.vega-direct.com/be-fr/linge-de-table-sur-mesure-palerme-124430',
        },
      ],
      mainCategory: { lvl0: [''] },
      configurations: {
        custom_tailor: {
          is_custom_tailor: true,
          configuration_data: {
            brinks: [
              {
                type: 'normal',
                length: [],
              },
              {
                type: 'cuvert',
                length: [3, 4, 5],
                activeAt: ['rectangular', 'square'],
                additionalPricePercent: 0.2,
              },
            ],
            shapes: ['oval', 'rectangular', 'round', 'square'],
          },
        },
      },
      objectID: '30025853',
    },
  ]

/*fs-end*/

export default data
