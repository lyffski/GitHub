import fetch from 'node-fetch'
import getCookieByName from 'utils/getCookieByName'
import config from 'config'

type DYContext = {
  page: {
    type: string
    location: string
    locale: string
    data: unknown[]
  }
}

const createRequestOptions = (selector: string, dyContext: DYContext) => {
  const userId = 'test-user'
  const sessionId = 'test-session'

  const bodyData = {
    selector: {
      names: [selector],
    },
    user: {
      id: userId,
    },
    session: {
      custom: sessionId,
    },
    context: dyContext,

    options: {
      isImplicitPageview: false,
      returnAnalyticsMetadata: false,
    },
  }

  const options = {
    method: 'POST',
    headers: {
      'DY-API-Key': config.modules.dynamicYield.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
    json: true,
  }
  return options
}

export async function fetchContent(
  selector: string,
  type: string
): Promise<{ custom: unknown; skus: string[] }> {
  const result = await fetch(
    'https://direct.dy-api.eu/v2/serve/user/choose',
    createRequestOptions(selector, {
      page: {
        type: type,
        location: 'https://www.lusini.com/de-de/',
        locale: 'de_DE',
        data: [],
      },
    })
  )
  const content = await result.json()
  const data = content.choices[0].variations[0].payload.data

  return {
    custom: data.custom,
    skus: (data.slots || []).map((row) => row.sku),
  }
}

let eventBuffer: { cb: any; url: string }[] = []
function bufferSend(
  url: string,
  cb: (context: { user: string; sessionId: string }) => any
) {
  const context = getDyContext()
  if (!context) {
    eventBuffer.push({ cb, url })
    return
  }

  const events = [{ url, options: cb(context) }]

  if (eventBuffer.length > 0) {
    for (const b of eventBuffer)
      events.push({ url: b.url, options: b.cb(context) })
    eventBuffer = []
  }

  for (const evt of events) fetch(evt.url, evt.options)
}

export function reportEvent(event: any) {
  bufferSend(
    `https://direct-collect.dy-api.eu/v2/collect/user/event`,
    (context) => ({
      method: 'POST',
      headers: {
        'DY-API-Key': config.modules.dynamicYield.apiKey,
      },
      body: JSON.stringify({
        user: {
          id: context.user,
        },
        session: {
          custom: context.sessionId,
        },
        events: [event],
      }),
      json: true,
    })
  )
}

export function reportPageVisit(visit: any) {
  bufferSend(
    `https://direct-collect.dy-api.eu/v2/collect/user/pageview`,
    (context) => ({
      method: 'POST',
      headers: {
        'DY-API-Key': config.modules.dynamicYield.apiKey,
      },
      body: JSON.stringify({
        user: {
          id: context.user,
        },
        session: {
          custom: context.sessionId,
        },
        context: visit,
      }),
      json: true,
    })
  )
}

export function reportEngagement(engagement: any) {
  bufferSend(
    `https://direct-collect.dy-api.eu/v2/collect/user/engagement`,
    (context) => ({
      method: 'POST',
      headers: {
        'DY-API-Key': config.modules.dynamicYield.apiKey,
      },
      body: JSON.stringify({
        user: {
          id: context.user,
        },
        session: {
          custom: context.sessionId,
        },
        engagements: [engagement],
      }),
      json: true,
    })
  )
}

let dyContext: null | { user: string; sessionId: string } = null

export function getDyContext(): typeof dyContext {
  const cookie = getCookieByName('datalayerCustomer')
  if (!cookie) return null
  const { user, sessionId } = JSON.parse(cookie)
  dyContext = { sessionId, user }
  return dyContext
}
