module.exports = () => {
  bubbleError(
    2,
    'algoliasearch is not available during testing. please mock your side-effects'
  )
}

function bubbleError(size, msg) {
  const e = new Error(msg)
  if (e.stack) {
    const lines = e.stack.split('\n')
    const combined = [lines.shift()]
    for (let i = 0; i < size; i++) lines.shift()

    e.stack = combined.concat(lines).join('\n')
  }
  throw e
}
