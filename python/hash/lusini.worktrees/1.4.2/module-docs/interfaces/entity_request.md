# Entity Request Interface

## Wann soll ich das benutzen?

Wenn wir Daten fetchen wollen, welche anhand eines eines einzelnen Identifiers identifiziert werden können.

## Regeln

- Es muss das [Request Interface](./request.md) implementiert werden
- [types.ts](../files/types_ts.md) muss einen Type Identifier implementieren, welcher eine saubere Dokumentation aufweisen muss
- Alle Action-Creators aus dem [Request Interface](./request.md) haben als erstes Argument den Identifier welcher dann unter `action.meta.identifier` gespeichert wird
- es muss eine Rule `[module-name]/FETCH` geben
- die `fetch` Api Methode muss als Argument den Identifier haben

## Beispiel

Folgend soll das Entity Request Interface am Beispiel eines hypotetischen Product-Fetchings erklärt werden. Hierbei wird ein einzelnes Produkt anhand der SKU (indentifier) gefetched. Damit ist dieses Beispiel dem [Entity Request Interface](./entity_request.md) zuzuordnen. Hier fetched man nur eine einzelne Entity wogegen man im [Collection Request Interface](./collection_request.md) eine Liste von Entitäten fetched

### Types

Es muss immer ein Type Identifier definiert sein sowie die tasächliche Entität (in unserem Fall `Product`):

```javascript
// product/types.ts

/** SKU of product */
export type Identifier = string

export type Product = {
  sku: string,
  productNumber: string,
  name: string,
  // ...
}
```

Der Identifier sollte immer einen JsDoc kompatiblen Kommentar aufweisen welcher den Type beschreibt

### Api

Anschließend implementieren wir unserern [Api Endpunkt](./files/utils_api_ts.md):

```javascript
// product/utils/api.ts
import * as t from '../types'

export function fetch(identifier: t.Identifier): Promise<t.api.Fetch> {
  // implementation
}
```

Die `fetch` Methode sollte als Agument immer den Identifier aufweisen.

### Action Creators

Nun können wir unsere [Action Creators bauen](./files/actions_ts.md). WICHTIG: alles was unser entsprechender api Endpunkt an Argumenten benötigt muss als meta in jede unserer Actions mitgegeben werden (als erstes Argument):

```javascript
// product/actions.ts
import * as t from './types'
import * as at from './const'
import * as api from './utils/api'

export const fetchRequest = (identifier: t.Identifier) => ({
  type: at.FETCH_REQUEST,
  meta: { identifier },
})

export const fetchSuccess = (identifier: t.Identifier, result: api.Fetch) => ({
  type: at.FETCH_SUCCESS,
  meta: { identifier },
  payload: result,
})

export const fetchFailure = (identifier: t.Identifier, error: string) => ({
  type: at.FETCH_FAILURE,
  meta: { identifier },
  payload: error,
})

export type FetchRequest = ReturnType<typeof fetchRequest>
export type FetchSuccess = ReturnType<typeof fetchSuccess>
export type FetchFailure = ReturnType<typeof fetchFailure>

export type Action = FetchRequest | FetchSuccess | FetchFailure
```

<!-- ### Reducer

Der Reducer sollte den Identifier als extra key führen:

```javascript

``` -->

### Rest

Alles andere verhält sich genauso wie im Request Interface
