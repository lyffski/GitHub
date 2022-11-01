import * as React from 'react'
import styled from 'styled-components'
import Container from 'theme/atoms/Container'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'
import PrepaymentIcon from 'assets/paymentIcons/prepayment.svg'
import InvoiceIcon from 'assets/paymentIcons/invoice.svg'
import CashOnDeliveryIcon from 'assets/paymentIcons/cash-on-delivery.svg'
import PaypalIcon from 'assets/paymentIcons/paypal.svg'
import VisaIcon from 'assets/paymentIcons/visa.svg'
import MastercardIcon from 'assets/paymentIcons/mastercard.svg'
import IdealIcon from 'assets/paymentIcons/ideal.svg'

type Props = {
  iconList: string[]
  ['data-cy-state']: string
}

export default function PaymentIcons(props: Props) {
  const t = useTranslations<'app-Footer'>()

  const paymentsDict = {
    ['invoice']: (
      <div key="invoice-icon" className="payment-icon with-text">
        <InvoiceIcon />
        <div className="icon-text">{t('payment_invoice')}</div>
      </div>
    ),
    ['prepayment']: (
      <div key="prepayment-icon" className="payment-icon with-text">
        <PrepaymentIcon />
        <div className="icon-text">{t('payment_prepayment')}</div>
      </div>
    ),
    ['cash-on-delivery']: (
      <div key="cash-on-delivery-icon" className="payment-icon with-text">
        <CashOnDeliveryIcon />
        <div className="icon-text">{t('payment_cash_on_delivery')}</div>
      </div>
    ),
    ['paypal']: (
      <div key="paypal-icon" className="payment-icon">
        <PaypalIcon />
      </div>
    ),
    ['paypal-partial-payment']: (
      <div key="paypal-partial-payment-icon" className="payment-icon with-text">
        <PaypalIcon />
        <div className="icon-text paypal">
          {t('payment_paypal_partial_payment')}
        </div>
      </div>
    ),
    ['paypal-invoice']: (
      <div key="invoice-paypal-invoice" className="payment-icon with-text">
        <PaypalIcon />
        <div className="icon-text paypal">{t('payment_paypal_invoice')}</div>
      </div>
    ),
    ['visa']: (
      <div key="visa-icon" className="payment-icon">
        <VisaIcon />
      </div>
    ),
    ['mastercard']: (
      <div key="mastercard-icon" className="payment-icon">
        <MastercardIcon />
      </div>
    ),
    ['ideal']: (
      <div key="ideal-icon" className="payment-icon">
        <IdealIcon />
      </div>
    ),
  }

  return (
    <Wrapper data-cy-state={props['data-cy-state']}>
      <Container className="acceptedPaymentsContainer">
        {props.iconList.map((key) => {
          return paymentsDict[key]
        })}
      </Container>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: ${theme.colors.b0};

  > .acceptedPaymentsContainer {
    flex-wrap: wrap;
    padding: 0px;
    width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    background: white;
    align-items: center;
    padding-bottom: ${theme.spacing('ml')};
    > .payment-icon {
      width: 90px;
      height: 90px;
      margin: ${theme.spacing('xs')};
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      align-items: center;
      overflow: hidden;

      &.with-text {
        position: relative;
        > .icon-text {
          text-transform: uppercase;
          color: ${theme.colors.shade.b2};
          ${theme.ty('r-xs', '700')}
          position: absolute;
          top: 4.0625rem;
          &.paypal {
            color: #253b80;
          }
        }
      }
      > svg {
        width: 100%;
      }
    }
  }
`
