<!-- firescout-component -->

# molecules/ProductList

The product list is the main component of the category page. It shows a navigation tree on the left side and the products including filter options and a pagination on the right side.

## Handles

- **reset-all-filters**: If search result has no hits (!show-products state) than we show the no-hits template and a reset button that resets all filters to its original state

## States

- **show-categories**: On mobile devices the subcategories are shown in a slider on top of the results to save space on small devices. on desktop the subcategories and category navigation is shown on the left side.
- **show-products**: displays the product listing if the total hits are at least 1 otherwise we render the no-hits template
- **has-intersticial**: when exactly 2 intersticals are given, we display them between our products. they always span two columns and are displayed offseted to deliver a better user-impression. Images need the proportion 2000:1300!

## Collections

- [Pagination](./Pagination/README.md)
- [Filter](./FilterList/README.md)
