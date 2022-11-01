<!-- firescout-component -->

# organisms/Category

The category organism uses the ProductList molecule, wich displays the category-tree, filter, pagination and the products them self. If the Category organism is added to the contentful category content model, the former category page is overwritten. The categoryId is a required prop.

## States

- **series**: When category is a series category the series listing will be displayed
- **listing**: When category is not a series categgory the normal product-listing will be displayed

## Collections

- [Pagination](./SeriesWrapper/SeriesList/Pagination/README.md)
- [SeriesWidget](./SeriesWrapper/SeriesWidget/README.md)
