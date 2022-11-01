<!-- firescout-component -->

# partials/FlyoutCart

The partial FlyoutCart is triggered by the rule
[showFlyoutCart](../../../features/showFlyoutCart.tsx) and opens up a sidebar with the chosen products and further price details. When more than one article is added to the cart and the screen width is smaller than 600px, the flyout cart closes and navigates to the selected product, if the screen size is greater than 600px, the flyout cart won't close, but navigate to the selected product. The flyout cart can redirect to the cart/checkout.

## Handles

- **to-checkout**: When the button is clicked it redirects to the checkout
- **close-icon**: When clicked it closes the sidebar
- **overlay**: When clicked on the page next to the flyout cart, it also closes the sidebar.
- **reco-product-click**: When the user clicked on one of the recommendations inside the flyout cart

## States

- **optional-additions**: When the product has optionalAddtions, then show these in productslider

## States

- **optional-additions**: When the product has optionalAddtions, then show these in productslider

## Collections

- [CartItem](./CartItem/README.md)
