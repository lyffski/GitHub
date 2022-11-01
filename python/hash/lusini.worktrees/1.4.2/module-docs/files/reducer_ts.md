# reducer.ts

Der Reducer fungiert als Datenbank für das Modul. Exportiert wird

- der State Type
- der default State
- der Reducer als default export

```javascript
import * as at from './const'

export type State = {
  counter: number,
}

export const defaultState = {
  counter: 0,
}

export default function reducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case at.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      }
    case at.DECREMENT:
      return {
        ...state,
        counter: state.counter <= 0 ? state.counter : state.counter - 1,
      }
    default:
      return state
  }
}
```

## Best Practives

- der state sollte immer ein object sein
- IMMER auf immutability achten
- reducer dürfen niemals auf actions von anderen module reagieren
