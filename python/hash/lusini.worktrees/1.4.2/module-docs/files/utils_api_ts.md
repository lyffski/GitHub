# utils/api.ts

Diese Datei ist der einzige Ort wo euer Modul Side-Effect praktizieren darf. Somit ist dies der einzige Ort wo ihr mit der Außenwelt kommunizieren dürft wie etwa APIs anfragen:

```javascript
// cart/utils/api.ts
import * as t from '../types'

export async function fetch(): Promise<t.api.Fetch> {
  // implementation
}

export async function addItem(item: t.RawItem): Promise<t.api.AddItem> {
  // implementation
}

export async function removeItem(item: t.CartItem): Promise<t.api.RemoveItem> {
  // implementation
}

export async function updateItem(
  item: t.CartItem,
  amount: number
): Promise<t.api.UpdateItem> {
  // implementation
}
```

Für jede exportiere Funktion wird ein eigener Return-Type deklariert welcher aus der [types.ts](./types_ts.md) importiert wird. Durch diesen Type ist es möglich, dass die api modularisiert wird. Dies ist wichtig für das [Testing Konzept](../interfaces/testing.md) und beschützt unsere [Request Actions](../interfaces/request.md) davor genaue Details von der API wissen zu müssen.
