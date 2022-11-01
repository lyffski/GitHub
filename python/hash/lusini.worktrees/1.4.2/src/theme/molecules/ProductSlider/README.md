<!-- firescout-component -->

# molecules/ProductSlider

The productslider presents the given products (as args like a datastream) within a slider. The slider is scrollable and uses an indicator to know about his own position.

## Handles

- **prev-button**: Click prev button to scroll 80% of the component width to the left
- **next-button**: Click next button to scroll 80% of the component width to the right

## States

- **has-prev-button**: First item is not visible so the Prev Btn is visible
- **has-next-button**: Next Button is visible until the last product is reached
- **has-title**: the title is displayed
- **show-position-indicator**: shows a position indicator if not enough space for all products is available.
- **no-products**: either the given product-list was empty or none of our skus is active. we do not display the component
