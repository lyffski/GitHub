# Organisms

Organismen sind unabhängige Applikationen welche mithilfe von Fireside konfiguriert und positioniert werden können. Sie bekommen während der Bootstrap-Phase Server-Zufriff (controller.ts) und können dort ihre Konfigurationsdaten aufbereiten und anreichern. Die Konfigurationsdaten werden in der `*.story.ts` Datei definiert

In Organismen kann man machen was man will solange es keinen Einfluss auf die Außenwelt hat. Folgende Files können existieren:

- **[Component].ts**: Die eigentliche Komponente wo alles zusammenläuft
- **controller.ts**: Hier kann der Organismus Code serverseitig (bootstrap-phase) ausführen.
- **[Component].story.ts**: Hier werden die Konfigurationsdaten definiert, welche dann in der Fireside-App gesetzt werden können
- **types.ts**: Jeder Organismus benötigt dieses File. Es müssen mindestens `UserConfig` und `Props` exportiert werden. Falls es ein `controller.ts` gibt und ein `createContext` implementiert ist muss ebenfalls ein `Context` type exportiert werden.
- **actions.ts**: Organismen haben die Möglichkeit events zu feuern wie z.b wenn ein button geklickt wird oder wenn der Organismus in den Viewport kommt. dies ist vor allem nützlich für tracking rules.
- **hooks/[hook].ts**: die hooks der Komponente
- **utils/[util].ts**: utility funktionen der Komponente
- **README.md**: firescout-dokumentation
- **[Component].test.md**: cypress tests
- **Sub-Components**: Sub-Komonenten können als weitere Folder-Components erstellt werden
