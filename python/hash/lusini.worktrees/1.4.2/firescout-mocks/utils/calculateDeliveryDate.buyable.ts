import { DeliveryInformation } from '../../src/utils/calculateDeliveryDate'

const data: DeliveryInformation = {
  icon: 'available',
  isBuyable: true,
  snippet: 'available',
  variables: undefined,
}

// @ts-expect-error
data.__sync = true

export default data
