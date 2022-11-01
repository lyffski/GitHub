# types.ts

Hier werden alle Entitäten eines Moduls gelistet. Eine Entität ist ein wiederverwendbarer Type mit dem gearbeitet wird. Jedes Modul definiert seine festen Entitäten. Hier ein Beispiel für ein potenzielles User-Modul:

```javascript
export type User = {
  isLoggedIn: boolean,
  email: string,
  firstname: string,
  lastname: string,
}

export type CartItem = {
  sku: string,
  amount: number,
  productId: string
}

export type Cart = {
  items: CartItem[]
}

export namespace api {

  export type Fetch = {
    user: User
  }
}
```

Hier bedarf es etwas Übung richtig die richtigen Entitäten zu finden. Generell kann mann sich an folgende best-practices halten:

- enthält ein Type eine Liste von Objekten so soll dieses Objekt einem eigenen Type zugewiesen werden:

```javascript
// FALSCH

export type Cart = {
  items: {
    sku: string,
    amount: number,
    productId: string,
  }[],
}

// RICHTIG

export type CartItem = {
  sku: string,
  amount: number,
  productId: string,
}

export type Cart = {
  items: CartItem[],
}
```

- Types sollten wohl überlegt werden. Es sollte extrem viel Zeit darauf verwendet werden starke Types zu definieren, da Änderungen hier teuer werden können.

- types sollten dokumentiert werden. VS-Code Intellisense speichert die Doku dann am Type selber und überall wo dieser Type verwendet wird wird auch die Doku angezeigt. Dabei kann sowohl der ganze type als auch einzelne Keys dokumentiert werden:

```javascript
/**
 * The CartItem is a minimal representation of a product
 * and holds just the relevant ids + the amount
 */
export type CartItem = {
  /** Lowest level of Id. Each individual product has just one sku */
  sku: string,
  /** the current amount in cart */
  amount: number,
  /** container id for a collection of sibling skus */
  productId: string,
}
```

## Api types

Falls das Modul das [Request Interface](../interfaces/request.md) implementiert müssen hier auch die types für die api definiert werden:

```javascript
export type User = {
  isLoggedIn: boolean,
  email: string,
  firstname: string,
  lastname: string,
}

export namespace api {

  export type Fetch = {
    user: User
  }
}
```
