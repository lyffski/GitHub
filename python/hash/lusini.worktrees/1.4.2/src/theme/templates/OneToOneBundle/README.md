<!-- firescout-component -->

# templates/OneToOneBundle

The OneToOneBundle is a standalone page, that is displayed when a product has configurable associated products. In this case a special button is displayed on the pdp which navigates to the one-to-one bundler. The user can then configure another matching product to the one he has selected on the PDP.

## Handles

- **delete-product** Deletes the product out of the bundeler.
- **decrease-amount**: reduce the amount by one if the amount is bigger than 1
- **amount**: the current amount that will be added to cart. rendered as an input
- **increase-amount**: increase the amount (unlimited)
- **add-to-cart**: the add-to-cart button

## States

- **configurable-preselected-product** If in the bundeler a product is selected, it will be rendered instead of a placeholder.
- **show-buy-box** Only show buy box, if zwo products are selected in the bundeler.
- **show-add-to-cart** If product is buyable show add to cart button.
- **adding-to-cart**: The cart-button shows a spinner while adding
- **show-delete-button**: If button is disabled, then the bundlerWidget cant be removed from the bundler by the user. E.g. for the first product.
- **has-cheapest-price**: shows from price if there is a cheaper product available
- **has-strike-price**: The display variant has a strike price
- **show-productlist**: If no product is selected, dont show a related-product-list
- **has-gross-price**: If B2B customer, we show gross price incl. tax hint, instead of shipping costs hint.
