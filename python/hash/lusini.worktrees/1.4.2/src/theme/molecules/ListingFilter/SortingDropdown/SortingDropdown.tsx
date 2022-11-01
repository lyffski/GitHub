import * as React from 'react'
import styled from 'styled-components'
import ArrowDown from 'assets/arrow-down.svg'
import ArrowUp from 'assets/arrow-up.svg'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import { useIndex } from 'modules/listing'
import { Index } from 'modules/listing/types'
import useOutsideClick from 'hooks/useOutsideClick'
import useTranslations from 'hooks/useTranslations'
import * as event from './events'
import usePath from 'hooks/usePath'

type Props = {
  recordId: string
}

export default function SortingDropdown(props: Props) {
  const [open, setOpen] = React.useState(false)
  const index = useIndex(props.recordId)
  const outsideClickRef = useOutsideClick(() => {
    setOpen(false)
  })
  const t = useTranslations<'molecules-ListingFilter'>()
  const [initialEffect, setInitalEffect] = React.useState(false)
  const actualPath = usePath(props.recordId)

  const getActionType = () => {
    switch (props.recordId) {
      case 'category':
        return 'category_sorting'
      case 'series-pdp':
        return 'series_sorting'
      case 'search':
        return 'search_sorting'
      default:
        return ''
    }
  }

  React.useEffect(() => {
    if (
      actualPath.allPath.search !== '' &&
      props.recordId === 'search' &&
      initialEffect === false
    ) {
      event.sortingPreselect('bestresults', actualPath.path, getActionType())
      setInitalEffect(true)
    }
    if (props.recordId === 'series-pdp' || props.recordId === 'category') {
      event.sortingPreselect('bestresults', actualPath.path, getActionType())
    }
  }, [actualPath.path])
  const handleChangeIndex = (indexName: Index) => {
    setOpen(false)
    const payload = indexName === 'default' ? 'bestresults' : 'lowestprice'
    event.sortingChanged(payload, actualPath.path, getActionType())
    index.setIndex(indexName)
  }
  return (
    <Wrapper className="SortingDropdown" ref={outsideClickRef}>
      <button
        className="sorting"
        onClick={() => setOpen(!open)}
        data-cy-handle={'sortingToggle'}
      >
        <span>{t('sorting_filter_btn')}</span>
        {open ? (
          <ArrowUp data-cy-state={'sorting-arrowUpShown'} />
        ) : (
          <ArrowDown data-cy-state={'sorting-arrowDownShown'} />
        )}
      </button>

      {open && (
        <div className="content" data-cy-state={'sortingOpened'}>
          <div
            className="row"
            onClick={() => handleChangeIndex('default')}
            data-cy-handle={'sortingSetDefault'}
          >
            {t('sorting_filter_best_results')}
          </div>
          <div
            className="row"
            onClick={() => handleChangeIndex('price-asc')}
            data-cy-handle={'sortingSetPriceAsc'}
          >
            {t('sorting_filter_lowest_price')}
          </div>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;

  > .sorting {
    height: 100%;
    width: 100%;
    border: 1px solid ${theme.colors.shade.b5};
    ${theme.rounding('s')}
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${theme.spacing('m')};

    > span {
      ${theme.ty('rc-s')}
    }

    > svg {
      height: 7px;
      path {
        fill: ${theme.colors.shade.b3};
      }
    }

    @media (min-width: ${ms.MD}px) {
      > span {
        ${theme.ty('rc-base')}
      }
    }
  }

  > .content {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: calc(100% + ${theme.spacing('xs')});
    background: white;
    border: 1px solid ${theme.colors.shade.b5};
    ${theme.rounding('s')}

    > .row {
      padding: ${theme.spacing('xs')} ${theme.spacing('m')};
      ${theme.ty('rc-s')}

      &:hover {
        background: ${theme.colors.shade.b6};
        cursor: pointer;
      }

      @media (min-width: ${ms.MD}px) {
        ${theme.ty('rc-base')}
      }
    }
  }
`
