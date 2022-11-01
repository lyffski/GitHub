<!-- firescout-component -->

# templates/Password

The User can ask for a password reset email and also set his new password.
We implement an Iframe to the Shopware password reset page. The subpage differs if we have a hash to reset the password.

Documentation about the Route: https://github.com/eBusEmmos/lusini/issues/188#issuecomment-803933535

## Handles

## States

- **show-nothing**: Show nothing until useEffect executes. This exists so that we have the same code during SSR and in the React DOM
- **show-password**: Display page to set the new Password
- **show-passwordreset**: Display page to set the new Password
