import * as React from 'react'
import styled from 'styled-components'
import { useHits } from 'modules/seriesListing'
import SeriesWidget from '../SeriesWidget'
import theme from 'theme'
import Pagination from './Pagination'

type Props = {
  recordId: string
}

export default function SeriesList(props: Props) {
  const hits = useHits(props.recordId)
  const ref = React.useRef<any>()

  return (
    <Wrapper className="SeriesList" ref={ref}>
      <div className="list">
        {hits.data.map((hit) => (
          <SeriesWidget key={hit.objectID} hit={hit} />
        ))}
      </div>

      <Pagination recordId={props.recordId} scrollRef={ref} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .list {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${theme.spacing('s')};
    grid-row-gap: calc(${theme.spacing('m')} * 2);
    position: relative;

    @media (min-width: ${theme.ms.MD}px) {
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: ${theme.spacing('m')};
      grid-row-gap: calc(${theme.spacing('l')} * 2);
    }
    @media (min-width: ${theme.ms.XL}px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    /** calc vertical line */

    @media (max-width: ${theme.ms.MD - 1}px) {
      > .SeriesWidget:nth-child(2n + 3):before {
        content: '';
        height: 1px;
        width: 100%;
        left: 0;
        margin-top: calc(${theme.spacing('m')} * -1);
        background: ${theme.colors.shade.b6};
        position: absolute;
        cursor: default;
      }
    }
    @media (min-width: ${theme.ms.MD}px) and (max-width: ${theme.ms.XL - 1}px) {
      > .SeriesWidget:nth-child(3n + 4):before {
        content: '';
        height: 1px;
        width: 100%;
        left: 0;
        margin-top: calc(${theme.spacing('l')} * -1);
        background: ${theme.colors.shade.b6};
        position: absolute;
        cursor: default;
      }
    }
    @media (min-width: ${theme.ms.XL}px) {
      > .SeriesWidget:nth-child(4n + 5):before {
        content: '';
        height: 1px;
        width: 100%;
        left: 0;
        margin-top: calc(${theme.spacing('l')} * -1);
        background: ${theme.colors.shade.b6};
        position: absolute;
        cursor: default;
      }
    }
  }

  > .Pagination {
    margin-top: ${theme.spacing('xl')};
  }
`
