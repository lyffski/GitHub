<!-- firescout-collection -->

# Gallery

On Desktop the gallery is only clickable (no scroll events). On mobile we controll the scrolling via touch events. When user clicks on main-image a lightbox opens. When the sku changes, we reset the display image to first element.

## Handles

- **thumb**: On desktop thumbnails are displayed next to the main image. when user clicks on it the main image updates with the click-target. On mobile no thumbs exist
- **thumb-prev-button**: Selects the prev thumb as main image. additionally the thumb list scrolls up when the next "prev" thumb is not visible
- **thumb-next-button**: Selects the next thumb as main image. additionally the thumb list scrolls down when the next "next" thumb is not visible
- **main-image**: when user clicks on main-image the current image is displayed in a lightbox

## States

- **show-thumbs-next**: As long as the last thumb is not selected we show the thumb-decrement button
- **show-thumbs-prev**: As long as the first thumb is not selected we show the thumb-increment button
- **show-placeholder-image**: If the chosen product has no main-image a placeholder-image is shown
- **wistia-player**: if there is a video main image should have videoplayer
