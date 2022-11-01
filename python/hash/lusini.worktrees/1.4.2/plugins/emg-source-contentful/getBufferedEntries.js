// fetch Entries by BufferSize and Limit

module.exports = async function getBufferedFetch(client, config) {
  const { bufferSize, ...contentfulConfig } = config
  if (!bufferSize) throw new Error('bufferSize is required')
  const buffer = []
  let i = 0
  while (i * bufferSize < config.limit) {
    const entries = await client
      .getEntries({
        ...contentfulConfig,
        limit: bufferSize,
        skip: i * bufferSize,
      })
      .then((response) =>
        response.items.map((o) => ({
          ...o.fields,
          contentfulID: o.sys.id,
          updatedAt: o.sys.updatedAt,
        }))
      )

    buffer.push(...entries)
    if (entries.length < bufferSize) break
    i++
  }
  return buffer.slice(0, config.limit)
}
