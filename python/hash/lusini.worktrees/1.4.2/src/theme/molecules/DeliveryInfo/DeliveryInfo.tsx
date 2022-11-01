import * as React from 'react'
import styled from 'styled-components'
import Deliverable from 'assets/available.svg'
import NotDeliverable from 'assets/nicht-lieferbar.svg'
import { DeliveryInformation } from 'utils/calculateDeliveryDate'
import { ms } from 'modules/browser/const'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'

type Props = DeliveryInformation

export default function DeliveryInfo(props: Props) {
  const t = useTranslations<'deliveryInfo'>()
  return (
    <Wrapper className="DeliveryInfo" data-cy-ctx="DeliveryInfo">
      {props.icon === 'available' ? (
        <span className='icon-wrapper' data-cy-state="deliverable">
          <Deliverable />
        </span>
      ) : (
        <span className='icon-wrapper' data-cy-state="not-deliverable">
          <NotDeliverable />
        </span>
      )}
      <div className='info'>
        <span>{t(props.snippet, props.variables as any)}</span>
        {!!props.variables?.stock && props.variables.stock > 0 && (
          <div className="delivery-amount" data-cy-state="available-amount">
            <span>
              {t('available_amount')}
              {`: ${props.variables.stock} (${props.variables.packUnit})`}
            </span>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  
  display: flex;
  color: ${theme.colors.shade.b2};
  ${theme.ty('r-s')}

  @media (min-width: ${ms.MD}px) {
    ${theme.ty('r-base')}
  }

  > .icon-wrapper {
    > svg {
      margin-right: ${theme.spacing('xs')};
      width: 1.275rem;
      min-width: 1.275rem;
      height: 1.275rem;
      margin-top: 3px;
      > g {
        fill: ${theme.colors.accent.green};
      }
    }
  }

  > .info {
    flex: 1;
    > .delivery-amount {
      width: 100%;
      color: ${theme.colors.shade.b3};
      margin-top: ${theme.spacing('xxs')};
      margin-bottom: ${theme.spacing('xxs')};
      ${theme.ty('r-s')};
    }
  }
`
