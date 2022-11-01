import { addRule } from 'redux-ruleset'
import {
  WIDGET_CLICK,
  WidgetClick,
  COLOR_CLICK,
} from 'theme/molecules/ProductWidget/events'
import { SET_FILTER_VALUES, FETCH_SUCCESS } from 'modules/productDetail/const'
import { setFilterValues } from 'modules/productDetail/actions'
import { FilterValues } from 'modules/productDetail/types'

/**
 * Given the user clicks on a ProductWidget
 * When the pdp store initializes
 * Then we preselect the filters based on the variants attributes
 */
addRule({
  id: 'feature/PROPAGATE_VARIANT_TO_PDP',
  target: SET_FILTER_VALUES,
  output: SET_FILTER_VALUES,
  position: 'INSTEAD',
  addWhen: function* (next, { context }) {
    yield next(WIDGET_CLICK, (action: WidgetClick) => {
      context.set('variant', action.payload)
      return true
    })
    return 'ADD_RULE'
  },
  addUntil: function* (next) {
    yield next(SET_FILTER_VALUES)
    return 'RECREATE_RULE'
  },
  consequence: (_, { context }) => {
    const variant: WidgetClick['payload'] = context.get('variant')
    const filterValues: Omit<FilterValues, 'containerID'> = {
      color: variant.variantData.color.label || null,
      size: variant.variantData.size.label || null,
      variant: variant.variantData.variant.label || null,
      style: variant.variantData.style.label || null,
    }
    return setFilterValues(filterValues)
  },
})

addRule({
  id: 'feature/PROPAGATE_COLOR_TO_PDP',
  target: FETCH_SUCCESS,
  output: SET_FILTER_VALUES,
  position: 'AFTER',
  addWhen: function* (next, { context }) {
    yield next(COLOR_CLICK, (action) => {
      context.set('variantImage', action.payload)
      return true
    })
    return 'ADD_RULE'
  },
  addUntil: function* (next) {
    yield next(FETCH_SUCCESS)
    return 'RECREATE_RULE'
  },
  consequence: (action, { context }) => {
    const variantImage: string | undefined = context.get('variantImage')
    const product = action.payload
    const variant = product.find((variant) =>
      variant.images.imageWeb.find((img) => img.url === variantImage)
    )

    const filterValues: Omit<FilterValues, 'containerID'> = {
      color: variant?.variantData.color.label || null,
      size: variant?.variantData.size.label || null,
      variant: variant?.variantData.variant.label || null,
      style: variant?.variantData.style.label || null,
    }

    return setFilterValues(filterValues)
  },
})
