import * as React from 'react'
import styled from 'styled-components'
import * as t from './types'
import theme from 'theme'
import Button from 'theme/atoms/Button'
import CheckRadioGroup from './CheckRadioGroup'
import Markdown from 'theme/atoms/Markdown'

declare global {
  interface FormData {
    entries(): Iterator<[string, string | Blob]>
  }
}
function getFormElement(formElement: t.FormElement, key: any) {
  const onValid = (e) => {
    e.target.classList.remove('error')
  }
  switch (formElement.type) {
    case 'text': {
      return formElement.multiline ? (
        <div className="text-multiline" key={key}>
          <label>{formElement.label}</label>
          <textarea
            name={formElement.name}
            required={formElement.required}
            onInput={(e) => onValid(e)}
            data-cy-handle="text-multiline"
          ></textarea>
        </div>
      ) : (
        <div className="text" key={key}>
          <label>{formElement.label}</label>
          <input
            type="text"
            data-cy-handle="text-input"
            name={formElement.name}
            required={formElement.required}
            onInput={(e) => onValid(e)}
          ></input>
        </div>
      )
    }
    case 'email': {
      return (
        <div className="email" key={key}>
          <label>{formElement.label}</label>
          <input
            type="email"
            name={formElement.name}
            required={formElement.required}
            onInput={(e) => onValid(e)}
            data-cy-handle="email-input"
          ></input>
        </div>
      )
    }
    case 'number': {
      return (
        <div className="number" key={key}>
          <label>{formElement.label}</label>
          <input
            type="number"
            name={formElement.name}
            required={formElement.required}
            onInput={(e) => onValid(e)}
            data-cy-handle="number-input"
          ></input>
        </div>
      )
    }
    case 'select': {
      return (
        <div className="select" key={key}>
          <label>{formElement.label}</label>
          <select
            name={formElement.name}
            required={formElement.required}
            onInput={(e) => onValid(e)}
            data-cy-handle="select"
          >
            <option></option>
            {formElement.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    }
    case 'checkboxGroup': {
      return (
        <CheckRadioGroup
          label={formElement.label}
          options={formElement.options}
          type={'checkbox'}
          required={formElement.required}
          data-cy-handle="checkbox-group"
          key={key}
        />
      )
    }

    case 'radioGroup': {
      return (
        <CheckRadioGroup
          label={formElement.label}
          options={formElement.options}
          type={'radio'}
          required={formElement.required}
          data-cy-handle="radio-group"
          key={key}
        />
      )
    }
    default: {
      return null
    }
  }
}

async function submitPostData(url = '', form) {
  const formData = new FormData(form)

  const plainFormData = Array.from(formData.entries() as any)
  const formDataJsonString = JSON.stringify(plainFormData)

  try {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },

      body: formDataJsonString, // body data type must match "Content-Type" header
    })
    return response.json()
  } catch (error) {
    return error
  }
  // parses JSON response into native JavaScript objects
}

export default function FormBuilder(props: t.Props) {
  const checkboxRef = React.useRef<HTMLInputElement>(null)
  const [showSuccess, setShowSuccess] = React.useState<boolean>(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    let allowed = !(checkboxRef.current && checkboxRef.current.checked)
    if (e.target.checkValidity() == false) {
      const list = e.target.querySelectorAll(':invalid')
      allowed = false
      for (const item of list) {
        item.classList.add('error')
        item.oninput = () => {
          item.classList.remove('error')
        }
      }
    }
    if (allowed) {
      setShowSuccess(true)
      submitPostData(props.endPoint, e.target)
    }
  }

  return (
    <FormBuilderContainer data-cy-ctx="organisms/FormBuilder">
      {!showSuccess && (
        <form
          data-cy-state="form"
          action={props.endPoint}
          method="POST"
          onSubmit={onSubmit}
          noValidate
          encType="application/x-www-form-urlencoded"
        >
          {props.formBuilder.map((formElement, i) => getFormElement(formElement, i))}
          <div className="lusini-checkbox">
            <input
              ref={checkboxRef}
              type={'checkbox'}
              name="lusini"
              value={''}
              data-cy-handle="hidden-checkbox"
            />
          </div>
          <div className="submit-wrapper">
            <Button
              variation="special"
              data-cy-handle="submit"
              fullWidth={false}
            >
              {props.submitButtonText}
            </Button>
          </div>
        </form>
      )}
      {showSuccess && (
        <div data-cy-state="submit-success">
          <Markdown html={props.formSuccessMessage} />
        </div>
      )}
    </FormBuilderContainer>
  )
}

const FormBuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;

  > form {
    width: 100%;
    max-width: 40rem;

    display: flex;
    flex-direction: column;
    > .lusini-checkbox {
      visibility: hidden;
      height: 0;
      margin: 0;
    }

    > .submit-wrapper {
      display: block;
      > button {
        float: right;
      }
    }
    > div {
      margin-bottom: ${theme.spacing('m')};
    }
    > .radioGroup,
    > .checkboxGroup {
      > div {
        height: 1.875rem;
        > input {
          margin-right: ${theme.spacing('m')};
          margin-left: 0;
          margin-bottom: ${theme.spacing('m')};
        }
      }
      > .title {
        height: 30px;
        display: block;
      }
    }

    > div > input,
    > div > textarea,
    > div > select {
      ${theme.ty('r-base')}
      outline: none;
      border: 1px solid ${theme.colors.shade.b2};
      width: 100%;
      margin-bottom: ${theme.spacing('xs')};
      box-sizing: border-box;
      &.error {
        background: #faebea;
        border-color: ${theme.colors.accent.pink};
      }
    }
    > div > select {
      padding: ${theme.spacing('xs')} ${theme.spacing('xxs')};
      border: ${theme.colors.shade.b2} 1px solid;
      border-radius: 0;
      background: white;
      -webkit-appearance: none;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAAGHjXZ5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuOWNjYzRkZTkzLCAyMDIyLzAzLzE0LTE0OjA3OjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDQtMTNUMTE6MTk6MDYrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTA0LTEzVDExOjIwOjQ3KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA0LTEzVDExOjIwOjQ3KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2OTlhMTMyYS03NDFiLTRhZWEtODg0ZC03ZjU4MWQ1NTI5MjIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozZDY5MTdmMC1iZTU2LTFkNGMtOTk5ZS0zM2U3N2YzYTQzZDMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYjQ2ZTA0NC1lYWEyLTQyOGEtOTFjYS1mZGZmMGIxYjA1MTciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmFiNDZlMDQ0LWVhYTItNDI4YS05MWNhLWZkZmYwYjFiMDUxNyIgc3RFdnQ6d2hlbj0iMjAyMi0wNC0xM1QxMToxOTowNiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjMgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjY5OWExMzJhLTc0MWItNGFlYS04ODRkLTdmNTgxZDU1MjkyMiIgc3RFdnQ6d2hlbj0iMjAyMi0wNC0xM1QxMToyMDo0NyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjMgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Zkd2IQAAAPJJREFUKJFj/P//PwMcpMQHT2eEi+TmRvOhMjCUQAGGAENKXNAkGBsumRQbPDErK5Tn////mFowzcAGcnOj+ZDNTokPng4zEgNkJUbIIjsCrxVMeO1Njgs6jk08NT44DKuC5LjgIygqk2KDT2CVgIGU2OBqZD5e1xIXWrhAQ0MDU1papAgpepLigov+///PwMjAAImGbx+/72RkYDg9Z9G6PFyaUuKDp///z6Ary8TrUj9//g9GZMnc3Gi+rx9+7GJgYDg5b/HafHRN7DxMHtOmrf7CwACNPmw2wAxhYvh/5z8jowKyJhggGPeEAP60QQAAALi/fb8AGgiSAAAAAElFTkSuQmCC');
      background-repeat: no-repeat;
      background-position: right 10px center;
      background-size: 10px;
      &:focus {
        outline: none;
        border: ${theme.colors.primary} 1px solid;
      }
      &.error {
        background: #faebea;
        border-color: ${theme.colors.accent.pink};
      }
    }
    > div > label {
      display: block;
      ${theme.ty('r-base')}
      margin-bottom: ${theme.spacing('xxs')};
      color: ${theme.colors.b0};
    }

    > div > div > input[type='checkbox'],
    > div > div > input[type='radio'] {
      margin-right: ${theme.spacing('m')};
      margin-left: 0;
      margin-bottom: ${theme.spacing('m')};
      div {
        height: 1.875rem;
        label {
          margin-top: ${theme.spacing('s')};
        }
      }
    }
    input:invalid.error + .box {
      background: #faebea;
      border-color: ${theme.colors.accent.pink};
    }
    > div > input {
      outline: none;
      padding: 0.5rem;
      border: ${theme.colors.shade.b2} 1px solid;
      border-radius: 0;

      &:focus {
        outline: none;
        border: ${theme.colors.primary} 1px solid;
      }
    }

    > div > h3 {
      ${theme.ty('rc-2xl')}
      text-align:left;
      width: 100%;
    }
  }
`
