# rules.ts

Rules managen den Datenfluss in unserem Modul:

```javascript
import {addRule} from 'redux-ruleset'
import * as a from './actions'
import * as s from './selectors'
import * as t from './types'
import * as at from './const'
import * as api from './utils/api'

addRule<a.FetchRequest>({
  id: 'products/FETCH',
  target: at.FETCH_REQUEST,
  output: [at.FETCH_SUCCESS, at.FETCH_FAILURE],
  concurrency: 'SWITCH',
  consequence: action => {
    const {filterValues} = action.meta
    return api.fetch(filterValues).then(
    result => a.fetchSuccess(filterValues, result),
    error => a.fetchFailure(filterValues, error.toString())
  )
})
```

Die Importe sollten immer wie oben aussehen (falls vorhanden). Um mehr über Redux-ruleset zu erfahren lest euch in den [docs](https://redux-ruleset.netlify.com/) ein.
