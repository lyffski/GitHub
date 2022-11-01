import * as React from 'react'

type Item = {
  id: string
  component: any
  className?: string
}

type GlobalSetItems = (cb: (items: Item[]) => Item[]) => void

let globalSetItems: GlobalSetItems | null = null
const cache: Item[] = []

export function add(id: string, component: any) {
  if (globalSetItems) {
    globalSetItems((items) => [...items, { id, component }])
  } else {
    cache.push({ id, component })
  }
}

export function remove(id: string) {
  if (globalSetItems)
    globalSetItems((items) => items.filter((item) => item.id !== id))
}

export default function Partials() {
  const [items, setItems] = React.useState<Item[]>([])

  React.useEffect(() => {
    globalSetItems = setItems
    if (cache.length) {
      setItems(cache)
    }
  }, [])

  return (
    <div id="partial-container">
      {items.map((item) => (
        <item.component key={item.id} className={item.className || ''} />
      ))}
    </div>
  )
}
