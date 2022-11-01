# actions.ts

Hier werden alle [Action-Creators](../wording#actioncreator) exportiert. Dieses File definiert alle Actions und ist verantwortlich für die Typisierung von Actions.

```javascript
import * as t from './types'
import * as at from './const'

export const setProperty = (name: string, value: string) => ({
  type: at.SET_PROPERTY,
  meta: { name },
  payload: value,
})

export const removeItem = (item: t.Item) => ({
  type: at.REMOVE_ITEM,
  payload: item,
})

export type SetProperty = ReturnType<typeof setProperty>
export type RemoveItem = ReturnType<typeof removeItem>

export type Action = SetProperty | RemoveItem
```

Lasst uns das obige Beispiel einmal Schritt für Schritt analysieren. Wir fangen damit an, alles von [types](./types_ts.md) und [const](./const_ts.md) zu importieren. Das sollte für jedes actions-file immer Pflicht sein!

Als nächstes definieren wir zwei Action-Creators `setProperty` und `removeItem`. Eine Action ist ein Objekt mit maximal 3 keys:

- **type**: der action type
- **payload**: ein payload ist der konkrete wert der übermittelt werden soll
- **meta**: alle informationen welche im Context zu dem payload stehen

Anschließend exportieren wir alle action-return-types. Diese werden später von diversen Rules und hooks benötigt

Am Schluss wird der globale Action-Type exportiert. Hierfür bitte immer obiges Schema verwenden. Dieser Type wird später von dem [reducer](./reducer_ts.md) verwendet um die Actions zu typisieren

## Request Actions

Falls das [Request Interface](../interfaces/request.md) verwendet wird, muss `actions.ts` auch auf [utils/api.ts](utils_api_ts.md) zugreifen um die Api Types zu verwenden. Für request action types unbedingt beachten: alle Argumente welche der api-endpunkt benötigt MÜSSEN UNBEDINGT im meta feld aller request actions vorhanden sein:

```javascript
import * as t from './types'
import * as at from './const'

export const fetchRequest = (filterValues: t.FilterValues) => ({
  type: at.FETCH_REQUEST,
  meta: { filterValues },
})

export const fetchSuccess = (
  filterValues: t.FilterValues,
  result: t.api.Fetch
) => ({
  type: at.FETCH_SUCCESS,
  meta: { filterValues },
  payload: result,
})

export const fetchFailure = (filterValues: t.FilterValues, error: string) => ({
  type: at.FETCH_FAILURE,
  meta: { filterValues },
  payload: error,
})

export type Action =
  | ReturnType<fetchRequest>
  | ReturnType<fetchSuccess>
  | ReturnType<fetchFailure>
```

Man beachte, dass der `result` in der SUCCESS action ebenfalls aus den types typisiert wird. Dadurch entkoppeln wir die Beziehung zwischen action-creator und und Api-Endpunkt. Die Action benötigt kein Wissen über die API, da es das Ergebnis nur durchreicht
