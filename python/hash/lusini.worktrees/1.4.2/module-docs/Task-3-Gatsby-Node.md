## Gatsby Node

Gatsby Node erstellt den Graphql-Layer der das Grundgerüst der App ist. Folgend werden einige Aufgaben gestellt um etwas mehr mit Gatsby vertraut zu werden. Bitte kein Gatsby plugin für eure Aufgaben verweden. Ihr sollt euch erst mal mit den nativen methoden von gatsby vertraut machen

### Daten-fetch und in den Graphql Layer schieben

Folgend die Api, wo ihr eine liste von random erstellt Kundendaten aufrufen könnt:
https://randomuser.me/api/?results=500&seed=foobar

Erstellt einen neuen Graphql Type User der den selben Shape aufweist wie die erhaltenen users. Hier könnte die `sourceNodes` api hilfreich sein

### Daten auslesen und anzeigen

Erstellt dynamisch für jeden User eine eigene page unter `/user/{username}`. Es soll eine simples Profil mit Name und Bild des Users dargestellt werden. Hierfür ist die `createPages` api nützlich.

### Übersicht aller user erstellen

Erstellt eine page `/users` welche alle users auflistet. Diese sollte paginiert sein sodass lediglich 50 user auf einer seite sind. Url-Schema:

Seite-1: `/users`
Seite-2: `/users/2`
Seite-3: `/users/3`

Bitte hierfür kein Plugin von gatsby verwenden. Sinn ist es, dass ihr euch mit dem Graphql layer von gatsby vertraut macht. ein plugin bringt keinen lernerfolg.
Jede liste sollte natürlich auch serverseitig gerendert werden können

### Graphql Schema manipulieren

Wir wollen für jedes user-bild eine base64 version bereit stellen. also sollt ihr den User-type so manipulieren dass er einen neuen key `user.base64` hat welcher das bild in kleiner variante (z.b 16px breite) als base64 string hat. Nutzt hierfür die `createSchemaCustomization` api her.

Falls ihr den hook `useLazyImgSrc` aus der Hook Aufgabe gemeistert habt, verwendet diesen um die Bilder in der User-Liste lazy zu loaden
