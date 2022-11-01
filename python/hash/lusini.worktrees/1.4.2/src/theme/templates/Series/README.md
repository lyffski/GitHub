<!-- firescout-component -->

# templates/Series

Renders a series pdp. Here we list all skus belonging to this series and enable a filering + pagination

[Breadcrumbs](../../atoms/Breadcrumbs.tsx) The breadcrumbs are calculated by the categories (series-index). Breadcrumbs are implemented by the Layout

## States

- **has-second-img**: When the series only has one image we show a optimized image-list layout for one image
- **has-third-img**: Same layout as the second-image layout
- **has-brand-logo**: If brand has a logo, it is shown
- **has-seo**: when the page initialy renders we cannot display meaningfull informations beause this is a client-rendered page. so we hide the seo part from the inital html

## Collections

- [Pagination](./Listing/SkuList/Pagination/README.md)
- [SkuWidget](./Listing/SkuList/SkuWidget/README.md)
