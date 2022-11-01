<!-- firescout-component -->

# templates/TagCategory

Tag Categories are a special type of category page. Each Tag Category has a special "tag" that acts as a pre-filter for the displayed product listing.
We distinguish between virtual and physical routes. When we can assign a category to a tag-category-entry in contentful we treat this as a physical route. that means the category will get a own url (eg. "/t/sale/geschirr/") and the story from contentful will be displayed. when we do not find an entry on contentful we treat the route as a virtuel category. that means the url and the story from the last seen physical route will be displayed.

The advantages are:

- We only need to render a limited number of pysical urls (build performance)
- We can create custom stories for each category if we like
- We can seo-index special categories by simply converting a virtuel url to a pyhisical

## States

- **no-hits**: When the user chose a filter and there are no results given, a no-result template is shown.
