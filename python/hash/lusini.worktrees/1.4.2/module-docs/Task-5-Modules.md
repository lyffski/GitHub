# Modules

Module, soweit wir sie bis jetzt verstehen, managen unseren globalen Redux-State. Folgend werden einige Aufgaben gestellt um das Wissen rund um Module zu festigen

nützliche Ressourcen um Redux zu lernen:

- https://egghead.io/series/getting-started-with-redux
- https://www.smashingmagazine.com/2016/06/an-introduction-to-redux/
- http://devguides.io/redux/

## Verwendung useres bisherigen Moduls

Zunächst wollen wir mit unserem bisherigen Modul arbeiten. Erstellt bitte eine neue (dynamische) Route `config`. Diese Route beinhaltet ein Formular wo man eine Snackbar-Message generieren kann. Es soll ausgewählt werden können zwischen `info`, `warning`, `error` oder `success` (radio-buttons). Zusätzlich soll ein label gesetzt werden können. Schickt man das Formular ab so soll die action `snackbar/ADD_MESSAGE` gedispatched werden.

Bitte styled die Snackbar auch noch entsprechend. setzt eine (für den typ) angemessene Hintergrundfarbe und zeigt das richtige Icon. Hierfür bitte die lib `react-icons` verwenden. eine Übersicht aller Icons seht ihr [hier](https://react-icons.netlify.com/#/)

## Eigenes Modul erstellen

Zukünftig wollen wir viele `_core` Widgets auch global steuern können. so wollen wir z.b den Cart Drawer ausfahren wenn der user Produkte in den Warenkorb legt. Deshalb ist es eure Aufgabe ein `ui` Modul zu erstellen. der default state des reducers ist ziemlich simpel:

```javascript
type State = {
  cartOpen: boolean,
}
```

Erstellt um diesen State herum entsprechende ActionTypes, Actions und hooks. Ihr könnt euch hier von unserem Snackbar Modul inspirieren lassen (bitte kein copy-paste).

Schließlich erstellt ein core Widget `CartDrawer` (so wie bei vega) welcher ausggeklappt ist, wenn `cartOpen` auf true ist. Dieses Widget beinhaltet einen Button `schließen` welcher den Drawer wieder schließt
In der vorher definierten Config Route baut ihr einen Toggle welcher die Cart öffnen kann

## Modul erweitern

_Bitte schließt erst die obere Aufgabe ab bevor ihr diese angeht. Nicht aus Zeitersparniss beide gleichzeitig machen. Der Grund ist, dass ihr ein Verständniss entwickelt sollt, wie man Module erweitert_

Wir können unseren Cart toggeln :) aber warum da aufhören? Auf mobilen Endgeräten ist es üblich, dass die Navigation über einen Drawer abgebildet wird. Klickt man im Header auf einn Burger-Menu so fährt der Drawer (mit einem Overlay) aus. Auch das macht Sinn in einem Redux-Context abzubilden um das Ausfahr-Verhalten von überall aus zu steuern. Erweitert euren State zu folgendem Shape:

```javascript
type State = {
  cartOpen: boolean,
  navigationOpen: boolean,
}
```

Implementiert alles Nötige damit euer `useNavigationStatus` hook funktioniert. Baut das Widget `MobileNavigation` und fügt in das Header Widget ein BurgerMenu ein, welches die Navigation öffnen kann

## Reducer verbessern

lest euch mal die doku zu `immer.js` durch und schreibt euren reducer + den snackbar reducer so um, dass er mit immer.js funktioniert.
