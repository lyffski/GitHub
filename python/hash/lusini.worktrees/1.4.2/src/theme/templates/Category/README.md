<!-- firescout-component -->

# templates/Category

Category pages are sourced from two different sources. A category-page is built for each category created in the PIM and will be replaced if a category has been added in the CMS.

## States

- **no-hits**: When the user chose a filter and there are no results given, a no-result template is shown.
- **default-seoText-shown**: There is no custom contentful category, so we display the HTML right from algolia
