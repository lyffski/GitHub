import * as React from 'react'
import { addRule } from 'redux-ruleset'
import FlyoutCart from 'theme/partials/FlyoutCart'
import { ADD_ITEM_SUCCESS } from 'modules/cart/const'
import * as Partials from 'containers/Partials'

/**
 * Wenn ich als Kunde etwas in den Warenkorb lege,
 * dann soll auf der rechten Seite der Flyout Warenkorb erscheinen (ausfahren).
 */
addRule({
  id: 'feature/SHOW_FLYOUTCART',
  target: ADD_ITEM_SUCCESS,
  output: '#partial-mount',
  consequence: (action, { getState }) => {
    const state = getState()

    const remove = () => {
      Partials.remove('feature/SHOW_FLYOUTCART')
    }
    Partials.add('feature/SHOW_FLYOUTCART', () => {
      if (
        state.productDetail &&
        state.productDetail.data.length &&
        state.productDetail.data[0].related.optionalAdditions.length
      ) {
        return (
          <FlyoutCart
            optionalAdditions={
              state.productDetail?.data[0].related.optionalAdditions || []
            }
            remove={remove}
          />
        )
      } else {
        return <FlyoutCart remove={remove} />
      }
    })
  },
})
