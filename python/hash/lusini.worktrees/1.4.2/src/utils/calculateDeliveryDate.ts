import config from 'config'

type Variant = {
  stock: number
  deliveryDays: number | null
  specialDelivery: boolean
  sellOut: boolean
  unit: { packUnit: string }
}

/* # Delivery information cases
  - Stock is higher or equal to the chosen amount
  - Stock is higher or equal to the chosen amount and article is furniture

  ### Stock is 0 or lower and...

  - Days until restock is longer than the `shippingTooLong`-config
  - Days until restock is equal or lower than 84
  - Days until restock is higher than 84

  ### Stock is lower than the chosen amount and...

  - is sellOut/closeOut article
  - Days until restock is longer than the `shippingTooLong`-config
  - no restock-date and Stock higher then 0
  - no restock-date and Stock is 0
  - Days until restock is equal or lower than 84
  - Days until restock is higher than 84
*/

export type DeliveryInformation = {
  icon: 'available' | 'notAvailable' | 'warning'
  snippet:
    | 'available'
    | 'available_furniture'
    | 'closeout_exceed'
    | 'shippable_soon'
    | 'shippable_with_reduced_stock'
    | 'shippable_currently_not'
    | 'full_delivery_at_date_weeks'
    | 'full_delivery_at_date_months'
    | 'no_stock_with_delivery_in_weeks'
    | 'no_stock_with_delivery_in_months'
  isBuyable: boolean
  variables?: {
    stock?: number
    amount?: number
    weeks?: number
    months?: number
    packUnit: string
  }
}

/** @firescoutMockFn utils.calculateDeliveryDate */
export default function calculateDeliveryInformation(
  variant: Variant,
  amount: number
): DeliveryInformation {
  let isFurniture = false

  const daysUntilDeliveryDate = variant.deliveryDays || null

  if (variant.specialDelivery === true) {
    isFurniture = true
  }

  //If there is no stock but a delivery date
  if (variant.stock <= 0 && daysUntilDeliveryDate) {
    if (
      config.deliveryDate.shippingTooLong !== 0 &&
      daysUntilDeliveryDate &&
      daysUntilDeliveryDate > config.deliveryDate.shippingTooLong
    ) {
      return {
        icon: 'warning',
        snippet: 'shippable_currently_not',
        isBuyable: false,
        variables: undefined,
      }
    }

    if (daysUntilDeliveryDate <= 84) {
      return {
        icon: 'warning',
        snippet: 'no_stock_with_delivery_in_weeks',
        isBuyable: true,
        variables: {
          weeks: Math.ceil(daysUntilDeliveryDate / 7),
          packUnit: variant.unit.packUnit,
        },
      }
    }

    return {
      icon: 'warning',
      snippet: 'no_stock_with_delivery_in_months',
      isBuyable: true,
      variables: {
        months: Math.ceil(daysUntilDeliveryDate / 30),
        packUnit: variant.unit.packUnit,
      },
    }
  }

  // Chosen quantity is in stock (available)
  if (variant.stock >= amount) {
    // Different Information for Furniture articles
    if (isFurniture === true) {
      return {
        icon: 'available',
        snippet: 'available_furniture',
        isBuyable: true,
        variables: {
          stock: variant.stock,
          packUnit: variant.unit.packUnit,
        },
      }
    }

    return {
      icon: 'available',
      snippet: 'available',
      isBuyable: true,
      variables: {
        stock: variant.stock,
        packUnit: variant.unit.packUnit,
      },
    }

    // Chosen quantity is bigger then the stock
  } else {
    if (variant.sellOut === true) {
      return {
        icon: 'notAvailable',
        snippet: 'closeout_exceed',
        isBuyable: false,
        variables: {
          stock: variant.stock,
          amount: amount,
          packUnit: variant.unit.packUnit,
        },
      }
    }

    if (
      config.deliveryDate.shippingTooLong !== 0 &&
      daysUntilDeliveryDate &&
      daysUntilDeliveryDate > config.deliveryDate.shippingTooLong
    ) {
      return {
        icon: 'warning',
        snippet: 'shippable_with_reduced_stock',
        isBuyable: false,
        variables: {
          stock: variant.stock,
          packUnit: variant.unit.packUnit,
        },
      }
    }

    if (!daysUntilDeliveryDate) {
      if (variant.stock > 0) {
        return {
          icon: 'warning',
          snippet: 'shippable_soon',
          isBuyable: true,
          variables: {
            stock: variant.stock,
            packUnit: variant.unit.packUnit,
          },
        }
      }

      return {
        icon: 'warning',
        snippet: 'shippable_currently_not',
        isBuyable: false,
        variables: undefined,
      }
    }

    if (daysUntilDeliveryDate <= 84) {
      return {
        icon: 'warning',
        snippet: 'full_delivery_at_date_weeks',
        isBuyable: true,
        variables: {
          stock: variant.stock,
          weeks: Math.ceil(daysUntilDeliveryDate / 7),
          packUnit: variant.unit.packUnit,
        },
      }
    }

    return {
      icon: 'warning',
      snippet: 'full_delivery_at_date_months',
      isBuyable: true,
      variables: {
        stock: variant.stock,
        months: Math.ceil(daysUntilDeliveryDate / 30),
        packUnit: variant.unit.packUnit,
      },
    }
  }
}
