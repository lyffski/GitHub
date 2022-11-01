import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import { navigate } from 'gatsby'
import config from 'config'

type Props = {
  html: string
}

export default function Markdown(props: Props) {
  const ref = React.useRef<null | HTMLDivElement>(null)

  // rewrite all a-tags to use internal navigation mechanics.
  React.useEffect(() => {
    if (!ref.current) return

    const aTags = Array.from(ref.current.getElementsByTagName('a'))

    for (const tag of aTags) {
      tag.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLAnchorElement
        const href = target.getAttribute('href')
        if (!href) return

        if (href[0] === '#') return

        e.preventDefault()
        e.stopPropagation()

        if (href[0] !== '/') {
          return window.open(href, '_blank', 'noopener,noreferrer')
        }

        if (href.startsWith('/' + config.locale)) {
          navigate(href.replace('/' + config.locale, ''))
        } else {
          navigate(href)
        }

        return
      })
    }
  }, [props.html])

  return <Wrapper ref={ref} dangerouslySetInnerHTML={{ __html: props.html }} />
}

const Wrapper = styled.div`
  color: ${theme.colors.b0};

  table {
    border-collapse: collapse;
    width: 100%;
    > thead {
      > tr {
        > th {
          background-color: ${theme.colors.shade.b6};
          padding: ${theme.spacing('s')};
          ${theme.ty('r-s')};
        }
        > th:not(:last-child) {
          border-right: 1px solid ${theme.colors.white};
        }
      }
    }

    tbody {
      > tr {
        > td:not(:last-child) {
          border-right: 1px solid ${theme.colors.shade.b5};
        }
        > td {
          padding: ${theme.spacing('s')};
          ${theme.ty('r-base')};
          border-bottom: 1px solid ${theme.colors.shade.b5};
        }
      }
    }
  }

  h1 {
    ${theme.ty('rc-3xl')}
    color: ${theme.colors.primary};
    display: none;
    margin: ${theme.spacing('m')} 0;

    @media (min-width: ${ms.MD}px) {
      ${theme.ty('rc-4xl')}
      margin: ${theme.spacing('ml')} 0;
    }

    &.visible {
      display: block;
    }
  }

  h2 {
    ${theme.ty('rc-2xl')}
    @media(min-width: ${ms.MD}px) {
      ${theme.ty('rc-3xl')}
    }
  }

  h3 {
    ${theme.ty('rc-base')}
    @media(min-width: ${ms.MD}px) {
      ${theme.ty('rc-2xl')}
    }
  }

  h4 {
    ${theme.ty('rc-s', 'bold')}
    @media(min-width: ${ms.MD}px) {
      ${theme.ty('rc-l', 'bold')}
    }
  }

  h5,
  h6 {
    display: none;
  }

  p,
  li {
    ${theme.ty('r-s')}
    @media(min-width: ${ms.MD}px) {
      ${theme.ty('r-base')}
    }
  }

  a {
    text-decoration: underline;
    cursor: pointer;
  }

  ul,
  ol {
    list-style-type: disc;
    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 20px;
    padding-inline-start: 23px;
  }
  ol {
    list-style-type: decimal;
  }

  blockquote {
    ${theme.ty('rc-base')}
    border-left: ${theme.spacing('xs')} solid ${theme.colors.primary};
    padding-left: ${theme.spacing('s')};
    margin: 0;
    @media (min-width: ${ms.MD}px) {
      ${theme.ty('r-xl')}
    }
  }

  div.prominent,
  div.prominent > a {
    ${theme.ty('r-base', 'bold')}
    color: ${theme.colors.primary};
    text-decoration: none;

    > svg {
      g {
        stroke: ${theme.colors.primary};
      }
    }
  }

  div.box {
    padding: ${theme.spacing('ml')} ${theme.spacing('m')};
    background: ${theme.colors.shade.primaryUltraBright};
    color: ${theme.colors.shade.b3};
    border-radius: 15px 15px 15px 0;
    @media (min-width: ${ms.MD}px) {
      padding: ${theme.spacing('l')} ${theme.spacing('xxl')};
    }
  }

  .table-wrapper {
    overflow: auto;
    max-width: var(--container-size);
    > table {
      td {
        ${theme.ty('r-s')}
        @media (min-width: ${ms.MD}px) {
          ${theme.ty('r-base')}
        }
      }
    }
  }

  /* disable images */
  img {
    display: none;
  }

  /* 
   * -------------- SPACINGS ------------------
   * all elemements have a margin-top except the first one 
   * elementes can override this default margin to add a custom margin
   */
  *::first-child {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  *::first-child + * {
    margin-top: ${theme.spacing('m')} !important;

    @media (min-width: ${ms.MD}px) {
      margin-top: ${theme.spacing('ml')} !important;
    }
  }

  /* headlines have a bigger margin-top */
  * + h1,
  * + h2,
  * + h3,
  * + h4 {
    margin-top: ${theme.spacing('ml')} !important;
    @media (min-width: ${ms.MD}px) {
      margin-top: ${theme.spacing('l')} !important;
    }
  }

  /* anything followed by a headline has a smaller margin-top */
  h1 + *,
  h2 + *,
  h3 + *,
  h4 + * {
    margin-top: ${theme.spacing('xxs')} !important;
    @media (min-width: ${ms.MD}px) {
      margin-top: ${theme.spacing('xs')} !important;
    }
  }

  /* list items should have no margin */
  li {
    margin-top: 0 !important;
  }

  /* prominent links should align to the top container */
  * + div.prominent {
    margin-top: ${theme.spacing('xs')} !important;
    @media (min-width: ${ms.MD}px) {
      margin-top: ${theme.spacing('s')} !important;
    }
  }

  /* the arrow svg is not positioned in the center... */
  svg.arrow {
    margin-bottom: -3px !important;
    margin-left: 5px;
    margin-right: 5px;
  }

  /* custom space element */
  .space {
    width: 100%;
    min-height: ${theme.spacing('s')};
    @media (min-width: ${ms.MD}px) {
      min-height: ${theme.spacing('m')};
    }
    margin-top: 0 !important;
  }

  .space + * {
    margin-top: 0 !important;
  }

  a {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    -moz-hyphens: auto;
    -o-hyphens: auto;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }
`
