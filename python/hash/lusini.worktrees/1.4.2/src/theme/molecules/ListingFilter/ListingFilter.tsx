import * as React from 'react'
import styled from 'styled-components'
import ArrowRight from 'assets/arrow-right.svg'
import Filter from 'assets/filter.svg'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import FilterDrawer from './FilterDrawer'
import SortingDropdown from './SortingDropdown'
import useTranslations from 'hooks/useTranslations'
import SelectedFilters from './SelectedFilters'
import { useAttributes } from 'modules/listing'
import * as filterEvents from './FilterDrawer/events'

type Props = {
  recordId: string
}

export default function ListingFilter(props: Props) {
  const [showDrawer, setShowDrawer] = React.useState<null | string>(null)
  const t = useTranslations<'molecules-ListingFilter'>()
  const attributes = useAttributes(props.recordId)

  const prominent = React.useMemo(() => {
    const blacklist = new Set(['HAS_STOCK', 'PRICE'])
    return attributes.data.filter((f) => !blacklist.has(f.key)).slice(0, 3)
  }, [attributes.data])

  const handleFilterClick = (filter) => {
    filterEvents.prominentFilterClick(filter)
    setShowDrawer(filter)
  }
  const handleCloseDrawer = (eventType: string) => {
    filterEvents.filterDrawerClose(eventType)
    setShowDrawer(null)
  }

  return (
    <Wrapper className="ListingFilter" data-cy-ctx={'molecules/ListingFilter'}>
      <div className="filters">
        <div className="prominent">
          {prominent.map((attr) => (
            <button
              key={attr.key}
              className="filter demo-filter"
              onClick={() => handleFilterClick(attr.key)}
              data-cy-handle={'prominent-filter'}
            >
              <span>{attr.label}</span>
              <ArrowRight />
            </button>
          ))}
          <button
            className="filter all-filter"
            onClick={() => handleFilterClick('any')}
            data-cy-handle={'showDrawer'}
          >
            <Filter />
            <span>{t('category_filter_all_filters_btn')}</span>
          </button>
        </div>

        <SortingDropdown recordId={props.recordId} />

        {Boolean(showDrawer) && (
          <FilterDrawer
            selectedFilter={showDrawer}
            recordId={props.recordId}
            onClose={(eventType) => handleCloseDrawer(eventType || '')}
            data-cy-state={'drawerShown'}
          />
        )}
      </div>
      <SelectedFilters recordId={props.recordId} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .filters {
    display: flex;
    > .prominent {
      flex: 1;
      margin-right: ${theme.spacing('m')};
      > .filter {
        display: none;
      }
      > .all-filter {
        border: 1px solid ${theme.colors.shade.b2};
        height: 45px;
        width: 100%;
        ${theme.rounding('s')}
        ${theme.ty('rc-base', 'bold')}
        color: ${theme.colors.b0};
        display: flex;
        align-items: center;
        justify-content: center;
        > svg {
          margin-right: 10px;
          margin-bottom: -2px;
          path {
            fill: ${theme.colors.shade.b2};
          }
        }
      }

      @media (min-width: ${ms.MD}px) {
        display: flex;
        border-top: 1px solid ${theme.colors.shade.b5};
        border-bottom: 1px solid ${theme.colors.shade.b5};
        padding: ${theme.spacing('xxs')} 0;
        align-items: center;

        > .filter {
          flex: 1;
          padding: 0 ${theme.spacing('m')};
          border-right: 1px solid ${theme.colors.shade.b5};
          height: 33px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        > .demo-filter {
          ${theme.ty('rc-base')}
          > svg {
            height: 10px;
          }
        }

        > .all-filter {
          border: none;
          justify-content: center;
          font-weight: normal;
        }
      }
    }

    > .SortingDropdown {
      flex: 1;
      height: 45px;

      @media (min-width: ${ms.MD}px) {
        max-width: 200px;
      }
    }
  }

  > .SelectedFilters {
    margin-top: ${theme.spacing('s')};
    @media (min-width: ${ms.LG}px) {
      margin-top: ${theme.spacing('m')};
    }
  }
`
