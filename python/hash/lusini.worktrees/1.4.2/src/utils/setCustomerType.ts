import config from 'config'

export default function setCustomerType(
  customerType: 'b2b' | 'b2c',
  dlEvent: string
) {
  if (typeof document === 'undefined') return

  if (dlEvent === 'overlay_b2b2c_x_click') {
    document.cookie = `b2cDecision=0;domain=${config.modules.cart.domain};path=/`
    document.cookie = `b2cDecision=0;path=/`
  } else {
    document.cookie = `b2cDecision=1;domain=${config.modules.cart.domain};path=/`
    document.cookie = `b2cDecision=1;path=/`
  }

  document.cookie = `isb2c=${customerType === 'b2c' ? 1 : 0};domain=${
    config.modules.cart.domain
  };path=/`

  document.cookie = `isb2c=${customerType === 'b2c' ? 1 : 0};path=/`
  document.body.className = document.body.className.replace(/b2b|b2c/, '')
  document.body.classList.add(customerType)
}
