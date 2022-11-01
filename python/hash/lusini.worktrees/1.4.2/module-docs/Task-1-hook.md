## React Hooks

React-Hooks bilden die Grundlage wie auf Komponentenebene mit Daten umgegangen wird.
Deshalb ist es unerlässlich dass diese absolut verstanden werden

Bitte schaut euch genau an wie react-hooks funktionieren. Gerne auch mit diversen videos. es sollten ALLE hooks in-depth verstanden und angewendet werden können.

Es sollen folgende Hooks erstellt werden wobei alle in Typescript und vollkommen typisiert werden sollen:

### useToggle

param-1 `initialValue` boolean -> initiale Wert

output: [open, toggle]
output[0] `open` boolean -> aktueller Wert
output[1] `toggle` Function -> toggled den wert. Referenz bleibt immer gleich! (#useCallback)

Beispiel:

```javascript
const [open, toggleOpen] = useToggle(false)

expect(open).toBe(false)
toggleOpen()
expect(open).toBe(true)
toggleOpen()
expect(open).toBe(false)
```

### useFetch

soll jedesmal getriggert werden wenn sich die input url ändert

param-1 `url` string -> url die gefetched werden soll

output [result,isFetching,error]
output[0] `result` Object | null -> Ergebnis nach erfolgreichem fetchen
output[1] `isFetching` boolean -> ob gerade gefetched wird
output[2] `error` null | string -> error msg falls etwas schief gelaufen ist

Beispiel:

```javascript
const [result, isFetching, error] = useFetch('https://randomuser.me/api')

// initial
expect(result).toBe(null)
expect(isFetching).toBe(true)
expect(error).toBe(null)

// fetch erfolgreich
expect(result).not.toBe(null)
expect(isFetching).toBe(false)
expect(error).toBe(null)

// fetch misslungen
expect(result).toBe(null)
expect(isFetching).toBe(false)
expect(error).not.toBe(null)
```

### useInView

Dieser hook kann erkennen wann eine Komponente in den Viewport kommt und wann sie ihn wieder verlässt. Interessant hierfür ist die IntersectionObserver API. Ihr könnt aber auch jede andere Methode für die Detection wählen solange sie ähnlich performant ist

param-1 `offset` number -> bei offset=0 feuert der hook erst wenn die Komponente in den Viewport kommt. bei offset=100 feuert der hook sobald die komponente 100px vom viewport entfernt ist (überhalb/unterhalb)
param-2 `triggerOnce` boolean => falls true bleibt der hook ewig auf true sobald die komponente einmal in den Viewport gekommen ist

output [ref, inView]
output[0] `ref` React.Ref -> Anker für die Komponente auf die der Listener gelegt wird
output[1] `inView` -> true wenn die Komponente in den Viewport kommt

Beispiel:

```javascript
function Component() {
  const [ref, inView] = useInView(100, true)
  return (
    <div ref={ref}>{inView ? 'Ich bin im viewport' : 'nicht im viewport'}</div>
  )
}
```

### useLazyImgSrc

Bilder sollten erst dann geladen werden wenn sie auch wirklich im Viewport sind. Dieser Hook zögert das Laden des Bildes solange heraus und stellt bis das Bild dann geladen wurde einen optionalen Base64 String bereit. Hier könnte evt der vorherige hook `useInView` nützlich sein

param-1 `src` string -> Url des Bildes
param-2 `offset` number -> Wie bei useInView
param-3 `base64` ?string -> Optionaler Base64 Repräsentation des Bildes

output [ref, url]
output[0] `ref` React.Ref -> Anker für die Komponente auf die der Listener gelegt wird
output[1] `url` string -> die Url für den img tag

Beispiel:

```javascript
// Bild wird erst geladen wenn es noch 300px vom viewport entfernt ist
function Component() {
  const [ref, url] = useLazyImgSrc(
    'https://i.picsum.photos/id/503/200/300.jpg',
    300
  )
  return <img ref={ref} src={url} />
}
```

### useFocus

Implementierung bleibt komplett euch überlassen (Überlegt euch eine APi). Die Idee ist, dass wir auf javascript seite mitbekommen ob eine Komponente gerade einen Fokus hat. z.B

```javascript
function Component() {
  const [ref, isFocus] = useFocus()
  return (
    <div ref={ref}>
      {isFocus ? 'ich bin gerade fokusiert' : 'nicht fokusiert'}
    </div>
  )
}
```

### Eigene Ideen

Erstellt noch weitere Hooks die euch einfallen. So könnte man z.b veschiedene Datenstrukturen wie Stacks oder Queues erstellen.

## Extremes Beispiel

React-Redux wird als Bridge zwischen React und Redux genutzt. Das ganze funktioniert über HOCs (Higher Ordered Components). Leider sind HOCs nicht wirklich komposable also habe ich einen Hook geschrieben der die selbe API aufweist aber als hook funktioniert. Folgend ist eine Implementierung welche ich früher verwendet habe. Die "Masteraufgabe" wäre sich diesen Hook mal anzusehen und zu verstehen. Wenn ihr ihn nicht versteht ist es auch nicht so schlimm (er ist ziemlich komplex) aber versucht euch Mühe zu geben. habt ihr diesen verstanden dann habt ihr hooks vollkommen verstanden:

```javascript
// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import type Store from 'store/bootstrap'

const StoreContext = React.createContext(null)

function usePrevValue<V: any>(val: V): V {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = val
  })
  return ref.current || val
}

function shallowEqual(a: Object, b: Object): boolean {
  for (let key in b) if (b[key] !== a[key]) return false
  return true
}

export const StoreProvider = StoreContext.Provider

// OP: OwnProps -> props die in den hook gegeben werden
// SP: StateProps -> was von "mapState" zurück kommt
// DP: DispatchProps -> was von "mapDispatch" zurück kommt
export default function useConnect<
  OP: Object,
  Result: Object,
  SP: Object,
  DP: Object
>(
  props: OP,
  mapState: (state: Object, props: OP) => SP,
  mapDispatch: DP,
  mergeProps: (sp: SP, dp: DP, op: OP) => Result,
  options: {
    areStatesEqual: (
      prev: Object,
      next: Object,
      prevProps: OP,
      nextProps: OP
    ) => boolean,
    areOwnPropsEqual?: (prev: OP, next: OP) => boolean,
    areStatePropsEqual?: (prev: SP, next: SP) => boolean,
  }
) {
  const store: Store = React.useContext(StoreContext)
  const areOwnPropsEqual = options.areOwnPropsEqual || shallowEqual
  const areStatePropsEqual = options.areStatePropsEqual || shallowEqual
  const [, update] = React.useState(0)
  const result = React.useRef<Result | null>(null)
  const state = store.getState()
  const prevState = usePrevValue(store.getState())
  const prevProps = usePrevValue(props)
  const propsAreEqual = areOwnPropsEqual(prevProps, props)
  // eslint-disable-next-line
  const dp = React.useMemo(
    () => bindActionCreators(mapDispatch, store.dispatch),
    []
  )
  const sp = React.useRef<SP | null>(null)
  const memoProps = React.useRef<OP | null>(null)
  memoProps.current = props

  const memoMapState = React.useMemo(() => {
    let prevProps = {}
    let prevState
    let prevResult
    return (state, props) => {
      if (state !== prevState || !shallowEqual(prevProps, props)) {
        prevState = state
        prevProps = props
        prevResult = mapState(state, props)
      }
      return prevResult
    }
    // eslint-disable-next-line
  }, [])

  React.useLayoutEffect(
    () =>
      store.subscribe(() => {
        const next = store.getState()
        if (!options.areStatesEqual(state, next, prevProps, props)) {
          const nextSp = memoMapState(next, memoProps.current || props)
          if (!sp.current || !areStatePropsEqual(sp.current, nextSp)) {
            update(next)
          }
        }
        // eslint-disable-next-line
      }),
    []
  )

  if (result.current && propsAreEqual && prevState === state) {
    return result.current
  }
  sp.current = memoMapState(state, props)
  result.current = mergeProps(sp.current, dp, props)
  return result.current
}
```

Angewendet wird das ganze dann folgendermaßen:

```javascript
// usePage
import * as s from '../selectors'
import * as a from '../actions'
import useConnect from 'hooks/useConnect'

export type Props = {
  identifier: string
}

export type InjectedProps = {
  page: number,
  numPages: number,
  setPage: (query:number) => unknown
}

const mapState = (state, props) => ({
  page: s.getPage(state.products, props.identifier),
  numPages: s.getNumPages(state.products, props.identifier)
})

const mapDispatch = {
  setPage: a.setPage
}

const mergeProps = (sp,dp,props) => Object.assign({}, sp, {
  setPage: (page:number) => dp.setPage(props.identifier, page)
})

const options = { areStatesEqual: (a,b) => a.products === b.products }

export default function usePage(props:Props):InjectedProps{
  const hook = useConnect<Props, InjectedProps>(props, mapState, mapDispatch, mergeProps, options)
  return hook
}
```

Für diejenigen die durchsteigen noch ein paar Fragen:

- was hat `useConnect` für Schwächen?
- wie effektiv ist das Caching?
- der hook wird nicht mehr verwendet, weil es einige edge-cases gibt wo er nicht sauber funktioniert. erkennst du die edge-cases?
