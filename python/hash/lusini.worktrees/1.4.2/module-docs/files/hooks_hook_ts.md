# hooks/[hook].ts

Hooks bilden die API zu den React Komponenten. Die Verbindung dazu stellt der hook `useConnect` dar. das ist ein extrem performanter hook, welcher die State-Daten zu einer angenehmen API zusammenfügt. Folgend ein Beispiel:

```javascript
import { State } from '../reducer'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect, { Module } from 'hooks/useConnect'

type Input = {}

type Output = {
  data: ReturnType<typeof s.getMessages>,
  add: typeof a.addMessage,
  remove: typeof a.removeMessage,
}

const config: Module<Input, Output, State, object> = {
  moduleKey: 'snackbar',
  name: 'snackbar/useMessages',
  createCacheKey: () => '',
  mapState: (state) => ({
    data: s.getMessages(state),
  }),
  mapDispatch: {
    add: a.addMessage,
    remove: a.removeMessage,
  },
}

export default function useMessages(): Output {
  const input = {}
  const hook: Output = useConnect(input, config)
  return hook
}

// jsx
const msg = useMessages()
msg.add('my first message') // dispatch: { type:'ADD_MESSAGE', payload: 'my first message' }
msg.add('my next message') // dispatch: { type:'ADD_MESSAGE', payload: 'my next message' }
console.log(msg.data) // ['my first message', 'my next message']
msg.remove('my first message') // dispatch: { type:'REMOVE_MESSAGE', payload: 'my first message' }
console.log(msg.data) // ['my next message']
```

Last uns das mal analysieren: Die Imports sollten überall gleich aussehen. Anschließend definieren wir den Output. Das ist die API welche unser hook exportiert. Anschließend definieren wir die Config:

- **moduleKey**: hier sollte immer der modul-name stehen. wichtig für das Caching
- **name**: `modul-name/hook-name`. wichtig für das Caching
- **createCacheKey**: Es soll ein Cache-Key aus den Argumenten gebildet werden. Die Idee dahinter ist die selbe wie von `re-reselect` aus unsere [selectors](./selectors_ts.md). Im obigen Beispiel hat der hook keine Argumente, weswegen ein leerer String ausgegeben wird.
- **mapState**: Funktion welche den State und die Argumente (input) erhält und uns Daten aus dem State geben soll. Der Zugriff auf den State erfolgt ausschließlich über [selectors](./selectors_ts.md). Das Ergebnis wird in den Output gemerged.
- **mapDispatch**: Listet alle [Actions](./actions_ts.md) auf welche verwendet werden. Diese Actions werden direkt in den Output gemerged

Der Hook selber sollte immer wie oben aufgebaut werden. Da wir für diesen Hook keine Argumente haben ist unser `Input` type ein leeres Object.

## Hook mit Argumenten

Oft ist es nötig, dass wir dem Hook etwas Context mitgeben müssen. Wenn wir z.b einen Hook `useFilter` haben, so muss dieser Hook wissen, ob er jetzt über Größe oder Farbe filtern soll:

```javascript
import * as t from '../types'
import { State } from '../reducer'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect, { Module } from 'hooks/useConnect'

// type FilterKey = 'color' | 'size'
// type FilterOption = string

type Input = {
  filterKey: t.FilterKey,
}

type Output = {
  options: ReturnType<typeof s.getFilterOptions>,
  value: ReturnType<typeof s.getFilterValue>,
  toggleOption: typeof a.toggleFilterOption,
  clear: typeof a.clearFilterValue,
}

const config: Module<Input, Output, State, object> = {
  moduleKey: 'products',
  name: 'products/useFilter',
  createCacheKey: (input) => input.filterKey,
  mapState: (state, input) => ({
    options: s.getFilterOptions(state, input.filterKey),
    value: s.getFilterValue(state, input.filterKey),
  }),
  mapDispatch: {
    toggleOption: a.toggleFilterOption,
    clear: a.clearFilterValue,
  },
}

export default function useFilter(filterKey: t.FilterKey): Output {
  const input = { filterKey }
  const hook: Output = useConnect(input, config)
  return hook
}

// jsx
const filter = useFilter('color')
filter.toggleOption('color', 'black') // set black color
filter.clear('color') // remove black color
```

Hier ist ein Beispiel wo wir Argumente in unseren hook geben. Wir müssen unseren FilterKey mitgeben. Daraus resultiert, dass dieses Argument in den input mit aufgenommen wird. Da wir Argumente mitgeben, müssen wir unseren CacheKey kalkulieren.
Der CacheKey sollte für alle input-variationen eindeutig sein. da wir nur ein Argument haben ist es hier leicht. unser FilterKey ist unser CacheKey.

## Actions Überladen

Im obigen Beispiel gibt es ein Problem. wir müssen jedesmal wenn wir eine Option toggeln wollen den FilterKey mitgeben, da unsere Action das erwartet. Wir wissen den FilterKey aber bereits im hook. Deswegen können wir die Action damit überladen um eine einfachere API anzubieten:

```javascript
import * as t from '../types'
import { State } from '../reducer'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect, { Module } from 'hooks/useConnect'

// type FilterKey = 'color' | 'size'
// type FilterOption = string

type Input = {
  filterKey: t.FilterKey,
}

type Output = {
  options: ReturnType<typeof s.getFilterOptions>,
  value: ReturnType<typeof s.getFilterValue>,
  toggleOption: RemoveArg0<typeof a.toggleFilterOption>, // filterkey was removed
  clear: RemoveArg0<typeof a.clear>, // filterkey was removed
}

type DP = {
  toggleOption: typeof a.toggleFilterOption,
  clear: typeof a.clear,
}

const config: Module<Input, Output, State, DP> = {
  moduleKey: 'products',
  name: 'products/useFilter',
  createCacheKey: (input) => input.filterKey,
  mapState: (state, input) => ({
    options: s.getFilterOptions(state, input.filterKey),
    value: s.getFilterValue(state, input.filterKey),
  }),
  mapDispatch: {
    toggleOption: a.toggleFilterOption,
    clear: a.clearFilter,
  },
  // overload our dispatch
  transformDispatch: {
    toggleOption: (fn, sp, input) => (option) => fn(input.filterKey, option),
    clear: (fn, sp, input) => () => fn(input.filterKey),
  },
}

export default function useFilter(filterKey: t.FilterKey): Output {
  const input = { filterKey }
  const hook: Output = useConnect(input, config)
  return hook
}

// jsx
const colorFilter = useFilter('color')
colorFilter.toggleOption('black') // set black color
colorFilter.clear() // remove black color
```

Zugegeben, das wirkt auf den ersten Blick erst mal verstörend. Unser transformDispatch überschreibt die originale Funktion indem es sie monkeypatched. Sie erhält 3 Argumente:

- fn: original Function
- sp: Das was von `mapState` zurück kommt
- input: der input welcher aus den hook argumenten gebildet wird

Es wird eine neue Funktion returned, welche die alte überläd. In unserem Fall haben wir den filterKey bereits gesetzt, sodass wir lediglich die Option mitgeben müssen. Deswegen werden die Funktionen in unserem Output Type auch mit `RemoveArg0` gewrappt, weil das erste Argument von `transformDispatch` bereits überladen wird.

Ebenfalls benötigt unser `Module` type ein weitere Argument `DP` (DispatchProps), welches `mapDispatch` typisieren soll
