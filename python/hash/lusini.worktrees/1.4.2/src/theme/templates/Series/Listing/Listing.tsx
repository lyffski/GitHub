import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { useInitializer } from 'modules/listing'
import { SeriesContainer } from 'modules/seriesDetail/types'
import SkuList from './SkuList'
import ListingFilter from 'theme/molecules/ListingFilter'
import useTranslations from 'hooks/useTranslations'

type Props = {
  container: SeriesContainer
  filters: {
    label: string
    key: string
    filtertype: string
  }[]
}

export default function Listing(props: Props) {
  const RECORD_ID = 'series-pdp'
  const titleRef = React.useRef<any>()
  const t = useTranslations<'templates-Series'>()

  useInitializer(
    RECORD_ID,
    React.useMemo(
      () => ({
        productLine: props.container.objectID,
        distinct: false,
      }),
      [props.container.objectID]
    ),
    props.filters
  )

  return (
    <Wrapper className="Listing">
      <h2 ref={titleRef}>
        {t('listing_title', {
          seriesName: props.container.title,
        })}
      </h2>

      <ListingFilter recordId={RECORD_ID} />

      <SkuList recordId={RECORD_ID} scrollRef={titleRef} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  > h2 {
    ${theme.ty('rc-2xl')}

    @media (min-width: ${theme.ms.MD}px) {
      ${theme.ty('rc-3xl')}
    }
  }

  > .ListingFilter {
    margin-top: ${theme.spacing('s')};

    @media (min-width: ${theme.ms.MD}px) {
      margin-top: ${theme.spacing('m')};
    }
  }

  > .SkuList {
    margin-top: ${theme.spacing('ml')};

    @media (min-width: ${theme.ms.MD}px) {
      margin-top: ${theme.spacing('m')};
    }
  }
`
