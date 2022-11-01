import { useActualSeriesPath } from 'modules/seriesDetail'
import { useActualUIPath } from 'modules/ui'

type Output = {
  path: string
  allPath: {
    category: string
    search: string
    seriesListing: string
    seriesPDP: string
  }
}
export default function usePath(recordId): Output {
  const seriesPath = useActualSeriesPath()
  const uiPath = useActualUIPath()
  let path = ''
  if (
    recordId !== 'search' &&
    uiPath.data.category !== '' &&
    uiPath.data.category !== seriesPath.data.series
  ) {
    path = uiPath.data.category
  }
  if (recordId === 'search' && uiPath.data.search === '') {
    path = 'search'
  }
  if (uiPath.data.search !== '') {
    path = 'search / ' + uiPath.data.search
  }
  if (seriesPath.data.series !== '' && seriesPath.data.productLine !== '') {
    path = seriesPath.data.series + ' / ' + seriesPath.data.productLine
  }
  if (seriesPath.data.series !== '' && seriesPath.data.productLine === '') {
    path = seriesPath.data.series
  }

  const allPath = {
    category:
      uiPath.data.category !== seriesPath.data.series && recordId !== 'search'
        ? uiPath.data.category
        : '',
    search:
      recordId === 'search'
        ? uiPath.data.search !== ''
          ? 'search / ' + uiPath.data.search
          : 'search'
        : '',
    seriesListing:
      seriesPath.data.productLine === '' && seriesPath.data.series !== ''
        ? seriesPath.data.series
        : '',
    seriesPDP:
      seriesPath.data.series !== '' && seriesPath.data.productLine !== ''
        ? seriesPath.data.series + ' / ' + seriesPath.data.productLine
        : '',
  }
  return { path: path, allPath: allPath }
}
