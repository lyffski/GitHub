import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { useCategoryTree, useHits } from 'modules/listing'
import { LISTING_RECORD_ID } from 'theme/organisms/Category/const'
import { ms } from 'modules/browser/const'
import useTranslations from 'hooks/useTranslations'

type Props = {
  title: string
}

export default function Title(props: Props) {
  const tree = useCategoryTree(LISTING_RECORD_ID)
  const hits = useHits(LISTING_RECORD_ID)
  const t = useTranslations<'templates-Tag-Category'>()
  const { item } = tree.data

  return (
    <Wrapper className="title">
      <h1>{props.title}</h1>
      {hits.data.length > 0 ? (
        <small>
          {t('tag_category_title_below', {
            numHits: hits.nbHits || '',
            categoryName: item?.name || props.title || '',
            __transformers: {
              // eslint-disable-next-line react/display-name
              numHits: (label) => <b>{label}</b>,
              // eslint-disable-next-line react/display-name
              categoryName: (label) => <b>{label}</b>,
            },
          })}
        </small>
      ) : (
        <small data-cy-state="no-hits">{t('tag_category_no_hits_below')}</small>
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
