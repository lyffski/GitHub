# Modul Struktur

Der zentrale Baublock der RLX-Struktur ist das Widget. Ein Widget kümmert sich um die Darstellung und Berechnung eines bestimmten Features (von einem simplen Button bis hin zu einem komplexen Product-Listing mit Filtern). Hierbei ist es besonders wichtig immer die Modularität im Hinterkopf zu haben. Einem Widget ist es nicht erlaubt Daten zu berechnen welche nichts mit dem Widget zu tun haben oder auf Daten eines anderen Widgets zuzugreifen. Für solche Fälle gibt es Module.

Diese Module sind teilweise sehr vielfältig in ihren Aufgabengebieten:

- verwalten geteilten State von Widgets
- binden externe Apis und Scripte an
- können Gatsby-Plugins anbinden

Wichtig zu verstehen ist, das sich ein Modul um genau eine Aufgabe kümmert. Typische Module wären:

- **user**: verwaltet den aktuellen user-status. bietet eine api für login, logout, register und verwaltet user-relevanten inhalt wie z.b den cart oder die produkte auf der wishlist
- **browser**: verwaltet browser-relevanten state wie z.b die aktuelle browser-size oder das navigieren
- **onesignal**: bindet das script `onesignal` ein welches die push-notifications managed
- **ui**: verwaltet den ui-state (ob z.b die mobile-navigation im header gerade ausgeklapt ist)

Module unterliegen ebenfalls den Gesetzen der Modularität. D.h sie müssen so entwickelt werden das sie absolut nichts von anderen Modulen oder ihren genauen Kontext in dem sie eingesetzt werden wissen. jeglicher import außerhalb des modules (oder des globalen utils folders) ist absolut tabu!

## Aufbau

folgende Files sind innerhalb eines Moduls erlaubt:

- **hooks/[hook].ts**: Hier wird die API für die React Components definiert. [mehr Infos](./files/hooks_hook_ts.md)
- **utils/api.ts**: Api Endpunkte und andere Module-Side-Effects werden nur hier definiert. [mehr Infos](./files/utils_api_ts.md)
- **utils/[util].ts**: Utilities sollen wiederverwendbare Methoden sein, welche mehrere Files benötigen oder evt exportiert werden müssen (damit sie von features verwendet werden können). [mehr Infos](./files/utils_util_ts.md)
- **actions.ts**: Hier werden alle action-creators exportiert [mehr Infos](./files/actions_ts.md)
- **const.ts**: Ein Modul exportiert Constants wie zb action-types oder modul-speziefische feste Werte (zb media-breakpoints für das browser-modul). [mehr Infos](./files/const_ts.md)
- **index.ts**: Der Einstiegspunkt in das Modul von außerhalb [mehr Infos](./files/index_ts.md)
- **reducer.ts**: Client-Datenbank für variablen State [mehr Infos](./files/reducer_ts.md)
- **rules.ts**: Steuert den Datenfluss innerhalb des Moduls [mehr Infos](./files/rules_ts.md)
- **selectors.ts**: API für das Lesen der Client-Datenbank [mehr Infos](./files/selectors_ts.md)
- **types.ts**: Alle Entitäten werden hier definiert. [mehr Infos](./files/types_ts.md)
- **\_\_plugin**: Erkennungsmerkmal dass das Modul das DOM beeinflusst [mehr Infos](./files/__plugin_ts.md)

## Interfaces

- **Request Interface**: Ermöglicht dem Modul externe Apis und andere Side-Effects anzusprechen. [mehr Infos](./interfaces/request.md)
- **Entity Request Interface**: Erlaub es, dass man Remote-Daten anhand eines Identifiers fetchen kann. Benötigt immer das Request Interface. [mehr Infos](./interfaces/entity_request.md)
- **Collection Request Interface**: Erlaubt es, dass man eine Liste von Entitäten mithilfe von Filtern fetchen kann. Benötigt immer das Request Interface. [mehr Infos](./interfaces/collection_request.md)
- **Record Interface**: Ermöglicht das mehrere Komponenten denselben Reducer glechzeitig mit unterschiedlichen States verwenden können. [mehr Infos](./interfaces/record.md)
- **Testing Interface**: Erlaubt es das Api-Calls während des Testens gemocked werden können. Macht nur Sinn in Verbindung mit dem Request Interface. [mehr Infos](./interfaces/testing.md)

## Vorgehen

Zuerst sollte man die [types](./files/types_ts.md) definieren. Hier sollte sehr sorgsam vorgegangen werden, da die Stärke dieser Types maßgeblich für die Stabilität des Moduls verantwortlich sind.

Anschließend sollten die [Konstanten](./files/const_ts.md) definiert werden. Jegliche Interaktion mit dem Modul sollte in einem Action-Type definiert werden. Jegliche asynchrone Interaktion mit Request Action-Types

Falls es asynchrone Interaktionen gibt sollte nun die [API](./files/utils_api_ts.md) erstellt werden

Nun ist es Zeit die [Actions](./files/actions_ts.md) zu erstellen.

Anschließend noch die [rules](./files/rules_ts.md)

Danach kommt der [Reducer](./files/reducer_ts.md)

Nun erstellen wir unser [index.ts](./files/index_ts.md)

Als letzen Step erstellen wir unsere [hooks](./files/hooks_hook_ts.md) und [selectors](./files/selectors_ts.md) parallel (selectors werden nach den Bedürfnissen der Hooks erstelllt). Nicht vergessen die erstellten Hooks dann mit in das index.ts file aufzunehmen.

## Refactoring

WIP
