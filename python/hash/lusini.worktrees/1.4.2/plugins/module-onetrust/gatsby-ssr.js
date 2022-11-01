const __html = `
function OptanonWrapper() { }
`

exports.onRenderBody = ({ setHeadComponents }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var React = require('react')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var config = require('../../src/config')

  if (config.features.onetrust) {
    setHeadComponents([
      <script
        key="onetrust"
        data-language={config.i18n.locale}
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        type="text/javascript"
        charSet="UTF-8"
        data-domain-script="bda0c016-94be-4fd9-943a-b9c09791a327"
      />,
      <script key="script" dangerouslySetInnerHTML={{ __html }} />,
    ])
  } else {
    setHeadComponents([])
  }
}
