<!-- firescout-collection -->

# FilterDrawer

Opens up and show's the available filter options
Filter values for each FilterKey will be sorted numeric with the attribute SKU_SORT_NUMBER. If SKU_SORT_NUMBER is not given, the filter value will be moved to the end.

## Handles

- **close**: The "Anwenden" Button closes the drawer
- **close-icon**: The drawer close icon closes the drawer
- **overlay**: the invisible drawer overlay closes the drawer
- **color-option**: The color option can set the color filter
- **size-option**: The size option can set the size filter
- **style-option**: The style option can set the style filter
- **variant-option**: The variant option can set the variant filter
- **set-brink**: The brink option can set the brink filter
- **form-option**: The form option can set the form filter
- **decrease-width**: The decrease width value of size
- **increase-width**: The increase width value of size
- **width-input**: for customTailor product set the width value of size
- **decrease-length**: The decrease length value of size
- **increase-length**: The increase length value of size
- **length-input**: for customTailor product set the length value of size
- **set-brink**: sets brink type
- **brink-width**: sets brink width for type cuvert

## States

- **has-color**: the product has at least two color options so we show the colors
- **has-size**: the product has at least two size options so we show the sizes
- **has-variant**: the product has at least two variant options so we show the variants
- **has-style**: the product has at least two style options so we show the styles
- **has-form-options**: the product,that can be customized, has available form options so we show the forms
- **size-input**: if the product is customized, then display available width and length values
- **size-options**: display size options for customTailor products to set width and length. if the form circle or square is selected, the size width and length will be same and only width will be shown
- **width-controls**:display width controls which contents width input field, decrement and increment button to set width
- **length-controls**:display length controls which contents of length input field, decrement and increment button to set length
- **brink-option**: display available brinks types
- **is-cuvert**: display avaliable widths for cuvert if the selected type is cuvert
- **Customizable-Filter**: display the customizable filter
- **shape-selected**: Given if a shape is selected in CustomTailorDrawer Filter
- **brink-selected**: Given if a brink is selected in CustomTailorDrawer Filter
- **brink-width-selected**: Given if a brink width is selected in CustomTailorDrawer Filter
