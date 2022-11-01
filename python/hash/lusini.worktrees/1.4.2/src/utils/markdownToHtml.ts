import { Converter } from 'showdown'
import config from 'config'

const converter = new Converter({
  tables: true,
  extensions: [
    {
      // +++gold text+++
      type: 'output',
      regex: new RegExp('\\+\\+\\+(.*)\\+\\+\\+', 'g'),
      replace: '<div class="prominent">$1</div>',
    },
    {
      type: 'output',
      regex: new RegExp('<table>', 'g'),
      replace: '<div class="table-wrapper"><table>',
    },
    {
      type: 'output',
      regex: new RegExp('</table>', 'g'),
      replace: '</table></div>',
    },
    {
      // ++space
      type: 'lang',
      regex: new RegExp('\\+\\+space', 'g'),
      replace: '<div class="space"></div>',
    },
    {
      // ++h1
      type: 'output',
      regex: new RegExp('\\+\\+h1 (.*)', 'g'),
      replace: '<h1 class="visible">$1</h1>',
    },
    {
      // +++box
      type: 'output',
      regex: new RegExp('\\+\\+\\+box', 'g'),
      replace: '<div class="box">',
    },
    {
      // +++ close any div that starts with "+++some-label"
      type: 'output',
      regex: new RegExp('\\+\\+\\+', 'g'),
      replace: '</div>',
    },
    {
      // unwrap custom fields (start)
      type: 'output',
      regex: new RegExp('<p><div class=(.*)', 'g'),
      replace: '<div class=$1',
    },
    {
      // unwrap custom fields (end)
      type: 'output',
      regex: new RegExp('</div></p>', 'g'),
      replace: '</div>',
    },
    {
      // -> arrow
      type: 'output',
      regex: new RegExp('->|-&gt;', 'g'),
      replace: `
<svg class='arrow' style='transform:rotate(180deg)' viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>arrow</title>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="back" stroke="#2B271F" stroke-width="2">
            <g transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) translate(1.000000, 1.000000)">
                <line x1="-8.33703477e-13" y1="10.6944444" x2="21.3888889" y2="10.6944444" id="Path-5"></line>
                <polyline id="Path-6" points="10.6944444 0 21.3888889 10.6944444 10.6944444 21.3888889"></polyline>
            </g>
        </g>
    </g>
</svg>
`,
    },
    {
      type: 'output',
      regex: new RegExp('<oneT>(.*?)</oneT>', 'g'),
      replace:
        '<button class="onetrust-btn" onclick="window.OneTrust.ToggleInfoDisplay()"> $1 </button>',
    },
    /**
     * https://github.com/eBusEmmos/lusini/pull/793
     * Showdown adds a broken paragraph around our ++h1 extension, so we need to remove it again
     * Needs to be executed after the ++h1 extension
     */
    {
      type: 'output',
      regex: new RegExp('<p><h1 class="visible">(.*)</p></h1>', 'g'),
      replace: '<h1 class="visible">$1</h1>',
    },
  ],
})

/**
 *
 * @param md markdown string
 * @returns html string
 */
export default function markdownToHtml(md: string): string {
  let html = converter.makeHtml(md)

  // add localisation to markdown links
  if (process.env.NODE_ENV === 'production') {
    html = html.replace(/href="\//g, `href="/${config.locale}/`)
  }

  return html
}
