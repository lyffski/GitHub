import * as React from 'react'
import config from 'config'
import Template from './Category'
import { getAllCategories } from 'utils/categories'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import slugify, { slugifyWithSlashes } from 'utils/slugify'

type Props = {
  fields: {
    categoryId: string
    active: boolean
    title: string
    seoTitle: string
    seoDescription: string
    canonicalUrl: string
    story: any
  }
  contentfulID: string
}

export default function CategoryPreview(props: Props) {
  const [cat, setCat] = React.useState<any | null>(null)
  const [isFetching, setIsFetching] = React.useState<boolean>(true)
  const categoryIdMatch = props.fields.categoryId.match(/^(.*)\s\((.*)\)$/)
  const categoryId = categoryIdMatch
    ? categoryIdMatch[2]
    : props.fields.categoryId
  const categoryName = categoryIdMatch
    ? categoryIdMatch[1]
    : props.fields.categoryId

  React.useEffect(() => {
    getAllCategories().then(async (categories) => {
      const byPath = {}
      const byParent = {}

      for (const cat of categories) {
        const parentPath = cat.path.split(' > ').slice(0, -1).join(' > ')
        byPath[cat.path] = cat
        if (!byParent[parentPath]) byParent[parentPath] = []
        byParent[parentPath].push(cat)
      }

      const root = categories.find((cat) => cat.objectID === categoryId)

      const getParent = (category) => {
        const parentPath = category.path.split(' > ').slice(0, -1).join(' > ')
        const parentCat =
          parentPath !== category.path ? byPath[parentPath] : null
        if (!parentCat) return null
        return {
          categoryLevel: parentCat.level,
          label: parentCat.label,
          parent: getParent(parentCat),
          urlPath: '/category/' + slugify(`${parentCat.path}/`),
        }
      }

      root.parent = getParent(root)
      setIsFetching(false)
      setCat(root)
    })
  }, [])

  if (isFetching)
    return (
      <Layout>
        <Container>
          <div>fetching...</div>
        </Container>
      </Layout>
    )

  if (!cat)
    return (
      <Layout>
        <Container>
          <h1>cannot find category-id {categoryId}</h1>
        </Container>
      </Layout>
    )

  return (
    <Template
      pageContext={{
        categoryId: categoryId,
      }}
      location={{
        pathname: `/${config.locale}/category/test-category`,
        origin: config.baseUrl,
      }}
      data={{
        category: {
          ...cat,
          contentfulID: props.contentfulID,
          noIndex: config.features.seoNoFollow,
          active: props.fields.active,
          title: props.fields.title || categoryName,
          seoTitle: props.fields.seoTitle,
          seoDescription: props.fields.seoDescription,
          canonicalUrl: props.fields.canonicalUrl || '',
          story: props.fields.story,
          urlPath: slugifyWithSlashes(`/category/${cat.path}/`),
          // parent: {
          //   categoryLevel: 0,
          //   label: 'EMG',
          //   parent: null,
          //   urlPath: '/category//',
          // },
          // parent: {},
          hrefLang: [],
        },
      }}
    />
  )
}
