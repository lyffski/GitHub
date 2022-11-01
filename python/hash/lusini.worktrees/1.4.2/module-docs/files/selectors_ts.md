# selectors.ts

Selectors bieten uns die API für unseren State. Außerdem wird hier das Caching von komplexen Queries übernommen (mit `reselect` und `re-reselect`). Man kann hier zwischen 3 verschiedenen query-typen unterscheiden:

- Daten aus dem state wiedergeben
- Daten aus dem State neu zusammenfügen
- Daten aus dem State anhand von Argumenten neu zusammenfügen

Für folgende Beispiele soll dieser State als Beispiel dienen:

```javascript
type Todo = {
  selected: boolean,
  label: string,
  done: boolean,
}

type State = {
  todos: Todo[],
  filter: 'OPEN' | 'DONE' | 'ALL',
}
```

## Daten aus dem state wiedergeben

Wenn Daten aus dem State benötigt werden, schreibt man dafür einen Selector. In der einfachsten Form ist es eine simple Function


```javascript
import type { State } from './reducer'

export const hasTodos = (state: State) => state.todos.length > 0

export const getAllTodos = (state: State) => state.todos

export const getTodoByIndex = (state: State, index: number) =>
  state.todos[index] || null
```

Etwas was ihr euch immer bewusst mache müsst ist, dass ihr euch überlegen müsst was der Output eines Selectors für eine Referenz hat. Damit die obige simple Selector-Form
verwendet werden kann muss folgende anweisung IMMER zutreffen:

```javascript
selector(state) === selector(state)
// bzw
selector(state, ...args) === selector(state, ...args)
```

Diese Anweisung ergibt true, wenn der output entweder ein primitiver
Value (Number, String...) ist oder wenn ein Wert des States unverändert ausgegeben wird.
Sobald man ein Object oder Array neu erstellt und ausgibt ist dies nicht mehr der Fall.
Dann muss folgendes gemacht werden:

## Daten aus dem State neu zusammenfügen

Sobald unsere `selector(state) === selector(state)` Definition false ergibt, müssen wir ein Caching aufsetzen. Der Grund ist, dass wir später anhand von Objekt-Referenzen
(automatisch) entscheiden ob sich unsere React-Component neu render muss oder nicht.
Sobald `selector(state1) !== selector(state2)` gilt, werden sich alle React-Components
neu rendern welche diesen Wert verwenden. Somit müssen wir penibel darauf achten das
wir Referenzen nur verändern wenn wir müssen. Glücklicherweise ist dieses File der
einzige Punkt wo wir darauf besonders Acht geben müssen.

Das Caching das wir aufsetzen ist recht simpel. Lest hier am besten die Doku für [createSelector](https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc). Das ist recht gut beschrieben.

```javascript
import type { State } from './reducer'
import { createSelector } from 'reselect'

export const getFilteredTodos = createSelector(
  (state: State) => state.todos,
  (state: State) => state.filter,
  (todos, filter) => {
    switch (filter) {
      case 'ALL':
        return todos
      case 'DONE':
        return todos.filter((todo) => todo.done)
      case 'OPEN':
        return todos.filter((todo) => !todo.done)
    }
  }
)
```

Diese Syntax ist anfangs etwas verwirrend. Nach einiger Übung wird das aber ziemlich
einleuchtend. Das Problem hier ist allesdings das es nur bei Daten funktioniert, welche
komplett aus dem State generiert werden. Es gibt aber auch Selectors, welche neben dem State zusätzliche Argumente empfangen:

## Daten aus dem State anhand von Argumenten neu zusammenfügen

Eine Erweiterung zu `reselect` bietet die Lib `re-reselect`. Die Idee ist ziemlich cool:
Es soll einfach ein Cache-Key generiert werden. Die Referent des Results bleibt für die
selben Argumente immer gleich, da der Wert in dem jeweiligen CacheKey gespeichert wird:

```javascript
import type { State } from './reducer'
import createReSelector from 're-reselect'

export const getTodosByFilter = createReSelector(
  (state: State) => state.todos,
  (_, filter: 'OPEN' | 'DONE' | 'ALL') => filter,
  (todos, filter) => {
    switch (filter) {
      case 'ALL':
        return todos
      case 'DONE':
        return todos.filter((todo) => todo.done)
      case 'OPEN':
        return todos.filter((todo) => !todo.done)
    }
  }
)((_, filter: 'OPEN' | 'DONE' | 'ALL') => `${filter}`)
```

Im obigen Beispiel verwenden wir den filter als CacheKey. Hierzu einfach am besten [die Doku dazu studieren](https://github.com/toomuchdesign/re-reselect).
