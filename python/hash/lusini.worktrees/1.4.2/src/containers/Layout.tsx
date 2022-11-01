import 'features'
import * as React from 'react'
import StoryEvents from './StoryEvents'
import Breadcrumbs from 'theme/atoms/Breadcrumbs'
import Header from 'theme/app/Header'
import Footer from 'theme/app/Footer'
import FlyoutNavi from 'theme/app/FlyoutNavi'
import Modal from 'theme/app/Modal'
import { useWindowSize } from 'modules/browser'
import { Context as ContainerSizeContext } from 'hooks/useContainerSize'
import smoothscroll from 'smoothscroll-polyfill'

if (typeof window !== 'undefined') {
  smoothscroll.polyfill()
}

type Props = {
  children: React.ReactNode
  breadcrumbs?: {
    label: string
    link?: string
  }[]
  isFetching?: boolean
  storyEvents?: Record<string, unknown>[]
  smallContainer?: boolean
}

export default function Layout(props: Props) {
  const containerSize = props.smallContainer ? 700 : 1300
  useWindowSize()
  return (
    <StoryEvents storyEvents={props.storyEvents}>
      <Header />
      {props.breadcrumbs && (
        // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
        <Breadcrumbs
          breadcrumbs={props.breadcrumbs}
          isFetching={props.isFetching || false}
        />
      )}
      <ContainerSizeContext.Provider value={containerSize}>
        {props.children}
      </ContainerSizeContext.Provider>
      <Footer />
      <FlyoutNavi />
      <Modal />
    </StoryEvents>
  )
}
