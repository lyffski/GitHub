import { createGlobalStyle } from 'styled-components'
import { ms } from 'modules/browser/const'

export const theme = {
  ty: getTypographyNamed,
  spacing: spacing,
  rounding: rounding,
  ms: ms,

  font: '"Roboto", sans-serif' as '"Roboto", sans-serif',
  fontSpecial:
    '"Roboto Condensed", sans-serif' as '"Roboto Condensed", sans-serif',
  colors: {
    primary: '#D6A444' as '#D6A444',
    b0: '#2B271F' as '#2B271F',
    white: '#ffffff' as '#ffffff',
    brand: {
      vega: '#004884',
      erwinm: '#0075bf ',
      jobeline: '#000000',
      pulsiva: '#000000',
      lusini: '#d6a444',
    },
    shade: {
      b1: '#464134' as '#464134',
      b2: '#625D52' as '#625D52',
      b3: '#7D7971' as '#7D7971',
      b4: '#9A9790' as '#9A9790',
      b5: '#D1CFCC' as '#D1CFCC',
      b6: '#ECEBEA' as '#ECEBEA',
      primaryBrighter: '#EDD179' as '#EDD179',
      primaryUltraBright: '#FAF5EC' as '#FAF5EC',
    },
    accent: {
      green: '#4EAF46' as '#4EAF46',
      pink: '#E72F81' as '#E72F81',
      purple: '#B94090' as '#B94090',
      yellowGreen: '#BBD033' as '#BBD033',
    },
    decorationColor: {
      lusiniBlue: '#73C4EF' as '#73C4EF',
      lusiniPurple: '#AC2786' as '#AC2786',
    },
  },
  /**
   *
   * @param font [font-size, letter-spacing, line-height]
   * @param family 'Roboto' | 'Roboto Condensed'
   * @param weight 400 | 700 | bold
   */
  _ty: typography,
  _spacing: {
    xxs: 5 as 5,
    xs: 10 as 10,
    s: 15 as 15,
    m: 20 as 20,
    ml: 30 as 30,
    l: 40 as 40,
    xl: 60 as 60,
    xxl: 80 as 80,
  },
  _rounding: {
    s: 3 as 3,
    m: 5 as 5,
    l: 8 as 8,
  },
}

type Rounding = 's' | 'm' | 'l'
/**
 *
 * Sets the border-radius in css
 * - s: 3px
 * - m: 5px
 * - l: 8px
 */
function rounding(value: Rounding) {
  return `border-radius: ${theme._rounding[value] / 16}rem;`
}

type TypographyNames =
  | 'rc-s'
  | 'rc-base'
  | 'rc-l'
  | 'rc-xl'
  | 'rc-2xl'
  | 'rc-3xl'
  | 'rc-4xl'
  | 'r-xs'
  | 'r-s'
  | 'r-base'
  | 'r-l'
  | 'r-2xl'
  | 'r-xl'

/**
 *
 * @param font [font-size, letter-spacing, line-height]
 * @param family 'Roboto' | 'Roboto Condensed'
 * @param weight 400 | 700 | bold
 */
function typography(
  font: [number, number, number],
  family?: typeof theme.font | typeof theme.fontSpecial,
  weight?: '300' | '400' | '700'
) {
  const [size, spacing, height] = font

  let result =
    `font-size: ${size / 16}rem;` +
    `letter-spacing: ${spacing / 16}rem;` +
    `line-height: ${height / 16}rem;`

  if (family) result += `font-family: ${family};`
  if (weight) result += `font-weight: ${weight};`

  return result
}

const typographyNamed: Record<TypographyNames, string> = {
  'r-xs': typography([10, 0, 14], theme.font, '400'),
  'r-s': typography([13, 0, 18], theme.font, '400'),
  'r-base': typography([16, 0, 24], theme.font, '400'),
  'r-l': typography([18, 0, 24], theme.font, '400'),
  'r-2xl': typography([22, 0, 32], theme.font, '700'),
  'r-xl': typography([20, 0, 28], theme.font, '400'),

  'rc-s': typography([13, 0, 17], theme.fontSpecial, '400'),
  'rc-base': typography([16, 0, 22], theme.fontSpecial, '400'),
  'rc-l': typography([18, 0, 22], theme.fontSpecial, '400'),
  'rc-xl': typography([20, 0, 24], theme.fontSpecial, '400'),
  'rc-2xl': typography([22, 0, 28], theme.fontSpecial, '400'),
  'rc-3xl': typography([28, 0, 36], theme.fontSpecial, '400'),
  'rc-4xl': typography([38, 0, 48], theme.fontSpecial, '400'),
}

/**
 * - 'r-xs': typography([10, 0, 14], theme.font, '400'),
 * - 'r-s': typography([13, 0, 18], theme.font, '400'),
 * - 'r-base': typography([16, 0, 24], theme.font, '400'),
 * - 'r-l': typography([18, 0, 24], theme.font, '400'),
 * - 'r-2xl': typography([22, 0, 32], theme.font, '700'),
 * - 'r-xl': typography([20, 0, 28], theme.font, '400'),

 * - 'rc-s': typography([13, 0, 17], theme.fontSpecial, '400'),
 * - 'rc-base': typography([16, 0, 22], theme.fontSpecial, '400'),
 * - 'rc-l': typography([18, 0, 22], theme.fontSpecial, '400'),
 * - 'rc-xl': typography([20, 0, 24], theme.fontSpecial, '400'),
 * - 'rc-2xl': typography([22, 0, 28], theme.fontSpecial, '400'),
 * - 'rc-3xl': typography([28, 0, 36], theme.fontSpecial, '400'),
 * - 'rc-4xl': typography([38, 0, 48], theme.fontSpecial, '400'),
 */
function getTypographyNamed(
  name: TypographyNames,
  weight?: '300' | '400' | '700' | 'bold'
) {
  if (weight) return typographyNamed[name] + `font-weight:${weight};`
  return typographyNamed[name]
}

typography.named = getTypographyNamed

/**
 * Spacings
 */
type Spacing = 'xxs' | 'xs' | 's' | 'm' | 'ml' | 'l' | 'xl' | 'xxl'

/**
 * - xxs: 5px
 * - xs: 10px
 * - s: 15px,
 * - m: 20px,
 * - ml: 30px,
 * - l: 40px,
 * - xl: 60px,
 * - xxl: 80px,
 */
function spacing(spacing: Spacing) {
  return `${theme._spacing[spacing] / 16}rem`
}

export default createGlobalStyle`
  :root {
    --spacing-xxs: ${theme.spacing('xxs')};
    --spacing-xs: ${theme.spacing('xs')};
    --spacing-s: ${theme.spacing('s')};
    --spacing-m: ${theme.spacing('m')};
    --spacing-ml: ${theme.spacing('ml')};
    --spacing-l: ${theme.spacing('l')};
    --spacing-xl: ${theme.spacing('xl')};
    --spacing-xxl: ${theme.spacing('xxl')};
  }

  html, body {
    font-family: ${theme.font};
    color: ${theme.colors.b0};
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  body {
    overflow-y: overlay;
    overflow-x: hidden;
    
  }

  div {
    box-sizing: border-box;
  }

  input {
    color: ${theme.colors.b0};
  }

  svg {
    color: ${theme.colors.b0};
    width: 1rem;
  }

  a {
    color: ${theme.colors.b0};
    text-decoration: none;
  }

  img {
    margin: 0;
    display: block;
  }

  button {
    background: none;
    border: none;
    text-align: left;
    padding: 0;
    color:${theme.colors.b0};
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding: 0;
  }
`
