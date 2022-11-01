<!-- firescout-collection -->

# ColorFilter

We display a fixed set of 6 (max) colors the user can choose from. if there are more colors then offer a "+" button, that opens the filter drawer

## Handles

- **option**: by clicking on the color icon the product color is set
- **more-colors**: if there are more than 5 color options, then user can click more-colors button which opens the filter-drawer

## States

- **has-color-options**: if the filter key is color and there are more than 4 color available, a list of at least 4 colors is displayed
- **has-more-colors**: if there are more than 5 colors we show the `more-colors` button which can open the filter-drawer where we can see the rest of the colors
- **is-single-filter**: only one color exists, so we just display the label
