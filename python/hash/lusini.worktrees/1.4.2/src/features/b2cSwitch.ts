import { addRule } from 'redux-ruleset'
import { SET_CUSTOMER_TYPE } from 'modules/b2cSwitch/const'
import setCustomerType from 'utils/setCustomerType'

addRule({
  id: 'feature/b2cSwitch',
  target: SET_CUSTOMER_TYPE,
  output: '#set-customer-type',
  consequence: (action) => {
    setCustomerType(action.payload.customerType, action.payload.dlEvent)
  },
})
