

```javascript
import {createClient} from 'contentful'
import {createClient as management} from 'contentful-management'
import config from './src/config'

const cf = createClient({
  space: config.modules.contentful.space,
  environment: config.modules.contentful.environment, // defaults to 'master' if not set
  accessToken: config.modules.contentful.accessToken,
  host: config.modules.contentful.host,
})

const m = management({
  accessToken: '<access-token>'
})

async function getBufferedFetch(client:typeof cf, config:any) {
  const { bufferSize, ...contentfulConfig } = config
  if (!bufferSize) throw new Error('bufferSize is required')
  const buffer:any[] = []
  let i = 0
  while (i * bufferSize < config.limit) {
    const entries = await client
      .getEntries<any>({
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

const blacklist = new Set([
  '3JEirTxT02lhKgTSNIVcut'
])

getBufferedFetch(cf, {
  content_type: 'magazineArticle',
  locale: 'de-DE',
  limit: 1000,
  bufferSize: 250,
}).then(async entries => {
  // let i = 0
  for(const entry of entries) {
    if(blacklist.has(entry.contentfulID)) continue
    // console.log(entry.contentfulID)
    try {
      await updateEntry(entry.contentfulID)
    }
    catch(e) {
      console.log('--------------------------------- ERROR ---------------------------------------')
      console.log(e)
    }
    // if(i++ > 1) break
  }
})
.catch(console.log)

function updateEntry (id:string) {
  console.log('update entry', id)
  return Promise.resolve()
  .then(() => m.getSpace('aza65graowyr'))
  .then(space => space.getEnvironment('master'))
  .then(env => env.getEntry(id))
  .then(entry => {
    entry.fields.teaserImageUrl['da-DK'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['nl-BE'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['en'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['fr-BE'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['fr-FR'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['fr-CH'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['de-AT'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['de-CH'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['it-IT'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['nb-NO'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['es-ES'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['sv-SE'] = entry.fields.teaserImageUrl['de-DE']
    entry.fields.teaserImageUrl['nl-NL'] = entry.fields.teaserImageUrl['de-DE']
    const isPublished = entry.isPublished()
    const isUpdated = entry.isUpdated()
    return entry.update().then(entry => {
      if(!isPublished) return entry
      if(isUpdated) return entry
      return entry.publish()
    })
  })
}

// updateEntry('6rLJj9SPmVMcjODmymxzx0').then(() => console.log('done')).catch(console.log)
```