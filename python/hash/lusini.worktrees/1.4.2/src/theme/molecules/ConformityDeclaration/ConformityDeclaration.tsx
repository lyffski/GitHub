import React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import Button from 'theme/atoms/Button'
import Markdown from 'theme/atoms/Markdown'

type Props = {
  id: string
  recipient: string
  apiCall: string
  firstname: string
  surname: string
  email: string
  product_name: string
  article_number: string
  locale: string
  submit: string
  formSuccessMessage: string
  onClick: () => void
}

export default function ConformityDeclaration(props: Props) {
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [nameValue, setNameValue] = React.useState('')
  const [surnameValue, setSurnameValue] = React.useState('')
  const [emailValue, setEmailValue] = React.useState('')
  const [productNameValue, setProductNameValue] = React.useState('')
  const [articleNumberValue, setArticleNumberValue] = React.useState('')
  const {
    firstname,
    surname,
    email,
    product_name,
    article_number,
    locale,
    submit,
  } = props

  /** @firescoutMockFn molecules-ConformityDeclaration.postData */
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }

  const submitForm = (e) => {
    e.preventDefault()

    postData(props.apiCall, {
      firstname: nameValue,
      surname: surnameValue,
      email: emailValue,
      articleNumber: articleNumberValue,
      productName: productNameValue,
      locale: locale,
    })
    setShowSuccess(true)
    return false
  }
  return (
    <Wrapper data-cy-ctx="molecules/ConformityDeclaration">
      {!showSuccess && (
        <Form
          className="form"
          action="#"
          onSubmit={submitForm}
          data-cy-state="form-visible"
        >
          <input type="hidden" name="locale" value={locale} />
          <label>
            {' '}
            {firstname} <span>*</span>{' '}
          </label>
          <input
            type="text"
            name="firstname"
            required
            data-cy-handle="firstname"
            onChange={(e) => setNameValue(e.target.value)}
          />
          <label>
            {surname} <span>*</span>{' '}
          </label>
          <input
            type="text"
            name="surname"
            required
            data-cy-handle="surname"
            onChange={(e) => setSurnameValue(e.target.value)}
          />
          <label>
            {email} <span>*</span>{' '}
          </label>
          <input
            type="email"
            name="email"
            required
            data-cy-handle="email"
            onChange={(e) => setEmailValue(e.target.value)}
          />

          <label>
            {product_name} <span>*</span>{' '}
          </label>
          <input
            type="text"
            name="product_name"
            required
            data-cy-handle="product-name"
            onChange={(e) => setProductNameValue(e.target.value)}
          />

          <label>
            {article_number} <span>*</span>{' '}
          </label>
          <input
            type="text"
            name="article_number"
            required
            data-cy-handle="article-number"
            onChange={(e) => setArticleNumberValue(e.target.value)}
          />

          <div className="submit_wrapper">
            <Button variation="special" data-cy-handle="submit">
              {submit}
            </Button>
          </div>
        </Form>
      )}
      {showSuccess && (
        <div data-cy-state="submit-success">
          <Markdown html={props.formSuccessMessage} />
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 28.125rem;
`
const Form = styled.form`
  width: 100%;
  max-width: 40rem;

  display: flex;
  flex-direction: column;
  > input,
  > label {
    ${theme.ty('r-base')}
    outline: none;
    width: 100%;
    margin-bottom: ${theme.spacing('xxs')};
    box-sizing: border-box;
  }
  > label {
    margin-top: ${theme.spacing('s')};
  }
  > input {
    outline: none;
    padding: ${theme.spacing('s')} ${theme.spacing('m')};
    border: ${theme.colors.shade.b2} 1px solid;
    border-radius: 0;

    &:focus {
      outline: none;
      border: ${theme.colors.primary} 1px solid;
    }
  }
  > .submit_wrapper {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: ${theme.spacing('m')};
  }
  > h3 {
    ${theme.ty('rc-2xl')}
    text-align:left;
    width: 100%;
  }
`
