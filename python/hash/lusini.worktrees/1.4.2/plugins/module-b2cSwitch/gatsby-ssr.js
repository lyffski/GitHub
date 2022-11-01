const __html = `
  ;(function () {
    window.isb2c = 0
  
    var customerTypeMatch = document.cookie.match(/isb2c=([^;]*)/)
    if(customerTypeMatch) {
      window.isb2c = Number(customerTypeMatch[1])
    }

    document.body.classList.add(window.isb2c ? 'b2c' : 'b2b')
    if(!customerTypeMatch) document.body.classList.add('showB2cPopup')
  })()
`

exports.onRenderBody = ({ setPreBodyComponents }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var React = require('react')
  setPreBodyComponents([
    <script key="script" dangerouslySetInnerHTML={{ __html }} />,
  ])
}
