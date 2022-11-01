import * as React from 'react'
import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'

const client = algoliasearch('WAVYBEW6OQ', '1c9701a0cd415235591cb737e2c47e27')
const helper = algoliasearchHelper(client, 'prod_lusini_de_DE_categories')

export default function useOptions() {
  const [options, setOptions] = React.useState([])
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    if (!search) return setOptions([])

    helper.setQuery(search)
    helper.searchOnce({ hitsPerPage: 100 }).then((result) => {
      setOptions(result.content.hits)
    })
  }, [search])

  return [search, setSearch, options] as [
    string,
    typeof setSearch,
    typeof options
  ]
}

useOptions.fetchOpt = async function fetchOpt(categoryId) {
  if (!categoryId) return null
  const helper = algoliasearchHelper(client, 'prod_lusini_de_DE_categories', {
    facets: ['objectID'],
  })

  helper.addFacetRefinement('objectID', categoryId)

  const result = await helper.searchOnce({ hitsPerPage: 1 })

  return result.content.hits[0]
}
