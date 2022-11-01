const trustedShopScript = (id) => {
  return `
    setTimeout(() => {
      (function () { 
      var _tsid = '${id}'; 
      _tsConfig = { 
        'yOffset': '0', /* offset from page bottom */
        'variant': 'custom_reviews', /* reviews, default, custom, custom_reviews */
        'customElementId': 'trustedshop-badge', /* required for variants custom and custom_reviews */
        'trustcardDirection': 'topLeft', /* for custom variants: topRight, topLeft, bottomRight, bottomLeft */
        'customBadgeWidth': '', /* for custom variants: 40 - 90 (in pixels) */
        'customBadgeHeight': '', /* for custom variants: 40 - 90 (in pixels) */
        'disableResponsive': 'true', /* deactivate responsive behaviour */
        'disableTrustbadge': 'false', /* deactivate trustbadge */
      };
      var _ts = document.createElement('script');
      _ts.type = 'text/javascript'; 
      _ts.charset = 'utf-8'; 
      _ts.async = true; 
      _ts.src = 'https://widgets.trustedshops.com/js/' + _tsid + '.js'; 
      var __ts = document.getElementsByTagName('script')[0];
      __ts.parentNode.insertBefore(_ts, __ts);
    })()}, 5000);
  `
}

exports.onRenderBody = ({ setPostBodyComponents }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var React = require('react')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var config = require('../../src/config')
  let id = config.modules.trustedshop.id
  let active = config.features.trustedshop
  if (active && id) {
    setPostBodyComponents([
      <script
        key="trustedShops"
        type="text/plain"
        className="optanon-category-C0002"
        dangerouslySetInnerHTML={{ __html: trustedShopScript(id) }}
      />,
    ])
  }
}
