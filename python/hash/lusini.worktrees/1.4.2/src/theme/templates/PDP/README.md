<!-- firescout-component -->

# templates/PDP

The user can configure his product before he adds it to the cart. It is divided in 5 parts:

[Breadcrumbs](../../atoms/Breadcrumbs.tsx) The breadcrumbs are calculated by the mainCategory. Breadcrumbs are implemented by the Layout

- _BuyBox_: Here the customer can configure is product by the filters "variant", "style", "size" and "color". At the end he can add the variant to the cart (with decrease/increase amount)
- _Gallery_: All images of the variant are displayed:
  - 1 image: The first image is centered
  - n images: Up to three images are displayed. The first one is twice the size
- _InformationBox_: Important product informations
- _FilterDrawer_: Drawer where the user can configure his product
- _Accordion_: Used to display further product information

## Handles

- **increase-amount**: Increase the amount. max is 999
- **decrease-amount**: Decrease the amount. min is 1
- **amount**: Displays the amount. Can be set manually as input or increased/decreased by +/- button.
- **add-to-cart**: Adds the variant with given amount to cart
- **subtitle**: Not clickable. Displays subtitle
- **energylabel-modal**: If clicked, energy label modal will be opened
- **piece-price**: Not clickable. Displays the piece price
- **pack-price-sum**: Not clickable. Displays the pack price multiplied with amount
- **price-info**: Not clickable. Displays the additional price information like packsize / tax
- **baseprice**: Displays the baseprice, handle is needed to test for the currency
- **add-to-configurator** Adds the variant to the configurator and links to the configurator.
- **uncustomized-button**: If the product is not customized, then this button is displayed

## States

- **show-downloads**: If download files are available in documents the download section is visible and the available files get listed.
- **show-icons**: If a product has icons in attributes (expect WARRANTY_REPURCHASE) the icons are shown inside the icon section
- **show-information-labels**: If a product has attributes with "is_pdp_attribute" = true, a table of the attributes is visible (except attributes with documents and icons (PROPERTIES_PRODUCT attribute will also be visible in the table))
- **has-strike-price**: The display variant has a strike price
  - **piece**: The reduced piece price is displayed
  - **piece-reduction**: The reduction between strike-price and normal price is displayed
  - **pack**: The reduced pack price is displayed
- **pack-information**: The display variant gets sold as a pack, so we show the info how many pieces are available in one pack.
- **has-scaleprice-table**: "Staffelpreis oder Mengenrabatt". The data comes from algolia as "priceRules". Displays a table of all available scale-price options. When a specific amount of products is chosen then we apply the price rule to the overal product-price. We highlight the current price-rule
- **adding-to-cart**: the loader spin is displayed in buy button to show the customer that a product is adding to cart.
- **filterdrawer-visible**: The filterdrawer is present.
- **is-sellable**: the product is sellable and can be bought
- **not-sellable**: the product is not sellable and cannot be bought
- **has-amount-controls**: the product has controls to set the amount
- **has-baseprice**: display variant has baseprice
- **show-energy-label**: display energylabel icon and links to energylabel
- **show-warrantyRepurchase**: WarrantyRepurchase Label is shown and not overwritten by energylabel
- **slider-crosssells-shown**: the article has cross-sell skus which are displayed in a product slider
- **has-brand-logo**: the article displays a brand logo if available
- **has-seo**: when the page initialy renders we cannot display meaningfull informations beause this is a client-rendered page. so we hide the seo part from the inital html
- **is-dummy**: we display a blurred dummy product while fetching the real data of a product from algolia. While this state is set the page is not fully loaded with all data
- **hasEcoTax**: Is displayed, when a product owns an ecoTax (Net/Gross). EcoTax is used, when a product isn't renewable. French-Only feature
- **is-configurable** The product has configuration options.
- **legacyDevice**: is displayed, when a product can be recollected
- **custom-tailor-filter**: If the product is customizable, we show the customizable filters (form, brink, size)
- **customtailor-price**: This price is shown instead of the normal price. This price is calculated by the customTailor values.
- **customTailorB2BGrossInfo**: This price is shown instead of the normal GrossInfo price. This price is calculated by the customTailor values.
- **price-big**: The final price shown on PDP.
- **not-customized**: The product is not customized.

## Collections

- [Gallery](./Gallery/README.md)
- [FilterDrawer](./FilterDrawer/README.md)
- [ColorFilter](./BuyBox/ColorFilter/README.md)
- [Filter](./BuyBox/Filter/README.md)
- [DeliveryInfo](./BuyBox/DeliveryInfo/README.md)
- [Accordion](./InformationBox/Accordion/README.md)
- [CustomTailor](./BuyBox/CustomizableFilter/README.md)
