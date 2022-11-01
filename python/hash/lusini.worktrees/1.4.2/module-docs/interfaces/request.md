# Request Interface

## Wann soll ich das benutzen?

Sobald unser Modul Side-Effects hat. Das passiert, wenn wir z.b Daten von einer API fetchen müssen, mit dem Session-Storage interagieren oder irgend einen asynchronen Prozess haben

## Einleitung

Module kennen keine Asychronität. Die Logik ist folgende:

- User interagiert irgendwie mit der App (z.b Button click)
- ein Modul hook fungiert als callback und dispatched eine action
- reducer nimmt action engegen und erstellt neuen state
- modul hooks werden benachrichtigt und holen sich aktuelle daten aus dem state
- UI updated sich anhand der geupdateten modul hooks

Hier läuft alles synchron ab. Wie also können wir Asynchronität wie Daten von einer API fetchen zu unserem Modul bringen?

Last uns erst mal analysieren aus welchen Einzelteilen eine asynchrone Interaktion besteht.

- Wir starten die Interaktion
- wir warten....
- Wir erhalten eine Antwort:
  - Interaktion war erfolreich und wir erhalten die Antwort
  - Interaktion ist fehlgeschlagen und wir erhalten einen Fehler

Tatsächlich kann man die asynchrone Interaktion auf 3 unterschiedliche synchrone Interaktionen runterbrechen:

- REQUEST
- SUCCESS
- FAILURE

Hätten wir also eie asynchrone Interaktion `FETCH_PRODUCTS` könnten wir das auf folgende Action-Types runter brechen:

- FETCH_PRODUCTS_REQUEST
- FETCH_PRODUCTS_SUCCESS
- FETCH_PRODUCTS_FAILURE

Diese Actions können dann verwendet werden wie jede andere Action auch und durchläuft die selben Stadien. Gesteuert wird das ganze dann von unseren [rules](./files/rules_ts.md)

## Beispiel

Unser Shop hat eine Wishlist. Diese muss natürlich gefetched werden, weswegen wir hierfür das Request Interface verwenden:

### Action Types

Wir wollen eine async Action zum fetchen unseres Produkte erstellen. Zunächst [definieren wir unsere Action-Types](./files/const_ts.md)

```javascript
// wishlist/const.ts
export const FETCH_REQUEST: 'wishlist/FETCH_REQUEST' = 'wishlist/FETCH_REQUEST'
export const FETCH_SUCCESS: 'wishlist/FETCH_SUCCESS' = 'wishlist/FETCH_SUCCESS'
export const FETCH_FAILURE: 'wishlist/FETCH_FAILURE' = 'wishlist/FETCH_FAILURE'
```

Das Naming hier ist sehr wichtig. Das sollte immer im Kontext zu dem Modul stehen. Da unser Modul `wishlist` heißt wäre der Action Type `FETCH_WISHLIST_REQUEST` falsch! `Fetch` impliziert außerdem Asynchronität (`Get` impliziert Synchronität). Im Kontext von Asynchronität sollte niemals `get` verwendet werden

### Api

Anschließend implementieren wir unserern [Api Endpunkt](./files/utils_api_ts.md):

```javascript
// wishlist/utils/api.ts
import * as t from '../types'

export async function fetch(): Promise<t.api.Fetch> {
  // implementation
}

export async function addItem(): Promise<t.api.AddItem> {
  // implementation
}
```

Wir importieren immer zuerst unsere types.

Schließlich exportieren wir alle Api-Methoden. Das Naming hier ist sehr wichtig. Das sollte immer im Kontext zu dem Modul stehen. Da unser Modul `wishlist` heißt wäre die Api-Methode `fetchWishlist` falsch

Jeder Api Endpunkt definiert einen Return-Type. Dieser wird aus der [types](../files/types_ts.md) Datei importiert unter dem Namespace `api`. Der Name MUSS immer genauso heißen wie die Funktion selber; nur als Pascal-Case (first-letter-uppercase)

