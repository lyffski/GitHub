exports.onRenderBody = ({ setPreBodyComponents }, { pixelUrl }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var React = require('react')
  setPreBodyComponents([
    <img key="img" src={pixelUrl} style={{ display: 'none' }} />,
  ])
}
