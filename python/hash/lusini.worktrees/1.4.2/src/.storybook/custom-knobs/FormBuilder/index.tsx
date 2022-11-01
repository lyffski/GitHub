import registerKnob from '@kaminrunde/storybook-addon-fireside/lib/registerKnob'
import styled from 'styled-components'
import * as React from 'react'
import * as t from './types'
import * as elementTemplates from './elements'

type Props = {
  onChange: (val: t.FormElement[]) => void
  value: t.FormElement[]
  hasError: boolean
  focus: boolean
}

registerKnob('formBuilder', function FormBuilder(props: Props) {
  const [elements, setElements] = React.useState<t.FormElement[]>(props.value)
  const [activeElement, setActiveElement] =
    React.useState<t.FormElement | null>(null)
  const [addMode, setAddMode] = React.useState(false)

  React.useEffect(() => {
    props.onChange(elements)
  }, [elements])

  const createElement = (type: t.FormElement['type']) => {
    let el: t.FormElement
    switch (type) {
      case 'text': {
        el = {
          type: 'text',
          name: '',
          label: '',
          required: false,
          multiline: false,
        }
        break
      }
      case 'number': {
        el = { type: 'number', name: '', label: '', required: false }
        break
      }
      case 'email': {
        el = { type: 'email', name: '', label: '', required: false }
        break
      }
      // case 'file': {
      //   el = {type:'file', name: '', label: '', required: false}
      //   break
      // }
      case 'select': {
        el = {
          type: 'select',
          name: '',
          label: '',
          required: false,
          options: [],
        }
        break
      }
      case 'radioGroup': {
        el = {
          type: 'radioGroup',
          name: '',
          label: '',
          required: false,
          options: [],
        }
        break
      }
      case 'checkboxGroup': {
        el = {
          type: 'checkboxGroup',
          name: '',
          label: '',
          required: false,
          options: [],
        }
        break
      }
    }
    setElements([...elements, el])
    setAddMode(false)
    setActiveElement(el)
  }

  const updateElement = (el: t.FormElement) => {
    const index = elements.findIndex((e) => e === activeElement)
    if (index === -1) return
    setElements([...elements.slice(0, index), el, ...elements.slice(index + 1)])
    setActiveElement(null)
  }

  const abortElement = (el: t.FormElement) => {
    // remove element from elements Array if no name is set (only possible on inital creation)
    if (!el.name) {
      setElements([...elements.slice(0, -1)])
    }
    setActiveElement(null)
  }

  if (activeElement) {
    const Template = elementTemplates[activeElement.type]
    return (
      <Wrapper>
        <Template
          element={activeElement as Extract<t.FormElement, { activeElement }>}
          onSave={updateElement}
        />
        <button className="abort" onClick={() => abortElement(activeElement)}>
          ABORT
        </button>
      </Wrapper>
    )
  }

  if (addMode)
    return (
      <Wrapper>
        <div className="available-templates">
          <button onClick={() => createElement('text')}>Text</button>
          <button onClick={() => createElement('number')}>Number</button>
          <button onClick={() => createElement('email')}>E-Mail</button>
          {/* <button onClick={() => createElement('file')}>File Upload</button> */}
          <button onClick={() => createElement('select')}>Selection</button>
          <button onClick={() => createElement('radioGroup')}>
            Radio-Buttons
          </button>
          <button onClick={() => createElement('checkboxGroup')}>
            Checkboxes
          </button>
        </div>

        <button className="abort" onClick={() => setAddMode(false)}>
          ABORT
        </button>
      </Wrapper>
    )

  return (
    <Wrapper>
      {elements.map((el, i) => (
        <div className="element" onClick={() => setActiveElement(el)}>
          <b>{el.name}</b> <small>{el.type}</small>
        </div>
      ))}
      <button className="add" onClick={() => setAddMode(true)}>
        ADD
      </button>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  > .available-templates {
    > button {
      display: block;
      padding: 10px;
      width: 100%;
      margin-bottom: 10px;
      background: white;
      border: none;
    }
  }

  > .element {
    cursor: pointer;
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
    background: white;
  }

  > button.add {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 15px;
    background: #4caf50;
    color: white;
    border: none;
  }

  > button.abort {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 15px;
    background: #f44336;
    color: white;
    border: none;
  }
`
