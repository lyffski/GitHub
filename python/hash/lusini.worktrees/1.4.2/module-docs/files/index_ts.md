# index.ts

Dieses File ist zuständig dafür eine public API für das Modul anzubieten
Exportiert wird als default der [reducer](./reducer_ts.md) sowie alle [hooks](./hooks_hook_ts.md). Alles andere darf nicht exportiert werden. Dadurch wird gewährleistet das die genaue Implementation des Moduls so variabel wie möglich ist. Überspitzt gesagt ist durch eine feste API möglich, dass die Implementation des Moduls täglich vollkommen neu geschrieben werden kann ohne etwas außerhab des Moduls zu beeinflussen (solange die API gleich bleibt)

```javascript
import './rules'
import reducer, {State} from './reducer'
import store from 'store'
import {Action} from './actions'

store.injectReducer(store, 'cart', reducer)

declare global {
  interface RootState { cart: State }
  interface RootReducers { cart: typeof reducer }
  interface ModuleActions { cart: Action }
}

export {default as useHook1} from './hooks/useHook1'
export {default as useHook2} from './hooks/useHook2'
export {default as useHook3} from './hooks/useHook3'
```

Hier ist außerdem der richtige Punkt um das [rules-file](./rules_ts.md) aufzurufen

## TODO
