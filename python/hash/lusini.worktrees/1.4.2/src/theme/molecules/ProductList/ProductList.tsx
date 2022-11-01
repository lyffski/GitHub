import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { useHits, usePage, useFilterValues } from 'modules/listing'
import { ms } from 'modules/browser/const'
import ProductWidget from 'theme/molecules/ProductWidget'
import CategoryTree from './CategoryTree'
import FilterList from 'theme/molecules/ListingFilter'
import Pagination from 'theme/molecules/Pagination'
import Button from 'theme/atoms/Button'
import useTranslations from 'hooks/useTranslations'
import Intersticial from './Intersticial'

export type Props = {
  recordId: string
  showCategoryTree?: boolean
  listname: string
  injectedTeasers?: {
    title: string
    imgUrl: string
    linkTarget: string
    linkLabel: string
    template: 'Image'
  }[]
}

export default function ProductList(props: Props) {
  const hits = useHits(props.recordId)
  const scrollRef = React.useRef<null | HTMLObjectElement>(null)
  const page = usePage(props.recordId)
  const filterValues = useFilterValues(props.recordId)
  const t = useTranslations<'molecules-ProductList'>()

  const handlePageChange = (setPage: number) => {
    page.set(setPage)

    setTimeout(() => {
      scrollRef?.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    })
  }

  const intersticials =
    props.injectedTeasers?.length === 2 ? props.injectedTeasers : []

  return (
    <Wrapper
      className="ProductList"
      data-cy-ctx="molecules/ProductList"
      ref={scrollRef}
    >
      {props.showCategoryTree && (
        <CategoryTree
          recordId={props.recordId}
          data-cy-state="show-categories"
        />
      )}

      <div className="right">
        <FilterList recordId={props.recordId} />
        {hits.isFetching ? (
          // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
          <div />
        ) : hits.data.length > 0 ? (
          <div className="products listing" data-cy-state="show-products">
            {intersticials.length === 2 && (
              <Intersticial
                {...intersticials[0]}
                data-cy-state="has-intersticial"
              />
            )}
            {intersticials.length === 2 && (
              <Intersticial
                {...intersticials[1]}
                data-cy-state="has-intersticial"
              />
            )}
            {hits.data.map((hit, i) => (
              <ProductWidget
                key={hit.sku}
                product={hit}
                listname={`${props.listname}${
                  page.data.page !== 1 ? '; Page: ' + page.data.page : ''
                }`}
                listPosition={i + 1}
              />
            ))}
          </div>
        ) : (
          <div className="no-result listing">
            <div className="prominent-message">
              {t('no_hits_headline', {
                query: '"' + filterValues.data.query + '"',
              })}
            </div>
            <div className="info-message">{t('no_hits_info')}</div>
            <Button
              variation="special"
              onClick={() => filterValues.clear()}
              data-cy-handle="reset-all-filters"
            >
              {t('no_hits_reset_btn')}
            </Button>
          </div>
        )}

        <Pagination
          currentPage={page.data.page}
          pageCount={page.data.nbPages}
          pageIndices={page.options}
          handlePageChange={handlePageChange}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${ms.LG}px) {
    flex-direction: row;
  }

  > .CategoryTree {
    margin-bottom: ${theme.spacing('xs')};
    @media (min-width: ${ms.LG}px) {
      width: 16.25rem;
      margin-right: ${theme.spacing('ml')};
      height: fit-content;
    }
  }

  > .right {
    width: 100%;

    > .listing {
      margin-top: ${theme.spacing('ml')};
      @media (min-width: ${ms.LG}px) {
        margin-top: ${theme.spacing('l')};
      }
    }
    > .no-result {
      text-align: center;
      margin-top: ${theme.spacing('xxl')};
      > div {
        &.prominent-message {
          margin: ${theme.spacing('xxs')};
          ${theme.ty('rc-xl')};
        }
        &.info-message {
          ${theme.ty('rc-s')}
        }
      }
      > button {
        margin: ${theme.spacing('s')} auto;
      }
    }

    > .products {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: ${theme.spacing('s')};
      grid-row-gap: calc(${theme.spacing('m')} * 2);
      position: relative;

      @media (min-width: ${ms.MD}px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: ${theme.spacing('m')};
        grid-row-gap: calc(${theme.spacing('l')} * 2);
      }
      @media (min-width: ${ms.XL}px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }

      > .Intersticial:nth-child(1) {
        grid-column-start: 1;
        grid-row-start: 4;
        grid-column-end: span 2;

        @media (min-width: ${ms.MD}px) {
          grid-column-start: 2;
          grid-row-start: 3;
          grid-column-end: span 2;
        }
        @media (min-width: ${ms.XL}px) {
          grid-column-start: 3;
          grid-row-start: 2;
          grid-column-end: span 2;
        }
      }

      > .Intersticial:nth-child(2) {
        grid-column-start: 1;
        grid-row-start: 8;
        grid-column-end: span 2;

        @media (min-width: ${ms.MD}px) {
          grid-column-start: 1;
          grid-row-start: 6;
          grid-column-end: span 2;
        }
        @media (min-width: ${ms.XL}px) {
          grid-column-start: 1;
          grid-row-start: 4;
          grid-column-end: span 2;
        }
      }

      /** TODO: DO NOT ACCESS INNER IMPLEMENTATION!!!! */
      > .ProductWidget {
        > .ImgBox {
          padding: 0 ${theme.spacing('s')};
          @media (min-width: ${ms.SM}px) {
            padding: 0 ${theme.spacing('m')};
          }
        }
      }

      /** calc vertical line */

      @media (max-width: ${ms.MD - 1}px) {
        > .ProductWidget:nth-child(2n + 3):before {
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
      @media (min-width: ${ms.MD}px) and (max-width: ${ms.XL - 1}px) {
        > .ProductWidget:nth-child(3n + 4):before {
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
      @media (min-width: ${ms.XL}px) {
        > .ProductWidget:nth-child(4n + 5):before {
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
  }
`
