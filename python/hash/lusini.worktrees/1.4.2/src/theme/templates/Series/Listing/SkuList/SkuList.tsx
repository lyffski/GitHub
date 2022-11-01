import * as React from 'react'
import styled from 'styled-components'
import { useHits, usePage } from 'modules/listing'
import SkuWidget from './SkuWidget'
import Pagination from 'theme/molecules/Pagination'
import theme from 'theme'

type Props = {
  recordId: string
  scrollRef: React.MutableRefObject<HTMLElement | null>
}

export default function SkuList(props: Props) {
  const hits = useHits(props.recordId)
  const page = usePage(props.recordId)

  const handlePageChange = (setPage: number) => {
    page.set(setPage)
    props.scrollRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <Wrapper className="SkuList">
      {hits.data.map((hit) => (
        <SkuWidget hit={hit} key={hit.objectID} />
      ))}
      <Pagination
        currentPage={page.data.page}
        pageCount={page.data.nbPages}
        pageIndices={page.options}
        handlePageChange={handlePageChange}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .SkuWidget {
    margin-bottom: ${theme.spacing('m')};
  }
`
