<!-- firescout-component -->

# organisms/CategoryHeadlineWithProducts

This organism displays a CategoryHeadline molecule, a image (if set) and a productSlider molecule. The Headline and Link will be added with the help of the algolia ID but can be changed manualy. The count of products is based on the algolia ID. The Image can have a custom text and link. The ProductSlider can have up to 20 products and must have at least 3 products. On mobile the image will be hidden and the ProductSlider will gain full width.

## States

- **image-visible**: Displays the imageTeaser with the given image.
- **image-text-visible**: Displays the given text, which is written in the imageTeaser.
