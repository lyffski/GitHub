<!-- firescout-component -->

# app/FlyoutNavi

The flyout navigation will be triggered if the burger menu is clicked.
If a navigation K1 link is clicked the flyout navigation opens the K1 and shows the sub categories.
[issue-22](https://github.com/eBusEmmos/lusini/issues/22) and [issue-50](https://github.com/eBusEmmos/lusini/issues/50)

## Handles

- **overlay**: a click on the grey overlay closes the flyout navigation.
- **close-icon**: a click on the close icon closes the flyout navigation.
- **category-back**: When K2 or K3 is displayed a click on the back button shows the parent category if it leads back to the root all K1 categories are shown (ROOT).
- **k1-item**: Click to replace content with K2 items.
- **k2-item**: Either open K3 or (if no children) directly opens category.
- **k3-item**: directly open the K3 category.
- **cat-overview-btn**: directly open the K1 or K2 page and close the drawer. Not available on the root page.
- **customizable-navigation-item**: navigate to customized link

## States

- **visible**: The flyout is visible and the overlay is visible.
- **k1-open**: flyout navigation has been opened and no category is selected, so main categories are visible.
- **k2-open**: A main category (K1) is selected and all its subcategories are displayed
- **k2-has-teasers**: The main category has sub-categories, where at least one has set a `teaserImg` in Contentful. These images are are displayed before the normal subcategory with their teasers instead of just the label
- **k3-open**: A sub category (K2) is selected and all its subcategories (K3) are displayed instead
- **k3-has-teasers**: A sub category (K2) has sub-categories, where at least one has set a `teaserImg` in Contentful. These images are are displayed above the normal sub categories (K3) with their teasers instead of just the label
