import registerKnob from '@kaminrunde/storybook-addon-fireside/lib/registerKnob'
import styled from 'styled-components'
import * as React from 'react'
import useOptions from './useOptions'

/*
type Props = {
  onChange: (val:string) => void,
  value: string,
  hasError: boolean,
  focus: boolean,
  options: CategoryIdOptions
}
*/

registerKnob('categoryId', function CategoryId(props) {
  const [search, setSearch, options] = useOptions()
  const [label, setLabel] = React.useState(props.value)
  const input = React.useRef(null)
  const [selection, setSelection] = React.useState(-1)

  React.useEffect(() => {
    if (!props.focus) return
    if (!input.current) return
    input.current.focus()
  }, [props.focus])

  React.useEffect(() => {
    useOptions.fetchOpt(props.value).then((opt) => {
      if (!opt) return
      setLabel(`${opt.label} (${opt.key})`)
    })
  }, [])

  const handleSelect = (opt) => () => {
    setLabel(`${opt.label} (${opt.key})`)
    props.onChange(opt.key)
    setSearch('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && selection !== -1) {
      handleSelect(options[selection])()
    }
    if (e.key === 'ArrowDown') {
      if (selection > options.length) return
      if (options.length === 0) return 0
      setSelection((n) => n + 1)
    }
    if (e.key === 'ArrowUp') {
      if (selection < 0) return
      setSelection((n) => n - 1)
    }
  }

  return (
    <Wrapper focus={props.focus} tabIndex={1}>
      <span>{label}</span>
      {props.focus && (
        <div className="search">
          <input
            type="text"
            onKeyDown={onKeyDown}
            ref={input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {Boolean(options.length) && (
            <div className="options">
              {options.map((opt, i) => (
                <Opt
                  key={opt.path}
                  onClick={handleSelect(opt)}
                  selected={i === selection}
                >
                  <div className="label">{opt.label}</div>
                  <div className="path">{opt.path}</div>
                </Opt>
              ))}
            </div>
          )}
        </div>
      )}
    </Wrapper>
  )
})

const Wrapper = styled.div<{ focus: boolean }>`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${(p) => (p.focus ? 'rgb(29, 167, 253)' : 'lightgrey')};
  cursor: pointer;
  position: relative;

  > .search {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 5px);
    border: 1px solid lightgrey;
    z-index: 999999999999;
    > input {
      border: none;
      padding: 0.65625rem;
      width: 100%;
      box-sizing: border-box;
      border-radius: 6px;
    }

    > .options {
      max-height: 340px;
      overflow: auto;
      padding-bottom: 5px;
    }
  }
`

const Opt = styled.div<{ selected: boolean }>`
  cursor: pointer;
  background: white;
  &:hover {
    background: #f3f2f2;
  }
  border-top: 1px solid #d3dce0;
  padding: 5px 0.65625rem;

  ${(p) => p.selected && `background: lightgrey !important;`}

  > .path {
    color: #9e9e9e;
    font-size: 13px;
  }
`
