<!-- firescout-component -->

# app/Header

The header includes the logo, the search bar, account icon, cart information and the b2b / b2c switch, contact informations, the main categories and the burger menu.

## Handles

- **burger-menu**: By clicking on the burger menu the sidebar opens.
- **more-button**: By clicking on the more button inside the menu the sidebar opens at the root position.
- **nav-link**: By clicking on one of the main categories in the header, the sidebar opens. The main categories are only displayed on the desktop screensize, on a mobile device the categories can be reached through the burger menu.
- **search-icon**: By clicking on the icon of search it navigates to the route of the search and the search starts
- **search-input**: By typing at least 3 or more characters the search result page appears and shows the most relevant results.
- **search-button**: On mobile devices the search page can be triggered through the search icon.
- **logo**: The logo is a link that navigates to home-page.
- **cart-icon**: Navigates to cart route if it is clicked.
- **close-notification-icon**: The notification bar can be closed if the close icon is clicked (not available atm).
- **switch-to-b2b**: Click on this handle changes the cookie to b2b and sets the body class for b2b.
- **switch-to-b2c**: Click on this handle changes the cookie to b2c and sets the body class for b2c.
- **language-switch-modal**:by clicking on the current language letter opens languages alternate modals
- **language-switcher**: by clicking on a language button you can navigate to other language
- **switch-to-b2b-overlay**: Click on this handle changes the cookie to b2b and sets the body class for b2b in the overlay.
- **switch-to-b2c-overlay**: Click on this handle changes the cookie to b2c and sets the body class for b2c in the overlay

## States

- **show-cart-items-amount**: The cart icon displays the amount of products inside the cart only if there is at least one product inside.
- **show-notification**: If there is a notification content available the notification bar is shown (not available atm)
- **has-customerswitch**: If the user is loggedin hide the customer type toggle
- **language-switch**: if there is more languages for a shop availiable then language switch modal can be choosen
- **language-choice-modal**: the alternate languages are displayed if modal is opened
- **customer-switch-popup**: displayed to force the customer to decide if he is privat user or not
