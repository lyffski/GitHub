<!-- firescout-component -->

# organisms/CategoryHeadlineWithSubCategories

An organism that allows the manager to create a widget which presents a main category and some of its children to the customer. The amount of available products is counted below the main category name inside the header content of the widget. Required props are categoryId, teaserImage, imageText, title and an array of categories, each including imgSrc, link and label.

## States

- **image-visible**: The main image is only visible on desktop sizes and will be hidden on mobile devices to safe space
- **image-text-visible**: If there is text given on the main image the text will be shown inside of the main image.
