## Controll the url

Gatsby hat viel mehr zu bieten als nur die gatsby-node api und den graphql layer. Hier werden einige fortschrittliche Aufgaben gestellt, welche euer Wissen um die Gatsby-Architektur vertiefen sollen. Bevor ihr mit diesen Aufgaben startet ist es wichtig, dass ihr euch besonderst mit folgenden Themen vertraut macht:

- [Gatsby Link api](https://www.gatsbyjs.org/docs/gatsby-link/)
- [Gatsby-browser api](https://www.gatsbyjs.org/docs/browser-apis/)
- [Gatsby Plugin Erstellung](https://www.gatsbyjs.org/docs/creating-plugins/)

Folgende Aufgaben können nicht ohne tiefes Wissen in diesen APIs bewältigt werden. Wie immer sind die Aufgaben sehr projektnah gewählt. Alles was ihr hier entwickelt werdet ihr später brauchen.
Folgend werden einige Aufgaben gestellt, welche sich alle damit beschäftigen die navigierung zu kotrollieren

### Alter Link options

Mit [Gatsby Link](https://www.gatsbyjs.org/docs/gatsby-link/) kann man clientseitig zwischen navigieren. Hierfür wird die Lib [@reach/router](https://reach.tech/router) verwendet. Navigiert man zwischen zwei seiten so wird automatisch wieder nach oben gescrollt. Das ist in den allermeisten Situationen sinnvoll, aber manchmal wäre es schön, wenn wir die scroll-position halten könnten.

Entwickelt ein Plugin, welches ermöglicht, dass die Scroll-Position beibehalten wird, wenn man es will. Eine mögliche Implementierung wäre:

```javascript
function Component () {
  return (
    <Wrapper>
      {/* ... */}
      <Link to='/new-route' state={{keepScrollPosition:true}}>
      {/* ... */}
    </Wrapper>
  )
}
```

### Custom Link

Die Link Komponente so wie sie Gatsby bereit stellt ist nicht so flexibel wie wir sie haben wollen. Glücklicherweise sind wir Entwickler und wenn uns die Welt nicht gefällt wie sie ist, dann schreiben wir sie um ;) Folgende Aufgabe hat jetzt nicht direkt mit Gatsby zu tun, sondern sollte eure generellen React und JS Kentnisse testen.

Entwickelt eine eigene Link Komponente welche alle Eigenschaften des normalen Gatsby Link augweist, plus der folgenden

1: ist der `to` prop nicht defined, so soll statdessen ein `<span className='a-like'/>` gerendert werden
2: zeigt der `to` prop auf eine externe url so soll ein normaler a-tag gerendert werden und dieser a tag sollte die eigenschaft `rel="noopener noreferrer"` aufweisen
3: es sollten anchor links unterstützt werden
4: prop `withHash`: wird dieser prop gesetzt, so sollte der aktuelle hash mit in die nächste seite übernommen werden. Bin ich also auf der route `/search#q=Hose` und klicke einen "withHash" Link welcher auf `/sale` zeigt, so soll statdessen zu `/sale#q=Hose` navigiert werden

```javascript
// 1
<Link>foo</Link> // => <span className='a-like'>foo</span>

// 2
<Link to='https://www.gatsbyjs.org/'>Gatsby</Link> // => <a href='https://www.gatsbyjs.org/' rel="noopener noreferrer">Gatsby</a>

// 3
<Link to='#title-1'>zu Überschrift 1</Link>

// 4
<Link withHash to='/sale'>Sale</Link>
```

### Link + Redux

Setzt einen Redux-Store auf. Entwickelt eine Methode, damit jedesmal wenn ihr navigiert einen Action `LOCATION_CHANGE` gedispatched wird. Verwendet hierfür keine externe lib (falls es denn eine gibt). Das ist eine ziemlich knifflige Aufgabe wo ihr etwas um die Ecke denken müsst. Als Tipp für den Einstieg: gatsby-browser könnte hier helfen
