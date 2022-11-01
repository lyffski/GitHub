<!-- firescout-collection -->

# SeriesWidget

The SeriesWidget displays a single widget of an series on the SeriesList. The Widget uses the Algolia Series-Index to show an Image and the title. If the referenceSku key of a series is available, the widget will also show the title and price of the reference SKU. If reference is not existing, the reference information will not be displayed

## Handles

## States

- **has-reference-title**: shows the reference title if reference sku is available
- **has-reference-price**: shows the reference price if reference sku is available
- **has-reference-strikeprice**: shows the reference strikeprice if exist
- **has-reference-unit**: shows the reference unit if exist
- **has-reference-baseprice**: shows the reference baseprice if exist
