import { api } from '../../src/modules/seriesDetail/types'

/**
 * @since 09.07.2021
 * Geschirr-Serie Palana
 */
const data: api.Fetch = /*fs-start*/ {
  container: {
    attributes: {},
    categories: {},
    mainCategory: {},
    title: 'Geschirr-Serie Palana',
    brand: 'VEGA',
    description:
      'Unsere neue Serie PALANA begeistert mit ihren modernen Farben und der angesagten Vintage-Optik. Flache und tiefe Teller, Platten, Schalen und Becher wirken mit ihren unregelmäßigen Kanten wie handgemacht – so bieten sie eine authentische Bühne für Ihre Speisen. Dank der unregelmäßig verteilten Sprenkel ist jedes Teil einzigartig. Die drei Trendfarben lassen sich nach Belieben kombinieren und bringen so Abwechslung auf den stilvoll gedeckten Tisch. Unterstreichen Sie Ihren individuellen Stil mit unserer Serie PALANA!\n\nAus Stoneware (Steingut). Spülmaschinenfest und mikrowellengeeignet.',
    images: {
      imageWeb: [
        {
          url: 'pim/1b00f4/7525dc/85244d/c2e26a/3b51cd/cb/1b00f47525dc85244dc2e26a3b51cdcb.jpeg',
          classes: ['ASSET_M'],
        },
      ],
    },
    objectID: 'stoneware-serie-palana',
  },
  filters: [
    {
      label: 'Produkt-Typ',
      key: 'PRODUCT_TYPE',
      filtertype: 'checkbox',
    },
    {
      label: 'Farbton',
      key: 'COLORSPACE',
      filtertype: 'checkbox',
    },
    {
      label: 'Material',
      key: 'MATERIAL',
      filtertype: 'checkbox',
    },
    {
      label: 'Länge',
      key: 'LENGTH',
      filtertype: 'checkbox',
    },
    {
      label: 'Breite',
      key: 'WIDTH',
      filtertype: 'checkbox',
    },
    {
      label: 'Abmessung',
      key: 'MEASUREMENTS',
      filtertype: 'checkbox',
    },
    {
      label: 'Durchmesser',
      key: 'DIAMETER',
      filtertype: 'checkbox',
    },
    {
      label: 'Höhe',
      key: 'HEIGHT',
      filtertype: 'checkbox',
    },
    {
      label: 'Form',
      key: 'SHAPE',
      filtertype: 'checkbox',
    },
    {
      label: 'Einsatzbereich',
      key: 'OUTDOOR_INDOOR_USE',
      filtertype: 'checkbox',
    },
    {
      label: 'Inhalt',
      key: 'CONTENT',
      filtertype: 'checkbox',
    },
    {
      label: 'Größe',
      key: 'SIZE',
      filtertype: 'checkbox',
    },
    {
      label: 'Kleidergröße',
      key: 'CLOTHINGSIZE',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Gestell)',
      key: 'MATERIAL_BASE',
      filtertype: 'checkbox',
    },
    {
      label: 'Schuhgröße',
      key: 'SHOESIZE',
      filtertype: 'checkbox',
    },
    {
      label: 'Breite (Kissen)',
      key: 'WIDTH_PILLOW',
      filtertype: 'checkbox',
    },
    {
      label: 'Länge (Kissen)',
      key: 'LENGTH_PILLOW',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Sitz)',
      key: 'MATERIAL_SEAT',
      filtertype: 'checkbox',
    },
    {
      label: 'Konfektionsgruppe',
      key: 'USERGROUP',
      filtertype: 'checkbox',
    },
    {
      label: 'Garnart',
      key: 'YARN_TYPE',
      filtertype: 'checkbox',
    },
    {
      label: 'Grammatur',
      key: 'GRAMMAGE',
      filtertype: 'checkbox',
    },
    {
      label: 'Marke',
      key: 'BRAND',
      filtertype: 'checkbox',
    },
    {
      label: 'Tiefe',
      key: 'DEPTH',
      filtertype: 'checkbox',
    },
    {
      label: 'Stapelbar',
      key: 'STACKABLE',
      filtertype: 'checkbox',
    },
    {
      label: 'Passform',
      key: 'FITTING',
      filtertype: 'checkbox',
    },
    {
      label: 'Füllstrich',
      key: 'FILLING_MARK',
      filtertype: 'checkbox',
    },
    {
      label: 'Ärmellänge',
      key: 'SLEEVE_LENGTH',
      filtertype: 'checkbox',
    },
    {
      label: 'Armlehnen',
      key: 'ARMRESTS',
      filtertype: 'checkbox',
    },
    {
      label: 'Webart',
      key: 'WEAVING',
      filtertype: 'checkbox',
    },
    {
      label: 'abwischbar',
      key: 'IS_WIPEABLE',
      filtertype: 'checkbox',
    },
    {
      label: 'Materialstärke',
      key: 'THICKNESS',
      filtertype: 'checkbox',
    },
    {
      label: 'GN-Konformität',
      key: 'GN_COMPATIBILITY',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Griff)',
      key: 'MATERIAL_HANDLE',
      filtertype: 'checkbox',
    },
    {
      label: 'Höhe (Armlehne)',
      key: 'HEIGHT_ARMREST',
      filtertype: 'checkbox',
    },
    {
      label: 'Verschlussart',
      key: 'TYPE_CLASP',
      filtertype: 'checkbox',
    },
    {
      label: 'Höhe (Sitz)',
      key: 'HEIGHT_SEAT',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Tischplatte)',
      key: 'MATERIAL_TABLE',
      filtertype: 'checkbox',
    },
    {
      label: 'Farbe (Tischplatte)',
      key: 'COLOR_TABLE',
      filtertype: 'checkbox',
    },
    {
      label: 'Muster',
      key: 'PATTERN',
      filtertype: 'checkbox',
    },
    {
      label: 'Durchmesser (max)',
      key: 'DIAMETER_MAX',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Füllung)',
      key: 'MATERIAL_FILL',
      filtertype: 'checkbox',
    },
    {
      label: 'Durchmesser (Spiegel)',
      key: 'DIAMETER_MIRROR',
      filtertype: 'checkbox',
    },
    {
      label: 'Kochfeldtyp',
      key: 'HOBTYPE',
      filtertype: 'checkbox',
    },
    {
      label: 'Durchmesser (Topf)',
      key: 'DIAMETER_POT',
      filtertype: 'checkbox',
    },
    {
      label: 'Brenndauer',
      key: 'BURNING_TIME',
      filtertype: 'checkbox',
    },
    {
      label: 'Max. Belastbarkeit',
      key: 'LOAD_MAX',
      filtertype: 'checkbox',
    },
    {
      label: 'Duft',
      key: 'SCENT',
      filtertype: 'checkbox',
    },
    {
      label: 'Stapelbar (Möbel)',
      key: 'STACKABLE_FURNITURE',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Bezug)',
      key: 'MATERIAL_PILLOWCASE',
      filtertype: 'checkbox',
    },
    {
      label: 'Max. zul. Tischplattengröße',
      key: 'LIMIT_TABLETOP',
      filtertype: 'checkbox',
    },
    {
      label: 'Messertyp',
      key: 'KNIFETYPE',
      filtertype: 'checkbox',
    },
    {
      label: 'Kapazität',
      key: 'CAPACITY',
      filtertype: 'checkbox',
    },
    {
      label: 'Form (Kragen)',
      key: 'SHAPE_COLLAR',
      filtertype: 'checkbox',
    },
    {
      label: 'maximal zulässige Matratzenhöhe',
      key: 'LIMIT_HEIGHT_MATTRESS',
      filtertype: 'checkbox',
    },
    {
      label: 'Breite (min)',
      key: 'WIDTH_MIN',
      filtertype: 'checkbox',
    },
    {
      label: 'Breite (max)',
      key: 'WIDTH_MAX',
      filtertype: 'checkbox',
    },
    {
      label: 'Füllgewicht',
      key: 'WEIGHT_FILL',
      filtertype: 'checkbox',
    },
    {
      label: 'Einschubsystem',
      key: 'SLIDEINSYSTEM',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Rahmen)',
      key: 'MATERIAL_FRAME',
      filtertype: 'checkbox',
    },
    {
      label: 'Länge (min)',
      key: 'LENGTH_MIN',
      filtertype: 'checkbox',
    },
    {
      label: 'Länge (max)',
      key: 'LENGTH_MAX',
      filtertype: 'checkbox',
    },
    {
      label: 'Gewicht netto',
      key: 'WEIGHT_NET',
      filtertype: 'checkbox',
    },
    {
      label: 'Klappbar',
      key: 'FOLDABLE',
      filtertype: 'checkbox',
    },
    {
      label: 'Stromanschluss',
      key: 'CONNECTOR_POWER',
      filtertype: 'checkbox',
    },
    {
      label: 'Energieeffizienzklasse',
      key: 'ENERGY_EFFICIENCY_CLASS',
      filtertype: 'checkbox',
    },
    {
      label: 'Leuchtmittel',
      key: 'ILLUMINANT',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Innenfutter)',
      key: 'MATERIAL_LINING',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Sohle)',
      key: 'MATERIAL_SOLE',
      filtertype: 'checkbox',
    },
    {
      label: 'Material (Obermaterial)',
      key: 'MATERIAL_UPPERS',
      filtertype: 'checkbox',
    },
    {
      label: 'Leistung',
      key: 'POWER',
      filtertype: 'checkbox',
    },
    {
      label: 'Fassung',
      key: 'SOCKET',
      filtertype: 'checkbox',
    },
    {
      label: 'Breite (Spiegel)',
      key: 'WIDTH_MIRROR',
      filtertype: 'checkbox',
    },
    {
      label: 'Breite (Rand, Fahne)',
      key: 'WIDTH_RIM',
      filtertype: 'checkbox',
    },
    {
      label: 'Breite (Sitz)',
      key: 'WIDTH_SEAT',
      filtertype: 'checkbox',
    },
  ],
} /*fs-end*/
export default data
