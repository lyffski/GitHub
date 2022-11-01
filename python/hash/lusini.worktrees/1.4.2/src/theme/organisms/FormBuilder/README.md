<!-- firescout-component -->

# organisms/FormBuilder

The FormBuilder allows our users to build custom forms like contact forms, catalog order forms and much more.

## States

- **submit-success**: after submitting a formular a success message is shown to the the customer this message can be edited in the backend of the form builder
- **form**: a custom built form is shown to the customer it can be placed on every page in contentful

## Handles

- **submit**: displays the submit button for the created form. After clicking onto the submit button the form will be validated and if the validation is successful the form elements will be submited to a custom getform.io endpoint.
- **text-multiline**: displays a multiline text element
- **text-input**: displays a single line text element
- **number-input**: displays a number element
- **email-input**: displays a email element
- **radio-group**: displays a radibutton group element
- **checkbox-group**: displays a checkbox element or a multi checkbox element group
- **select**: displays a select element.
- **hidden-checkbox**: integrates a hidden checkbox element as a simple honeypot feature to avoid bots to trigger and send the formular unnecessarily. The default value of this field is unchecked and has to be unchecked to successfully send the form.
