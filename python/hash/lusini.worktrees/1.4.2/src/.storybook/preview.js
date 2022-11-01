// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ''
global.__BASE_PATH__ = ''
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = (pathname) => {
  alert(`navigate-to "${pathname}"`)
}

// load globalStyle into Story Preview
import GlobalStyle from '../containers/GlobalStyle'
import Container from '../theme/atoms/Container'
import React from 'react'
import { Helmet } from 'react-helmet'
import { addDecorator } from '@storybook/react'
addDecorator((storyFn) => (
  <>
    <GlobalStyle />
    <B2BClass />
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto Condensed:ital,wght@0,300;0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <div style={{ marginTop: 20 }}>
      <Container>{storyFn()}</Container>
    </div>
  </>
))

function B2BClass() {
  React.useEffect(() => {
    document.body.className = document.body.className + ' b2b'
  }, [])
  return null
}

export const parameters = {
  viewport: {
    viewports: {
      XS: {
        name: 'XS',
        styles: { width: '375px', height: '667px' },
      },
      SM: {
        name: 'SM',
        styles: { width: '576px', height: '360px' },
      },
      MD: {
        name: 'MD',
        styles: { width: '767px', height: '1050px' },
      },
      LG: {
        name: 'LG',
        styles: { width: '992px', height: '720px' },
      },
      XL: {
        name: 'XL',
        styles: { width: '1200px', height: '990px' },
      },
      XXL: {
        name: 'XXL',
        styles: { width: '1300px', height: '1050px' },
      },
    },
  },
}
