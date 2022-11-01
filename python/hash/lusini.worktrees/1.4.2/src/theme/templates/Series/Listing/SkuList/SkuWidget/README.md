<!-- firescout-collection -->

# SkuWidget

Flat sku with the ability to be added to cart. has same information as the pdp

## States

- **adding-to-cart**: The cart-button shows a spinner while adding
- **has-strikeprice**: When the article has a strike price we display it
- **has-pack-price**: When the packamount > 1 then we display the price of the full pack
- **hasEcoTax**: Is displayed, when a product owns an ecoTax (Net/Gross). EcoTax is used, when a product isn't renewable. French-Only feature

## Handles

- **decrease-amount**: reduce the amount by one if the amount is bigger than 1
- **amount**: the current amount that will be added to cart. rendered as an input
- **increase-amount**: increase the amount (unlimited)
- **add-to-cart**: the add-to-cart button

## Collections

- [DeliveryInfo](./BuyBox/DeliveryInfo/README.md)
