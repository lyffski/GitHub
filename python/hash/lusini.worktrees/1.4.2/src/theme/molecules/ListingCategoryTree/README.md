<!-- firescout-component -->

# molecules/ListingCategoryTree

Displays the CategoryTree from either the listing module or the seriesListing module. On mobile we display a slideable horizontal list, on desktop a classic category tree. This component behaves different based on it's outer enviroment:

When we are on a normal category (`/category/...`) we display normal links. When we are on a tag-category (`/t/...`) we either display a real or a virtual link. When we find a entry in contentful for a child-category then we display a real link, otherwise we display a button, that just changes the category-filter.

Additionally we display a `back-link` for all lv1 categories when we are on a tag-category. Only tag-categories have a lv0 category which shows all root-categories

## Handles

- **back-button**: On Click we navigate back to the previous category. When we are on a Tag-Category we distingiush between virtuel back-links and real-back links: when we find a physical contentful-entry we navigate to the real url. Otherwise we only change the category filter
- **cat-option**: a row in the category tree. either it acts as a filter (for virtual tag categories) or as a link (for pyhsical tag categories or normal categories)

## States

- **show-back-button**: the parentUrlPath is used to navigate back to the parent category if a customer navigates to sub categories. On mobile it is shown as a small arrow on desktop it is an arrow with the category name. When we are on a Tag-Category our lv0 categories also have a back link to the category-overview
