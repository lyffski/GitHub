# Collection Request Interface

## Wann soll ich das benutzen?

Wenn wir Daten fetchen wollen, welche anhand von einem oder mehreren Filtern identifiziert werden können

## Regeln

- Es muss das [Request Interface](./request.md) implementiert werden
- Es muss einen Type `FilterValues` geben
- Es muss einen Type `FilterOptions` geben
- Es muss einen Action-Creator `init` geben (mit Action-Type `INIT`)
- Der State muss einen Key `filterValues` enthalten
- Der State muss einen Key `resetFilterValues` enthalten
- Der State muss einen Key `filterOptions` enthalten
- Es muss eine Rule `[module-name]/FETCH` geben
- Es muss eine Rule `[module-name]/TRIGGER_FETCH` geben
- Jede Filter-Value braucht eine Action (TOGGLE oder SET)
