import * as React from 'react'
import styled from 'styled-components'
import { useFilter } from 'modules/productDetail'
import ArrowRight from 'assets/arrow-right.svg'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'

type Props = {
  filterKey: 'size' | 'variant' | 'style'
  label: 'size_label' | 'style_label' | 'variant_label'
  onInteract: () => void
}

export default function Filter(props: Props) {
  const filter = useFilter(props.filterKey)
  const t = useTranslations<'templates-PDP'>()
  if (filter.data.options.length === 0) return null

  const clickable = filter.data.options.length > 1

  return (
    <Wrapper
      className="Filter"
      data-cy-collection="Filter"
      onClick={clickable ? props.onInteract : undefined}
      as={clickable ? 'button' : undefined}
    >
      <div className="label">{t(props.label)}</div>
      {filter.data.value && (
        <div className="value" data-cy-state="has-value">
          {filter.data.value}
        </div>
      )}
      {filter.data.options.length > 1 && (
        <>
          <ArrowRight />
          <span data-cy-state="multi-options" style={{ display: 'none' }} />
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid ${theme.colors.shade.b5};
  padding: ${theme.spacing('s')} 0;
  &:last-child {
    border-bottom: 1px solid ${theme.colors.shade.b5};
  }

  > .label {
    min-width: 5rem;
    ${theme.ty('rc-base')}
  }

  > .value {
    flex: 1;
    ${theme.ty('rc-base')}
    color: ${theme.colors.shade.b3};
    margin-left: ${theme.spacing('s')};
  }

  > svg {
    width: 6px;
    margin-right: ${theme.spacing('xs')};
  }
`
