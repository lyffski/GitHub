<!-- firescout-component -->

# molecules/ProductWidget

This widgets is used all over the shop to show a Product and link to its detail page.

Clicking on the product widget can perform different actions. The default case is that the click is redirected to the PDP of the product. This default behaviour can be adjusted via the hook "onProductWidgetClick", if available, this individual action overrides the default action (forwarding to the PDP).

## States

- **has-strikeprice**: This Product is reduced, so the strike-price should be shown
- **colorpreview-is-visible**: List of color preview icons is visible. on hover the main image changes to the preview image. Only a trimmed list of color previews is visbible. when there are more images available we render a "+" button to indicate that there are more. The exact number of displayed images is determined by the media size (we dont want to show more images that space is available). The behaviour of whether the images of the variants are displayed can also be controlled using the useProductWdigetContext hook. This is used, for example, in the OneToOneBundler.
- **has-baseprice**: On liquids and other products we need a base price (e.g "Liter", "Kilogramm")
- **show-energylabel**: display energylabel
- **has-unit**: The unit of the product is shown (it comes from algolia)
- **has-cheapestprice**: shows from price if there is a cheaper product available

## Handles
- **click-out** With the use of the hook onProductWidgetClick, the ProductWidget can be clickable. This handle, is handling this click. 

## Collections

- [ColorPreview](./ColorPreview/README.md)
