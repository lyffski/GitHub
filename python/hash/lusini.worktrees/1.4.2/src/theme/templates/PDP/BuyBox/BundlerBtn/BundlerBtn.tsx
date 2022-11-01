import * as React from 'react'
import styled from 'styled-components'
import Button from 'theme/atoms/Button'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'
import { mappings } from 'theme/templates/OneToOneBundle/utils/mappings'
import * as configuratorEvents from 'theme/templates/OneToOneBundle/events'
import * as t from './types'
import useRelatedSkus from './useRelatedSkus'

export default function BuyBox(props: t.Props) {
  const t = useTranslations<'templates-PDP'>()
  const products = useRelatedSkus(props)

  return (
    <Wrapper data-cy-state={props['data-cy-state']}>
      {products?.nbHits && products?.nbHits > 0 ? (
        <>
          <div className="buy-wrapper">
            <Button
              variation="cart_disabled"
              data-cy-handle="add-to-configurator"
              fullWidth
              to={`/one-to-one-bundle/?sku=${props.variant.data.sku}/`}
              onClick={() =>
                configuratorEvents.startedFrom(
                  props.variant.data.sku,
                  props.variant.data.related.configurableRelations
                )
              }
            >
              {props.variant.data.related.configurableRelations &&
                t(
                  mappings[
                    props.variant.data.related.configurableRelations[0].type
                  ]
                )}
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .buy-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacing('m')};
    flex-wrap: nowrap;

    > button {
      text-align: center;
      > svg {
        height: 1rem;
        width: 1rem;
        margin-right: ${theme.spacing('xs')};
      }
      &.sold-out-button {
        cursor: not-allowed;
      }
    }
  }
`
