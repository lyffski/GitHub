// import * as React from 'react'
// import { firescoutMockFn } from '@kaminrunde/cypress-firescout'
// import store from 'store'

// type Props = {
//   name: string
//   componentProps: any
//   events: any[]
// }

// export default function MoleculeTest(p: Props) {
//   if (process.env.NODE_ENV === 'development') {
//     const Component = React.useMemo(() => {
//       return React.lazy(() => import(`../../molecules/${p.name}`))
//     }, [p.name])

//     const parsedProps = React.useMemo(() => {
//       const props = {}
//       for (const key in p.componentProps) {
//         if (
//           typeof p.componentProps[key] === 'string' &&
//           p.componentProps[key].startsWith('fn:')
//         ) {
//           const fn = p.componentProps[key].replace('fn:', '')
//           props[key] = new Function(`return ${fn}`)
//         } else props[key] = p.componentProps[key]
//       }
//       return props
//     }, [])

//     const [props, setProps] = React.useState(parsedProps)

//     const finalProps = React.useMemo(() => {
//       const finalProps = {}
//       for (const key in props) {
//         if (typeof props[key] === 'function') {
//           finalProps[key] = firescoutMockFn(
//             `${p.name}.${key}`,
//             props[key]()(props, setProps)
//           )
//         } else finalProps[key] = props[key]
//       }
//       return finalProps
//     }, [props])

//     React.useEffect(() => {
//       p.events.forEach(store.dispatch)
//     }, [])

//     return (
//       <React.Suspense fallback="loading...">
//         <Component {...finalProps} />
//       </React.Suspense>
//     )
//   } else {
//     return null
//   }
// }
export default () => null