# AB-Testing

## Css-AB-Testing

**Technische Umsetzung**: In dem plugin [a-b-test](../plugins/a-b-test/gatsby-ssr.js) bekommt der html `body` tag die Klasse "ab-mode-a" oder "ab-mode-b". der "A" mode ist immer der bisherige Stand; der "B" mode enthält das zu testende Feature. Das zu testende Feature kann dann mittels css angezeigt (B) oder ausgeblendet (A) werden:

```css
> .my-test {
  display: none;
}

body.ab-mode-b & {
  > .my-test {
    display: block;
    height: 200px;
    background: steelblue;
  }
}
```

Man beachte hier, dass die zu testende Komponente initial immer auf "display:none" steht. nur wenn dder body die klasse "ab-mode-b" hat bekommt die komponente einen "display:block". Falls irgend was schief läuft (z.b ab-plugin deaktiviert) würde hier kein fehler passieren (nur der b-mode würde einfach nicht gezeigt werden). Bitte immer dieses Schema verwenden.

**Wann wird diese Variante verwendet**: Sobald es sich um einen "simplen" Ab-Test handelt; sprich mit reinem css lösbar ist (anzeigen/ausblenden von inhalten)
**Tracking**: Jeder Page-Visit Event enthält das Feld `ab-mode` wo der branch-name steht. entweder `a` oder der `b` in dem das neue Feature enthalten ist

## Branch-AB-Testing

`!!! der branch muss IMMER den exakt selben stand haben wie der main branch + dem entwickelten feature !!!`

**Technische Umsetzung**: 
- Es wird ein eigener Branch erstellt in welchem das Feature entwickelt wird. 
- In dem land, wo der abtest stattfindet muss in der config der asset prefix geändert werden auf `/assets-{branchname}`. 
- in der splah-page repo muss eine neue redirect-rule erstellt werden: `/assets-{branchname}/{de-de}/*            https://{branchname}--{de-de}-lusini-com.netlify.app/{de-de}/:splat  200`



Sobald man auf Netlify das [Split-Testing](https://docs.netlify.com/site-deploys/split-testing/) aktiviert ist der Ab-test live

**Wann wird diese Variante verwendet**: Alles was ein normaler Css-Ab-Test nicht handeln kann
**Tracking**: Jeder Page-Visit Event enthält das Feld `ab-branch` wo der branch-name steht. entweder `main` oder der jeweilige name in dem das neue Feature enthalten ist

### Cleanup

Bei Beendigung des AB-Branch-tests mus folgendes passieren:
- splitttesting muss auf netlify wieder deaktiviert werden
- asset-prefix in der config muss wieder auf `/assets-main` gestellt werden
- redirect-rule muss entfernt werden
- branch kann dann gemerged/verworfen werden


### Info

- In den Dev-Configs ist der asset-path immer leer, weil wir damit unsere previews bauen und die end-url nicht kennen