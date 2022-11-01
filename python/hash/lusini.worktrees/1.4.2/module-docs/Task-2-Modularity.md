<!-- # Modularity

Modularität ist das wichtigste Konzept in diesem Projekt. Sauber umgesetzt führt es dazu, dass die Gesamt-Komplexität niemals zunimmt uns somit theoretisch unendlich skalliert. Ziel ist, dass wir auch in 5 Jahren genauso schnell (wenn nicht sogar schneller) entwickeln können wir in einem Jahr. Das geht aber nur, wen wir das ausnahmslos in jeder Situation durchziehen. Das gilt für die Gesammt-Architektur genauso wie für die Fein-Implementation der App. So sollte jedes Modul, jedes Widget und jedes Feature so implementiert werden, dass es keine Annahmen über die Ausenwelt macht. Das ist viel eifacher gesagt, als getan und deswegen wird es mein Hauptziel sein, euch im Laufe dieses Jahres zu zeigen, wie man dafür vorgehen muss. Zuerst muss aber erkannt werden, wann man denn die Regeln der Modularität bricht.

Etwas Trockenes zu Anfang:

Modularität ist ein Ergebniss aus der Mathematischen Grundlagenforschung, welche sich viel mit der Korrektheit von Algorithmen beschäftigt. Modular ist etwas, das für den gleichen Input immer den gleichen Output erzeugt ohne dass Side-Effects auftreten. Ein Side-Effect ist eine Interaktion mit der Ausenwelt des Moduls. Da es meist nicht ohne Side-Effect geht gilt es diese zu isolieren und zu kontrollieren.

Hier geht es jetzt erst einmal darum zu lernen, wann man denn die Modularität verlässt. Man kann sie auf zwei Arten verlassen: kontrolliert oder unkontrolliert:

```javascript
import * as React from 'react'
import styled from 'styled-components'
import Text from './Text'

export default React.memo(function Component () {
  return (
    <Wrapper className='Component'>
      <a href='/search'>to search</a>
      <Text>Hello World</Text>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  margin: 10px;
  > ${Text} {
    padding: 10px;
  }
`
```

In obigen Beispiel passieren einige Ausbrüche aus der Modularität.  -->