### Action Creators

Nun können wir unsere [Action Creators bauen](./files/actions_ts.md)

```javascript
// wishlist/actions.ts
import * as t from './types'
import * as at from './const'

export const fetchRequest = () => ({
  type: at.FETCH_REQUEST
})

export const fetchSuccess = (result:t.api.Fetch) => ({
  type: at.FETCH_SUCCESS
  payload: result
})

export const fetchFailure = (error:string) => ({
  type: at.FETCH_FAILURE
  payload: error
})

export type FetchRequest = ReturnType<typeof fetchRequest>
export type FetchSuccess = ReturnType<typeof fetchSuccess>
export type FetchFailure = ReturnType<typeof fetchFailure>

export type Action =
| FetchRequest
| FetchSuccess
| FetchFailure
```

Alle drei Actions weisen die selbe Signatur auf mit folgenden Unterschieden:

- der REQUEST hat keinen payload
- der SUCCESS hat als payload den Response unseres api calls
- der FAILURE hat als payload einen error string

### Reducer

Im [Reducer](./files/reducer_ts.md) müssen wir ebenfalls unsere drei Interaktionen abbilden:

```javascript
// wishlist/reducer.ts
import {Action} from './actions'
import * as at from './const'
import * as t from './types'

export type State = {
  isFetching: boolean,
  fetchError: null | string,
  data: t.Product || null,
  // ...
}

export const defaultState = {
  isFetching: false,
  fetchError: null,
  data: null,
  // ...
}

export default function reducer (state:State=defaultState, action:Action):State {
  switch(action.type) {
    case at.FETCH_REQUEST: return { ...state, isFetching: true, fetchError: null }
    case at.FETCH_FAILURE: return { ...state, isFetching: false, fetchError: action.payload }
    case at.FETCH_SUCCESS: return { ...state, isFetching: false, data: action.payload }
    default: return state
  }
}
```

Wenn ein Modul das Request Interface verwendet MUSS diese Struktur eingehalten werden. Diese Struktur kann im Rahmen des [Entity Request Interfaces](./entity_request.md) oder des [Collection Request Interfaces](./collection_request.md) Modulen noch erweitert werden, aber das obige ist immer verpflichtend:

Die State-Struktur benötigt immer folgende Keys:

- **isFetching**: `boolean` => managed ob gerade gefetched wird oder nicht
- **fetchError**: `null | string` => hält den request error falls der letzte fetch fehlgeschlagen ist. Andernfalls null
- **data**: `Payload` => Dieser Key muss immer `data` heißen, auch wenn es in unserem Beispiel vlt `product` verlockend klingt. Hier wir das Ergebnis unseres Api-Calls gespeichert. Falls noch kein Ergebnis vorhanden ist kann man entweder null speichern oder einen Placeholder mit der selben Struktur wir der Api Response

### Rules

Folgende Rule ist in jedem Request Interface vorhanden:

```javascript
// wishlist/rules.ts
import { addRule } from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as api from './utils/api'

addRule({
  id: 'wishlist/FETCH',
  target: at.FETCH_REQUEST,
  output: [at.FETCH_SUCCESS, at.FETCH_FAILURE],
  concurrency: 'SWITCH',
  consequence: (action) =>
    api.fetch(action.meta.identifier).then(
      (result) => a.fetchSuccess(action.meta.identifier, result),
      (error) => a.fetchFailure(action.meta.identifier, error.toString())
    ),
})
```

Diese Rule steuert das Fetchen unseres Products und managed die Concurrency. Hierzu bitte die [redux-ruleset docs](https://redux-ruleset.netlify.com/) lesen. [Collection Request Interfaces](./collection_request.ts) forcieren noch weitere Rules

### Selectors

Alle State Properties des Request Interfaces sollten einen eigenen Selector bekommen:

```javascript
import { State } from './reducer'

export const isFetching = (state: State) => state.isFetching

export const getFetchError = (state: State) => state.fetchError

export const getData = (state: State) => state.data
```
