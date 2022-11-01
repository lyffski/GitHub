import { addRule } from 'redux-ruleset'
import { FETCH_SUCCESS } from 'modules/productDetail/const'
import { navigate } from 'gatsby'

/**
 * When we fetch data for the pdp
 * And get an empty response
 * Then we redirect to 404 route
 */
addRule({
  id: 'f-pdp/404',
  target: FETCH_SUCCESS,
  output: '#navigate',
  condition: (action) => action.payload.length === 0,
  consequence: () => {
    navigate('/404/')
  },
})
