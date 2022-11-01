const __html = `
  ;(function () {
    window.abMode = window.localStorage.getItem('abMode')

    if(!window.abMode) {
      window.abMode = Math.random() > 0.5 ? 'b' : 'a'
      window.localStorage.setItem('abMode', window.abMode)
    }

    document.body.classList.add(window.abMode === 'a' ? 'ab-mode-a' : 'ab-mode-b')
  })()
`

exports.onRenderBody = ({ setPreBodyComponents }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var React = require('react')
  setPreBodyComponents([
    <script key="script" dangerouslySetInnerHTML={{ __html }} />,
  ])
}
