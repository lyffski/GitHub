# Record Interface

## Wann soll ich das benutzen?

Wenn das selbe Modul zeitgleich von unterschiedlichen Komponenten benötigt wird, wobei diese jeweils unabhängige Instanzen verweden wollen

## Einleitung

Module haben die Eigenschaft, dass sie global sind. Das bedeutet, wenn `Komponente A` und `Komponente B` auf das selbe Modul zugreifen dann verwenden sie die exakt selben Daten. Normalerweise ist das so gewollt, da dies die einzige Möglichkeit darstellt wie Komponenten miteinander kommunizieren können.

Was ist aber wenn wir eine `Komponente C` haben welche zwar das selbe Modul verwenden will aber einen eigenständigen State nutzen will? Nehmen wir als Beispiel ein `products` Modul. Sowohl unsere Suche als auch unser Category-Widget wollen dieses Modul nutzen und beide können zeitgleich existieren. Beide wollen unabhängig voneinander Produkte anzeigen.

Dies wird möglich, indem wir unseren State als Record erstellen. Durch die Angabe einer `RecordId` in jedem Hook kann die nutzende Komponente dann entscheiden, auf welchen State sie zugreifen will. Das klingt jetzt alles komplizierter als es ist. Hier ein Beispiel:

## Beispiel

```javascript
// actions.ts

// vorher:
export const setPage = (page: number) => ({
  type: at.SET_PAGE,
  payload: page,
})

// nachher:
export const setPage = (recordId: string, page: number) => ({
  type: at.SET_PAGE,
  meta: { recordId },
  payload: page,
})
```

JEDE action hat als allererstes Argument die `RecordId`, welcher dann im Meta der Action gespeichert werden.

```javascript
// reducer.ts

// vorher:
export type State = {
  data: t.Product[],
  isFetching: boolean,
}

// nachher:
export type State = Record<
  string,
  {
    data: t.Product,
    isFetching: boolean,
  }
>
```

Wir wandeln unseren State um in einen Record (=object). Im Reducer sollte die `RecordId` der Actions genutzt werden um den richtigen State zu referenzieren

```javascript
// selectors

// vorher:
export const getProducts = (state: State): t.Product[] => state.data

// nachher:
const emptyArray = [] // needs to be outside, otherwise a new reference can be created by every invocation
export const getProducts = (state: State, recordId: string): t.Product[] => {
  const inner = state[recordId]
  if (!inner) return emptyArray // always return soemthing if record does not exist yet
  return inner.data
}
```

Jeder selector muss als erstest Argument (nach dem State) die `RecordId` haben. Es sollte immer die Möglichkeit bedacht werden, dass eine Komponente auf einen Record zugreifen will, welcher noch nicht existiert.

```javascript
// hooks/[hook].ts

export type Input = {
  recordId: string,
  // ...
}

const config: Config<Input, Output, State, object> = {
  moduleKey: 'products',
  name: 'products/useProducts',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => ({
    data: s.getProducts(state, input.recordId),
    //  ...
  }),
}

export default function useProducts(recordId: string): Output {
  const input: Input = { recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
```

Der Hook nimmt als erstes Argument immer die RecordId entgegen und kan später dann verwendet werden. Die RecordId sollte ebenfalls in den `cacheKey` mit einfliesen da es ansonsten zu sehr seltsamen bugs kommen kann.

Damit sich an dem Output nichts ändert sollten die Actions (falls vorhanden) ebenfalls mit `transformDispatch` gewrappt werden:

```javascript
// hooks/[hook].ts

const config = {
  // ...
  mapDispatch: {
    setPage: a.setPage,
  },
  transformDispatch: {
    setPage: (fn, sp, input) => (page: number) => f(input.recordId, page),
  },
}
```

Für falls diese Schreibweise noch ungewohnt ist, studiere am besten nochmal, [wie hooks funktionieren](../files/hooks_hook_ts.md).
Besonderst die Sektion **Actions Überladen** ist hier wichtig
