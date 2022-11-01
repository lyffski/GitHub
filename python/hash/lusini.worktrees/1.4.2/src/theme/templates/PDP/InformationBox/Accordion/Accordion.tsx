import * as React from 'react'
import styled from 'styled-components'
import ArrowDown from 'assets/arrow-down.svg'
import ArrowUp from 'assets/arrow-up.svg'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import * as events from '../events'
import useInView from 'hooks/useInView'
type Props = {
  label?: string
  smallLabel?: boolean
  children: any
  productData?: any
  productPath?: any
  disableToggle?: any
  'data-cy-state'?: string
}

export default function Accordion(props: Props) {
  const [open, setOpen] = React.useState(props.disableToggle)
  const [ref, refInVp] = useInView<HTMLDivElement>(50, true)
  const textClass = props.smallLabel ? 'text' : 'category'

  React.useEffect(() => {
    if (refInVp && props.productData && props.productPath) {
      const { title, sku } = props.productData
      events.productInformationAccordionVisible(props.productPath, title, sku)
    }
  }, [refInVp])
  const handleClick = () => {
    setOpen(!open)
    if (!open && props.productData && props.productPath) {
      const { title, sku } = props.productData
      events.productInformationAccordionClick(props.productPath, title, sku)
    }
  }
  if (props.disableToggle) {
    return (
      <Wrapper
        className="Accordion"
        data-cy-collection="Accordion"
        data-cy-state={props['data-cy-state']}
      >
        <div
          className={'label' + (!props.label ? ' disabledToggle' : '')}
          data-cy-state="force-extend"
        >
          {props.label && (
            <span data-cy-state="has-label" className={textClass}>
              {props.label}
            </span>
          )}
        </div>
        <div className="content">{props.children}</div>
      </Wrapper>
    )
  }

  return (
    <Wrapper
      className="Accordion"
      data-cy-collection="Accordion"
      data-cy-state={props['data-cy-state']}
      ref={ref}
    >
      <button
        className="label"
        onClick={handleClick}
        data-cy-handle="toggle-btn"
      >
        {props.label && (
          <span data-cy-state="has-label" className={textClass}>
            {props.label}
          </span>
        )}
        {open ? <ArrowUp data-cy-state="visible:arrow-up" /> : <ArrowDown />}
      </button>
      {props.children && open && (
        <div className="content" data-cy-state="visible:content">
          {props.children}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-top: 1px solid ${theme.colors.shade.b5};

  > .label {
    padding: ${theme.spacing('ml')} 0;

    > span {
      ${theme.ty('rc-base')}

      @media (min-width: ${ms.SM}px) {
        ${theme.ty('rc-xl')}
      }
      color: ${theme.colors.b0};
    }
  }

  > .disabledToggle {
    padding-bottom: 0;
  }

  &:last-child {
    border-bottom: 1px solid ${theme.colors.shade.b5};
  }

  > button {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    > svg {
      margin-right: ${theme.spacing('m')};
    }
  }

  > .content {
    margin-bottom: ${theme.spacing('ml')};
  }
`
