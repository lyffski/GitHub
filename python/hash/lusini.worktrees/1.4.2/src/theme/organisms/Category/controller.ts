import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import { getCategory, getFilters } from 'utils/categories'
import prefetchListing from 'modules/listing/prefetchListing'

export default createController<t.UserConfig, t.Context>({
  async createContext(props) {
    if (props.categoryId === '') {
      return {
        categoryPath: '',
        mode: 'PRODUCTS',
        filters: [],
      }
    }

    const hit = await getCategory(props.categoryId)
    const filters = await getFilters(props.categoryId)

    return {
      categoryPath: hit ? hit.path : '',
      mode: hit?.hasSeries ? 'SERIES' : 'PRODUCTS',
      filters: filters,
    }
  },
  async createStoryEvents(props) {
    if (process.env.NODE_ENV !== 'production') return []

    if (props.context.mode === 'SERIES') {
      return []
    }

    try {
      return [
        await prefetchListing(
          'category',
          {
            category: props.context.categoryPath,
            flags: props.tag || props.tag === '' ? [props.tag] : [],
          },
          props.context.filters
        ),
      ]
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('prefetch listing failed', e)
      return []
    }
  },

  versionUpdate: (props) => {
    /** 14.10.2020 added max products prop */
    if (!props.__version) {
      props.__version = 1
      //@ts-ignore
      if (props.tag === '-' || props.tag === undefined) props.tag = ''
    }

    return props
  },
})
