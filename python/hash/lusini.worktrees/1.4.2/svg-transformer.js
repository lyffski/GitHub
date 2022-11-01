module.exports = {
  process(src, filename) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    if (filename.includes('/static/')) return `module.exports = ''`
    else
      return `
      const React = require('react')
      module.exports = (props) => {
        return React.createElement('span', props, '')
      }
    `
  },
  getCacheKey() {
    // The output is always the same.
    return 'svgTransform'
  },
}
