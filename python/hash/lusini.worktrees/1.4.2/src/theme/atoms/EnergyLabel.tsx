import * as React from 'react'
import styled from 'styled-components'
import config from 'config'
import { useModal } from 'modules/ui'
import EnergyLabelA from 'assets/energy-label/energy-label-a-left.svg'
import EnergyLabelB from 'assets/energy-label/energy-label-b-left.svg'
import EnergyLabelC from 'assets/energy-label/energy-label-c-left.svg'
import EnergyLabelD from 'assets/energy-label/energy-label-d-left.svg'
import EnergyLabelE from 'assets/energy-label/energy-label-e-left.svg'
import EnergyLabelF from 'assets/energy-label/energy-label-f-left.svg'
import EnergyLabelG from 'assets/energy-label/energy-label-g-left.svg'

type Props = {
  label: string | number
  energyLabelLink: string | null
  'data-cy-state'?: string
  'data-cy-handle'?: string
  size?: 'small' | 'medium' | 'large'
}

export default function EnergyLabel(props: Props) {
  const modal = useModal()
  const { label, energyLabelLink } = props

  const [energyLabel, setEnergyLabel] = React.useState(energyLabelLink || '')
  const efficiencyClassIcon = (label) => {
    switch (label) {
      case 'A':
        return <EnergyLabelA />
      case 'B':
        return <EnergyLabelB />
      case 'C':
        return <EnergyLabelC />
      case 'D':
        return <EnergyLabelD />
      case 'E':
        return <EnergyLabelE />
      case 'F':
        return <EnergyLabelF />
      case 'G':
        return <EnergyLabelG />
      default:
        return null
    }
  }
  const handleClick = (e) => {
    e.preventDefault()
    if (!energyLabelLink) return null
    modal.setContent(<img src={energyLabel} />)
    return true
  }

  React.useEffect(() => {
    if (!energyLabelLink) return
    const img =
      config.modules.cloudinary.endpoint +
      '/image/fetch/f_jpg/' +
      config.modules.cloudinary.endpoint +
      energyLabelLink
    setEnergyLabel(img)
  }, [energyLabelLink])
  return (
    <Wrapper
      size={props.size || 'small'}
      className={'Energylabel'}
      data-cy-state={props['data-cy-state']}
    >
      <span data-cy-handle={props['data-cy-handle']} onClick={handleClick}>
        {efficiencyClassIcon(label)}
      </span>
    </Wrapper>
  )
}

const Wrapper = styled.span<{ size: string }>`
  position: relative;
  cursor: pointer;
  > span {
    > svg {
        width: 100%;
      ${(props) => {
        switch (props.size) {
          case 'small':
            return `max-width: 50px;`
          case 'medium':
            return `max-width: 80px;`
          default:
            return `max-width: 100px;`
        }
      }}}`
