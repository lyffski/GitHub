var fetch = require('node-fetch')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

setInterval(() => {
  fetch('https://dev.lusini.com:8000').then(
    async (res) => {
      const result = await res.text()
      if (
        result.includes(
          'var customerTypeMatch = document.cookie.match(/isb2c=([^;]*)/)'
        )
      ) {
        console.log('--------- server OK ---------')
      } else {
        console.log('-----------   server not reachable ---------------')
      }
    },
    (e) => console.log('------------ ERROR', e)
  )
}, 1000 * 15)
