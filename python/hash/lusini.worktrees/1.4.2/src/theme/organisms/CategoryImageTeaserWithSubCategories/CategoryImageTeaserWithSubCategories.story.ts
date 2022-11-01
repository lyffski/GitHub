// import CategoryImageTeaserWithSubCategories from './CategoryImageTeaserWithSubCategories'
// import * as k from '@kaminrunde/storybook-addon-fireside'
// import controller from './controller'
// import { categoryId } from '.storybook/knobs'
// import * as eec from 'utils/eec'

// export default {
//   title: 'Category/ImageTeaser',
//   component: null,
// }

// k.registerWidgetSelector('CategoryImageTeaserWithSubCategories', () => {
//   return { kind: 'Category/ImageTeaser', story: 'With_Sub_Categories' }
// })

// export const With_Sub_Categories = k.create(
//   'CategoryImageTeaserWithSubCategories',
//   CategoryImageTeaserWithSubCategories,
//   [
//     k.string('gridArea', 'Grid-Area', 'CategoryHeadline'),
//     categoryId('categoryId', 'Kategorie', 'geschirr-porzellan', {}),
//     k.string('title', 'title', '', {
//       hint: 'Overwrites the default title from DB',
//     }),
//     k.string(
//       'teaserImage',
//       'teaserImage',
//       'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg'
//     ),
//     k.select('style', 'Style', 'prominent', {
//       options: [
//         { label: 'top', value: 'top' },
//         { label: 'prominent', value: 'prominent' },
//       ],
//     }),
//     k.objectList(
//       'categories',
//       'Categories',
//       [
//         {
//           imgSrc:
//             'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg',
//           link: '#',
//           label: 'Categoryname',
//         },
//         {
//           imgSrc:
//             'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg',
//           link: '#',
//           label: 'Categoryname',
//         },
//         {
//           imgSrc:
//             'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg',
//           link: '#',
//           label: 'Categoryname',
//         },
//         {
//           imgSrc:
//             'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg',
//           link: '#',
//           label: 'Categoryname',
//         },
//       ],
//       {
//         schema: [
//           k.string(
//             'imgSrc',
//             'ImgSrc',
//             'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg'
//           ),
//           k.string('link', 'Link', 'CategoryLink'),
//           k.string('label', 'Label', 'CategoryName'),
//         ],
//         getRowName: (row) => row.label,
//         validate: (rows) => rows.length !== 4 && 'exactly 4 rows are allowed!',
//       }
//     ),
//     ...eec.storyElements,
//   ],
//   controller
// )
