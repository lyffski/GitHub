import * as k from '@kaminrunde/storybook-addon-fireside'
import Component from './Markdown'
import controller from './controller'

export default {
  title: 'documentation',
  component: null,
}

export const MarkdownDocumentation = k.create(
  'Markdown',
  Component,
  [
    k.constant('gridArea', '', 'Markdown'),
    k.constant('centered', '', false),
    k.markdown(
      'md',
      'Markdown',
      `+++box
+++Wilkommen auf der Markdown Dokumentation. Dieser Text dient als Referenz für alle Features die in Markdown möglich sind. fehlt euch ein Feature? Einfach beim Entwicklerteam melden, wir können so ziemlich alles implementieren was ihr euch wünscht.+++
+++

## ÜBERSCHRIFTEN

---
Das obige ist eine **h2** (erkennbar durch die zwei "#"). Das ist die höchst-möglich Überschrift die ihr setzen könnt. Darüber gibt es zwar noch eine **h1**; diese wird aber immer auf den jeweiligen page-typen von der App gesetzt, da es diese nur ein einziges Mal geben darf (SEO)

Darüber hinaus gibt es noch die **h3** und die **h4** Überschrift:

## H2 - Überschrift
### H3 - Überschrift
#### H4 - Überschrift

++space

Überschriften sollen primär den Zweck erfüllen das Dokument zu strukturieren. Aber auch der Google Bot (SEO) orientiert sich stark an Ihnen. Deswegen ist es überaus wichtig, das die Strukturierung korrekt ist. D.h auf keinen Fall eine **h4** unterhalb von einer **h2** schreiben. Immer die Ordnung einhalten sonst gibt es SEO Probleme: 

h2 -> h3 -> h4

## Abstände

In seltenen Fällen ist es nötig das künstliche Abstande erzeugt werden sollen um z.b Inhalte besser trennen zu können.
Dies geht folgendermaßen:

++space
++space
++space
++space


## Tabellen

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

Bei allen sollte die volle Breite verwendet werden, damit ein sauberes Scrollverhalten bei kleineren Größen gegeben ist.


## Emphasys

---
**Fett** und *kursiv* dient vor allem der Hervorhebung wichtiger Text-Bereiche. Ist etwas super wichtig gibt es noch die +++richtig fette Schreibweise+++

## Links

---
Über [Links](/) kann der Kunde zu anderen Seiten navigieren. Hier unterscheidet man zwischen drei verschiedenen Link-Typen:

- [externe Links](https://www.google.com) navigieren zu externen Seiten und sollten immer die komplette Url enthalten
- [interne Links](/sale) navigieren zu internen Seiten. Ganz wichtig: **IMMER MIT EINEN "/" BEGINNEN UND DIE DOMAIN WEGLASSEN**
- [Dokument-Links](#berschriften) verlinken auf Überschriften innerhalb der selben Seite. Sie beginnen immer mit einer Raute (#) gefolgt von dem Namen der überschrift (alles klein geschrieben). Gibt es einen Umlaut in dem Namen so wird der einfach weggelassen. Ist der Name z.b **Überschriften** so kann man darauf mit **#berschriften** verlinken. Ist der Name **Headline** so lautet der Link **#headline**

## Buttons

- es kann ein Button erstellt werden der das Onetrust Info-Modalfenster öffnet <oneT> Buttonlabel </oneT>

## Listen

---
- Nicht numerierte liste level 1
- Nicht numerierte liste level 1
  - Nicht numerierte liste level 2 (eingerückt mit Tabulator)
- Nicht numerierte liste level 1

1. Numerierte liste level 1
2. Numerierte liste level 1
  1. Numerierte liste level 2
3. Numerierte liste level 1
    

## Hervorhebungen


---
> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet

+++box
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
+++

## Schlusswort

---
Die Macht von Markdown liegt darin, dass diese Stile beliebig miteinander kombinierbar sind:

+++box
+++Infobox / Citation: Maecenas sed diam eget risus varius blandit sit amet non magna. +++

In unserem Ratgeber für nachhaltige Einwegprodukte finden Sie weitere alternative Materialien für Einwegprodukte!

+++[jetzt lesen ->](/page/einweg-produkte)+++
+++

will man z.b ein Inhaltsverzeichnis generieren so könnte man das so machen:

+++box
1. +++[Überschriften](#berschriften)+++
2. +++[Emphasys](#emphasys)+++
3. +++[Links](#links)+++
4. +++[Listen](#listen)+++
5. +++[Hervorhebungen](#hervorhebungen)+++
6. +++[Schlusswort](#schlusswort)+++
+++

Dieses Inhaltsverzeichnis kann man dann in Fireside an beliebiger Stelle positionieren. Auf diese Weise kann man dann sehr interessante Layouts erstellen



++space
++space
++space
++space`,
      {}
    ),
    k.select('imagePosition', 'Position', 'left', {
      tab: 'Image',
      options: [
        { label: 'left', value: 'left' },
        { label: 'right', value: 'right' },
      ],
    }),
    // @ts-expect-error
    k.select('imageWidth', 'Width', 40, {
      tab: 'Image',
      options: [
        { label: '30%', value: 30 },
        { label: '40%', value: 40 },
        { label: '50%', value: 50 },
      ],
    }),
    k.string('imageSrc', 'Src', '', { tab: 'Image' }),
    k.string('imageLink', 'Link', '', { tab: 'Image' }),
    k.string('imageAlt', 'Alt Text', '', { tab: 'Image' }),
    k.string('imageCaption', 'Caption', '', { tab: 'Image' }),
  ],
  controller
)
