# Unit-Testing

Wir testen mit Jest und Firescout. Um die Types zu erstellen müssen wir nach code-changes ein `npm run firescout` ausführen. Dadurch wird das file `./firescout.d.ts` erstellt. 

## Was muss getestet werden

- Alle firecsout-states
- komplexe funktionalitäten (z.b komplexe utility funktionen)

## Test-Aufbau

Wenn wir nicht-React-Komponenten testen importieren wir die Funktion, führen sie mit unseren Argumenten aus und machen Annahmen über das Ergebniss:

```javascript
import myFunction from './my-function'

describe('my-function', () => {
  it('can do something', () => {
    const result = myFunction('foo')

    expect(result).toBe('bar')
  })
})
```

React-Komponenten werdenn über den Test-Helper erstellt:

```javascript
import { RenderFactory } from 'utils/test-helper'
import MyReactComponent from './MyReactComponent'

describe('path/to/MyReactComponent', () => {
  const factory = new RenderFactory(MyReactComponent, {
    myProp: 'foo',
    myCb: () => null
  })

  // reset all mocks befor each test
  beforeEach(factory.clearMocks)

  it('renders', async () => {
    // create cb-mock
    const cb = jest.fn()

    // create component
    const f = factory.create(props => {
      // manipulate default props
      props.myProp = 'bar'
      props.myCb = cb
    })

    // get Firescout Context
    const ctx = () => f.context('MyReactComponent')

    // interactions need to be async
    await ctx().handle('button').click(1) // wait 1ms for DOM update

    // check state
    ctx().shouldHaveState('show-secret')

    // check interactions
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith('bar')
  })
})
```

## Prinzipien

Das oberste Mantra lautet

`From Interaction to State-Change and Api-Call`

Das bedeutet: Wir rendern die Komponente. Dann interagieren wir mit ihr (z.b click). Schließlich machen wir einen shouldHaveState und am Schluss überprüfen wir unsere api-calls bzw jest.fn mocks. Das gilt für jeden Test.


Ein weiteres wichtiges Prinzip ist das Prinzip der `Documentation`. Das bedeutet innerhalb der Test-Funktion (also dem "it" Fall) sollen alle Informationen stehen welche für den Test-Case wichtig sind. Es ist nicht erlaubt Code auszulagern!

## FAQ

### Module-Mocking & Testing

Wir können JEDE Funktion mocken indem wir ein `@firescoutMockFn` kommentar darüber setzen. Das gibt uns einen Eintrag für die `factory.module` Funktion:

```javascript
// utils.ts

/** @firescoutMockFn utils.getData */
export async function getData () {
  return 'foo'
}

// firescout-mocks/utils/getData.my-mock.ts
export default 'bar'

// Component.spec.ts
it('works', async () => {
  const fn = await factory.module('utils').fn('getData').mock('my-mock', jest.fn)

  // ...

  expect(fn).toBeCalledTimes(1)
})
```

Wir können unter `/firescout-mocks/[module]/[fn].[name].ts` mocks definieren. Dabei sollten diese Mocks allgemein gehalten werden (so simpel wie möglich). In unserem Test können wir den Mock dann noch nach unseren Bedürfnissen anpassen: 

```javascript
factory.module('my-module').fn('fn').mock({
  fixture: 'my-fixture',
  transform: data => {
    data.prop = 'bar'
    return data
  }
})
```

**Wenn Properties aus unserem Fixture in unserem Test wichtig sind, dann müssen diese Properties explizit über die transform Methode gesetzt werden (siehe "Documentation" Prinzip)**

### Check for existence

Um einen Context/Handle/Collection auf "Existenz" zu prüfen (also ob es im DOM ist) müsssen wir folgendes Snippet verwenden:

```javascript
const ctx = () => f.context('my-context')

expect(ctx).toThrow() // ctx should not exist

expect(ctx).not.toThrow() // ctx should exist
```

### general mocking

Wir können einen "beforeEach" hook benutzen um generelle mocks, welche vor jedem test angewendet werden sollen zu erstellen:

```javascript

describe('test', () => {
  const factory = new RenderFactory(Component, {})

  // will be executed before each test
  beforeEach(async () => {
    factory.clearMocks() // is needed
    await factory.module('templates-PDP').fn('useRelatedSkus').mock('empty')
  })
})
```

### @reference

Manche Funktionen sind extrem komplex. Werden diese Funktionen in Komponenten verwendet fürt das zu sehr vielen test-fällen, was den testunleserlich macht. statdessen kann man für die Funktion einen eigenen Unit-Test machen und sie in der Komponente komplett mocken. Das wird dann im test-title über eine @refecrence angezeigt:

```javascript
it('displays the add-to-cart button when @utils/calculateDeliveryDate yields buyable')
```