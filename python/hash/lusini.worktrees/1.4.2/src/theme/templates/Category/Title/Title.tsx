import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { useCategoryTree, useHits } from 'modules/listing'
import {
  useCategoryTree as useSeriesCategoryTree,
  useHits as useSeriesHits,
} from 'modules/seriesListing'
import { LISTING_RECORD_ID } from 'theme/organisms/Category/const'
import { ms } from 'modules/browser/const'
import useTranslations from 'hooks/useTranslations'

type Props = {
  title: string
  isSeriesListing: boolean
}

export default function Title(props: Props) {
  const tree = props.isSeriesListing
    ? useSeriesCategoryTree(LISTING_RECORD_ID)
    : useCategoryTree(LISTING_RECORD_ID)
  const hits = props.isSeriesListing
    ? useSeriesHits(LISTING_RECORD_ID)
    : useHits(LISTING_RECORD_ID)
  const t = useTranslations<'templates-Category'>()
  const { item } = tree.data

  return (
    <Wrapper className="title">
      <h1>{props.title}</h1>
      {hits.data.length > 0 ? (
        <small>
          {props.isSeriesListing
            ? t('series_title', {
                numHits: hits.nbHits || '',
                __transformers: {
                  // eslint-disable-next-line react/display-name
                  numHits: (label) => <b>{label}</b>,
                },
              })
            : t('category_title_below', {
                numHits: hits.nbHits || '',
                categoryName: item?.name || '',
                __transformers: {
                  // eslint-disable-next-line react/display-name
                  numHits: (label) => <b>{label}</b>,
                  // eslint-disable-next-line react/display-name
                  categoryName: (label) => <b>{label}</b>,
                },
              })}
        </small>
      ) : (
        <small data-cy-state="no-hits">{t('category_no_hits_below')}</small>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: ${theme.spacing('m')};
  background: ${theme.colors.shade.primaryUltraBright};
  text-align: center;

  > h1 {
    ${theme.ty('rc-3xl')}
    margin: 0;
    margin-bottom: ${theme.spacing('xxs')};
    @media (min-width: ${ms.LG}px) {
      ${theme.ty('rc-4xl')}
      margin-bottom: ${theme.spacing('xs')}
    }
  }

  > small {
    ${theme.ty('r-xs')}
    @media (min-width: ${ms.LG}px) {
      ${theme.ty('r-s')}
    }

    b {
      color: ${theme.colors.primary};
      font-weight: bold;
    }
  }
`
