import * as React from 'react'
import styled from 'styled-components'
import Drawer, { DrawerApi } from 'theme/atoms/Drawer'
import PriceFilter from './PriceSlider'
import RangeSlider from './RangeSlider'
import CheckFilter from './CheckFilter'
import ColorFilter from './ColorFilter'
import theme from 'theme'
import Button from 'theme/atoms/Button'
import useTranslations from 'hooks/useTranslations'
import { useAttributes } from 'modules/listing'
import ToggleFilter from './ToggleFilter'
import * as filterEvents from './events'

//init

type Props = {
  selectedFilter: string | null
  recordId: string
  onClose: (eventType?: string) => void
  'data-cy-state': string
}

export default function FilterDrawer(props: Props) {
  const drawerRef = React.useRef<null | DrawerApi>(null)
  const t = useTranslations<'molecules-ListingFilter'>()
  const attributes = useAttributes(props.recordId)

  const handleClose = () => {
    filterEvents.filterDrawerClose('Anwenden')
    if (!drawerRef.current) props.onClose()
    else drawerRef.current.close()
  }

  return (
    <Drawer
      onClose={props.onClose}
      onTriggerDLEvent={(dlevent) => {
        filterEvents.filterDrawerClose(dlevent)
      }}
      visible={true}
      apiRef={drawerRef}
      data-cy-state={props['data-cy-state']}
    >
      <Wrapper className="FilterDrawer">
        {attributes.data.map((attr) => {
          if (attr.key === 'PRICE') {
            return <PriceFilter recordId={props.recordId} key={attr.key} />
          }
          if (attr.key === 'COLORSPACE') {
            return (
              <ColorFilter
                key={attr.key}
                recordId={props.recordId}
                expanded={props.selectedFilter === attr.key}
              />
            )
          } else if (attr.filtertype === 'toggle') {
            return (
              <ToggleFilter
                key={attr.key}
                recordId={props.recordId}
                filterKey={attr.key}
              />
            )
          } else if (attr.filtertype === 'rangeslider') {
            return (
              <RangeSlider
                recordId={props.recordId}
                filterKey={attr.key}
                expanded={props.selectedFilter === attr.key}
              />
            )
          } else {
            return (
              <CheckFilter
                key={attr.key}
                recordId={props.recordId}
                filterKey={attr.key}
                expanded={props.selectedFilter === attr.key}
              />
            )
          }
        })}

        <div className="button-wrapper">
          <Button
            onClick={handleClose}
            variation="primary"
            data-cy-handle={'closeDrawer'}
          >
            {t('use_selected_filter_btn')}
          </Button>
        </div>
      </Wrapper>
    </Drawer>
  )
}

const Wrapper = styled.div`
  padding: 0 ${theme.spacing('ml')};
  padding-bottom: 100px;
  > .CheckFilter,
  > .ColorFilter {
    margin-top: ${theme.spacing('m')};
  }

  > .button-wrapper {
    display: flex;
    margin-top: ${theme.spacing('ml')};
    justify-content: center;
  }
`
