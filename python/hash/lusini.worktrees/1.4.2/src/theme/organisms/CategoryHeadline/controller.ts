import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import { getCategory } from 'utils/categories'
import slugify from 'utils/slugify'
import fetchCategoryNumHits from 'utils/fetchCategoryNumHits'

export default createController<t.UserConfig, t.Context>({
  async createContext(props) {
    if (props.categoryId === '') {
      return {
        numHits: null,
        title: '',
        link: '',
      }
    }

    const hit = await getCategory(props.categoryId)
    const numCategoryHits = await fetchCategoryNumHits(hit.path)

    return {
      numHits: numCategoryHits,
      title: hit.label !== '' ? hit.label : '',
      link: hit.path !== '' ? '/category/' + slugify(hit.path) : '',
    }
  },
})
