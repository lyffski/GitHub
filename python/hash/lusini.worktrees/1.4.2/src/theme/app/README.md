# Apps

Wie der Name schon sagt sind Apps eigenständige Applikationen in unserem Shop. Diese werden alle im [Layout](../../containers/Layout) eingebunden (async oder sync).

Neben Header und Footer gibt es vor allen Apps, welche conditional-visible sind. Beispiele hierfür sind z.b eine Sidebar, Cart-Flyout, Product-Modal... Wichtig dabei ist folgendes:

> Jede App hat einen (oder mehrere) Flags im ui-modul. Über diesen Flag können andere Komponenten dann Einfluss auf die App haben (anzeigen/ausblenden)

Für eine Product-Modal App (kann Produkt als Modal anzeigen) gebe es z.b im ui-modul ein feld `productModalId` mit der Produkt-Nummer des anzuzeigendes Produktes.

Apps sind sehr ähnlich wie `partials`. Der Unterschied ist die obige Regel. Partials haben keinen Flag im ui-modul. Wie soll ich also entscheiden ob ich meine Komponente als App oder als Partial implementieren soll? Partials leben komplett eigenständig (durch ihre Rules). Andere Komponenten haben keinerlei Einfluss auf einen Partial. Apps dagegen sind sind selbst-gesteuert. Sie werden von anderen Komponenten (durch das ui-modul) immer getriggert.

> Apps müssen alle Firescout-Dokumentation und Tests haben
