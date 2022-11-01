import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import { getCategory } from 'utils/categories'
import slugify from 'utils/slugify'
import fetchCategoryNumHits, {
  fetchSeriesNumHits,
} from 'utils/fetchCategoryNumHits'
import { createOptImg } from 'utils/imageOptimization'

export default createController<t.UserConfig, t.Context>({
  async createContext(props, { getGridContext }) {
    const optImg = await createOptImg(props.teaserImage, getGridContext())

    if (props.categoryId === '') {
      return {
        numHits: null,
        title: '',
        link: '',
        optImg: optImg,
        isSeries: false,
        categoryOptImg: await Promise.all(
          props.categories.map((cat) =>
            createOptImg(cat.imgSrc, getGridContext())
          )
        ),
      }
    }

    const hit = await getCategory(props.categoryId)
    const numCategoryHits = hit.hasSeries
      ? await fetchSeriesNumHits(props.categoryId)
      : await fetchCategoryNumHits(hit.path)

    return {
      numHits: numCategoryHits,
      title: hit.label !== '' ? hit.label : '',
      link: hit.path !== '' ? '/category/' + slugify(hit.path) : '',
      optImg: optImg,
      isSeries: Boolean(hit.hasSeries),
      categoryOptImg: await Promise.all(
        props.categories.map((cat) =>
          createOptImg(cat.imgSrc, getGridContext())
        )
      ),
    }
  },
})
