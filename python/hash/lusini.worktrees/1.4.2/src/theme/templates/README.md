# Templates

Templates sind der Einstiegspunkt für unsere Routes. Die Routes werden in [gatsby-node](../../../gatsby-node.ts) definiert (_createPages_). Man unterscheidet zwei Arten von Templates:

## File-Templates

Dies ist das häufigste Template. Gemeint sind diejenigen welche als File (nicht als Folder) definiert sind. Typischerweise rendern sie immer eine Story. Optional können sie noch über oder unterhalb der Story statische Inhalte darstellen.

File-Templates dürfen unter keinen Umständen statefull sein. d.h `setState` und Daten aus dem Redux-Store beziehen ist verboten. Falls dies doch passiert kann es zu bösen Performance-Problemen führen, da ein Update ALLES (Header, Story, Footer) updated. Die gesamte Performance-Architektur baut darauf auf, das File-Templates sich nich updaten können

Falls es doch unbedingt nötig ist muss das File-Template in ein Folder-Template umgewandelt werden sodass der State-Update als Sub-Komponente implementiert werden kann. Auf diese Weise rendert sich das Template nicht neu

> File-Templates besitzen weder Firescout-Dokumentation noch Tests

## Folder-Template

Folder-Templates sind in der Regel eigene Apps wie z.b der Cart oder die PDP. Wie bei File-Templates gilt auch hier das die Haupt-Komponente state-less sein musss. Also kein `setState` oder Daten aus dem Redux-Store. Nur Sub-Komponenten dürfen dies. Also ist die Architektur so zu wählen, dass dies nicht passiert.

> Folder-Templates müssen alle Firescout-Dokumentation und Tests haben
