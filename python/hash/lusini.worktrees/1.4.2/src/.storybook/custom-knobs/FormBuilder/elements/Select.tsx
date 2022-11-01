import * as React from 'react'
import styled from 'styled-components'
import * as t from '../types'
import transform from 'slugify'

type Props = {
  element: Extract<t.FormElement, { type: 'select' }>
  onSave: (el: Extract<t.FormElement, { type: 'select' }>) => void
}

export default function Select(props: Props) {
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [required, setRequired] = React.useState(props.element.required)
  const [label, setLabel] = React.useState(props.element.label)
  const [name, setName] = React.useState(props.element.name)
  const [options, setOptions] = React.useState<string[]>(props.element.options)
  const [eopt, setEOpt] = React.useState('')

  React.useEffect(() => {
    if (props.element.name) return
    setName(
      transform(label, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
      })
    )
  }, [props.element.name, label])

  const handleSave = () => {
    if (!name) {
      setIsInvalid(true)
      return
    }
    if (options.length < 1) {
      setIsInvalid(true)
      return
    }

    setIsInvalid(false)
    props.onSave({
      type: 'select',
      label: label,
      name: name,
      required: required,
      options: options,
    })
  }

  const addEOpt = () => {
    if (eopt !== '') {
      setOptions([...options, eopt])
      setEOpt('')
    }
  }

  const removeOption = (index) => {
    setOptions([...options.slice(0, index), ...options.slice(index + 1)])
  }

  return (
    <Wrapper>
      <div>
        <span>Name: </span>
        <input
          className={isInvalid ? 'is-invalid' : ''}
          type="text"
          value={name}
          readOnly
          disabled
        />
      </div>
      <div>
        <span>Label: </span>
        <input
          className={isInvalid ? 'is-invalid' : ''}
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div>
        <span>Required: </span>
        <input
          type="checkbox"
          checked={required}
          onChange={() => setRequired(!required)}
        />
      </div>

      <div>
        <input
          type="text"
          className={isInvalid ? 'is-invalid' : ''}
          value={eopt}
          onChange={(e) => setEOpt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addEOpt()}
        />
        <button className="add-option" onClick={addEOpt}>
          add option
        </button>
      </div>

      <div className="options">
        {options.map((opt, i) => (
          <div onClick={() => removeOption(i)}>{opt}</div>
        ))}
      </div>

      <button className="save" onClick={handleSave}>
        SAVE
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > div {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    > span {
      display: inline-block;
      width: 80px;
    }
    > input[type='text'] {
      flex: 1;
      padding: 5px;

      &.is-invalid {
        border: 1px solid red;
      }
    }
  }

  > div > .add-option {
    display: flex;
    width: 20%;
    justify-content: center;
    padding: 7px;
    margin-left: 10px;
    background: #4caf50;
    color: white;
    border: none;
  }

  > .options {
    display: flex;
    flex-wrap: wrap;
    > div {
      padding: 5px;

      &:hover {
        background: #f44336;
        cursor: pointer;
      }
    }
  }

  > button.save {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 15px;
    margin-bottom: 15px;
    background: #4caf50;
    color: white;
    border: none;
  }
`
