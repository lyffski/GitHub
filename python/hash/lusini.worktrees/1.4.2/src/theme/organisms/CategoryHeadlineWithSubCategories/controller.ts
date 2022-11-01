import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import { getCategory } from 'utils/categories'
import slugify from 'utils/slugify'
import fetchCategoryNumHits from 'utils/fetchCategoryNumHits'
import { createOptImg } from 'utils/imageOptimization'

export default createController<t.UserConfig, t.Context>({
  async createContext(props, { getGridContext }) {
    const optImg = await createOptImg(props.teaserImage, getGridContext(), {
      XL: 0.3,
    })

    const categoryOptImg = await Promise.all(
      props.categories.map((cat) =>
        createOptImg(cat.imgSrc, getGridContext(), {
          XS: 0.5,
          SM: 0.5,
          MD: 0.3,
          LG: 0.25,
          XL: 0.2,
        })
      )
    )
    const hit = await getCategory(props.categoryId)

    if (props.categoryId === '' || !hit) {
      return {
        numHits: null,
        title: '',
        link: '',
        optImg: optImg,
        categoryOptImg,
      }
    }

    const numCategoryHits = await fetchCategoryNumHits(hit.path)

    return {
      numHits: numCategoryHits,
      title: hit.label !== '' ? hit.label : '',
      link: hit.path !== '' ? '/category/' + slugify(hit.path) : '',
      optImg: optImg,
      categoryOptImg,
    }
  },
})
