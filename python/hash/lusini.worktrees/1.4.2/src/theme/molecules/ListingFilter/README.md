<!-- firescout-component -->

# molecules/ListingFilter

Visible overview of selected and selectable filters as well as list-sorting and filter-drawer

## Handles

- **showDrawer**: Click opens drawer with all accordions closed
- **closeDrawer**: Click close drawer
- **prominent-filter**: The first three attributes are displayed prominent on desktop in the filter-bar. By clicking on one of it, the drawer opens with the corresponding filter pre-opened
- **sortingToggle**: Toggles the element in which the sorting index can be chosen
- **sortingSetDefault**: Changes the index for sorting to default
- **sortingSetPriceAsc**: Changes the index for sorting to priceAsc
- **drawerColorToggle**: Clicking toggles the color options accordion
- **drawerColoroption**: Select this color-option within the drawer
- **reset-all-filters**: When any filter is selected the reset-all chip is shown. By clicking on it all previous set filters are removed
- **selected-filter-chip**: Saved filter selections are shown as a chip and be clicked to remove this filter

## States

- **drawerShown**: The drawer has been opened
- **sortingOpened**: Element is visible in which the sorting index can be chosen
- **sorting-arrowUpShown**: Box is open, so arrow up is shown
- **sorting-arrowDownShown**: Box is closed, so arrow down is shown
- **drawerColorOpened**: FilterOptions accordion with color-boxes inside is open
- **colorFilter-arrowUpShown**: Box is open, so arrow up is shown
- **colorFilter-arrowDownShown**: Box is closed, so arrow down is shown
- **colorSelected**: at least one color option is selected
- **has-selected-filters**: State only available if at least one filter is set. Every selected filter is displayed as a removable chip below the filter options.

## Collections

- [CheckFilter](./FilterDrawer/CheckFilter/README.md)
- [ToggleFilter](./FilterDrawer/ToggleFilter/README.md)
- [PriceSlider](./FilterDrawer/PriceSlider/README.md)
- [RangeSlider](./FilterDrawer/RangeSlider/README.md)
