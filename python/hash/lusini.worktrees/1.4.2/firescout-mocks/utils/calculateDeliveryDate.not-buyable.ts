import { DeliveryInformation } from '../../src/utils/calculateDeliveryDate'

const data: DeliveryInformation = {
  icon: 'notAvailable',
  snippet: 'closeout_exceed',
  isBuyable: false,
  variables: {
    stock: '0',
    amount: '1',
  },
}

// @ts-expect-error
data.__sync = true

export default data
