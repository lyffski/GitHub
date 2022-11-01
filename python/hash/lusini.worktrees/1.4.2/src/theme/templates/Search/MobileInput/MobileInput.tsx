import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { useSearchValue } from 'modules/ui'
import * as searchEvent from 'theme/app/Header/events'
import { ms } from 'modules/browser/const'
import useTranslations from 'hooks/useTranslations'
import withTranslations from 'theme/templates/Search/withTranslations'
export default withTranslations(function MobileInput() {
  const searchValue = useSearchValue()
  const input = React.useRef<any>(null)
  const t = useTranslations<'templates-Search'>()
  const inputPlaceholder = t.asText(input, 'mobile_search_input_placeholder')

  React.useEffect(() => {
    setTimeout(() => {
      if (input.current) {
        input.current.focus()
      }
    }, 40)
  }, [])

  return (
    <Wrapper className="MobileInput">
      <input
        type="text"
        ref={input}
        value={searchValue.data}
        placeholder={inputPlaceholder}
        onChange={(e) => searchValue.setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            searchEvent.inputTypeEnter(searchValue.data)
          }
        }}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  border-bottom: 1px solid grey;
  > input {
    @media (min-width: ${ms.SM}px) {
      ::placeholder {
        color: ${theme.colors.white};
      }
    }
    outline: none;
    border: none;
    background: none;
    width: 100%;
    ${theme.ty('rc-xl')};
    padding: 0px;
  }
`
