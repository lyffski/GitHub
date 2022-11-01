import * as React from 'react'
import styled from 'styled-components'
import * as t from '../types'
import transform from 'slugify'

type Props = {
  element: Extract<t.FormElement, { type: 'text' }>
  onSave: (el: Extract<t.FormElement, { type: 'text' }>) => void
}

export default function Text(props: Props) {
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [label, setLabel] = React.useState(props.element.label)
  const [required, setRequired] = React.useState(props.element.required)
  const [multiline, setMultiline] = React.useState(props.element.multiline)
  const [name, setName] = React.useState(props.element.name)

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
    setIsInvalid(false)
    props.onSave({
      type: 'text',
      label: label,
      required: required,
      name: name,
      multiline: multiline,
    })
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
        <span>Multiline: </span>
        <input
          type="checkbox"
          checked={multiline}
          onChange={() => setMultiline(!multiline)}
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
