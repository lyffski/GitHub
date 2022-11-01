# GitHub Flow

//init

## Definitionen

- `main`-branch: Dieser Branch spiegelt immer den aktuellen Live-Stand aller Shops wider.
- `develop`-branch: Hier liegen alle im kommenden Release live-zu-gehenden features und Bugfixes. Diese müssen unbedingt abgenommen worden sein und im `Deployment Ready` liegen. Diese Information kann ausschließlich durch den ProductOwner kommen. Das bedeutet: ohne explizite Bestätigung durch PO darf nichts in `develop` committet/gemerged werden. **Dieser Branch könnte also auch `next-release` heißen.**
- `release/*.*.*`: Ein release-Branch wird vor einem bevorstehenden Release aus dem `develop` heraus generiert. Dieser kann dann für eine finale Abnahme vor golive verwendet werden.

## Issues

- Ausschließlich fertig refinete Jira-Tickets dürfen in die Umsetzung gehen. Ohne priorisiertes und refinetes Jira-Ticket darf nichts getan werden!
- Jeder einzelne Issue muss einem Jira-Ticket zugewiesen sein, welches auf `Development Ready` steht.
- Wenn keine nicht-zugewiesenen (offenen) GitHub-Issues vorhanden sind, kann man selbstständig einen Issue anlegen. Dabei muss die Priorisierung in Jira beachtet werden und das Isssue muss so formuliert sein, dass ein Entwickler ohne weitere Nachfragen sofort loslegen kann. Ist dies nicht gegeben, wurde vermutlich das Refinement nicht korrekt abgeschlossen.
- Wenn möglich, nie allein an einem Issue arbeiten... Faustregel: je komplexer das Thema, desto mehr Entwickler sind nötig. Solo: fast nie!
- Bitte erst dann nach einem neuen Issue umsehen, wenn offene Themen erfolgreich abgeschlossen (`ready to merge`) wurden (Done!).
- Der Titel eines Issues folgt immer folgendem Muster: `[WDV-XXX] Technisch verständlicher Kurztitel`
- In der ersten Zeile des Issues muss ein Link auf das Jira-Ticket hinterlegt sein.

## Entwicklung (Features und Bugfixes)

### PullRequest

1. Startet man die Entwicklung eines Issues, setzt man sich und seine(n) Mitarbeiter als Assignee zu
2. Es wird aus dem `develop` ein neuer Feature-Branch erstellt mit dem Schema: `WDV-XXX_ganzKurzAberPrägnant`
3. Nach dem ersten commit in diesen Branch (möglichst zeitnah!!) bitte diesen direkt pushen und einen PullRequest anlegen
   1. Durch einen bevostehenden PR wird gekennzeichnet, dass dieser Issue in Bearbeitung ist
   2. Es muss einen commit gebebn, welcher sich irgendwie von `develop` unterscheidet, damit ein PR erstellt werden kann
   3. Bei größeren Themen könnte hier also ein "kommentar-commit" Sinn machen
4. Der PullRequest wird gegen `develop` geöffnet
5. Der Titel des PR folgt immer folgendem Muster: `[WDV-XXX] Technisch verständlicher Kurztitel`
6. Die erste Zeile der Beschreibung des PR lautet: `closes #issueNr`

### Commits und Merges

- Dauert die Entwicklung dieses Features/Bugs mehrere Tage, empfiehlt es sich, vor jedem Arbeitsbeginn 1-2 mal täglich den `develop` in seinen aktuellen Entwicklungs-Branch zu mergen.
- Jeder in sich abgeschlossene Arbeitsschritt sollte einen weiteren commit verursachen
- Commit-Messages sollten möglichst aussagekräftig sein
- Bei komplexeren commits könnte eine beschreibung (durch cmd-enter) Sinn machen

### Abschluss

- Ist die Entwicklung aus Sicht der Devs abgeschlossen, muss von ihnen allen nochmals - AUCH MOBILE - getestet werden.
- Die Funktionsfähigkeit wird nochmals mit den Anforderungen aus dem Issue abgeglichen
- Anschließend wird ein `requesting review` label an den PR gesetzt - dieser startet die automatisierten Tests
- Nach einigen Minuten muss geprüft werden, ob die Tests alle erfolgreich waren
- anschließend kann der PR einem Reviewer/Abnehmer (meist Manu, Tobi oder Philipp) für die technische, interne Abnahme zugewiesen werden.
- Wurde der PR technisch abgenommen, setzt der Abnehmer die Labels `netlify build:dev_de` und `ready to merge` an den PR und taggt den PR-Ersteller, damit dieser eine notification bekommt
- Nachdem das automatische Branch-Deployment abgeschlossen wurde, kann der getaggte Dev den Link und alle weiteren nötigen Informationen zur Abnahme ins Jira-Ticket posten und das `netlify build:dev_de`-Label entfernen

## Go-Live / Deployment

- Aktuell haben wir keinen zyklisch fixen Release-Zeitplan (zB "wöchentlich") sondern releasen immer proaktiv
- Sobald aus Sicht des PO eine sinnvolle Menge an umgesetzten Tickets in der `Deployment Ready` lane in Jira angekommen sind, wird dort ein Jira-Release angelegt, dieses Ticket dem Release zugewiesen und das Dev-Team darüber informiert
- Anschließend werden in GitHub die dazugehörigen PullRequests gemerged und die Änderungen somit in `develop` gesetzt
- In der `/package.json` wird die Version dieses neuen Releases angepasst (in develop gepusht)
- Diese dev-Umgebung kann dann für einen beliebige Zeit für die Release-Abnahme genutzt werden
  - Build-Link für de-de: https://lusini-deploy.netlify.app/.netlify/functions/deploy?locale=de-de
- Soll dieses neue Feature-Set live gehen, wird aus dem `develop` ein `release/*.*.*`-Branch erzeugt, mit einem dazugehörigen PullRequest gegen den `main`
- Auf GitHub kann rechts unter Releases ein neues Release aus diesem Branch angelegt werden:
  1. "Draft a new release"
  2. "Choose a tag": manuell neue release-nummer tippen und dann auf "create new tag" clicken
  3. "Target": neuer Release-Branch auswählen
  4. Auf "Auto-generate release notes" klicken
- Merge des Release-Pull Requests merged alles in `main` und startet das deployment auf allen live-Plattformen
- Nach dem golive muss dann der `main` wieder in den `develop` gemerged werden
- im `releases`-channel in Slack wird der neue Release dokumentiert

## Hotfix-Prozess

- Ein Hotfix ist nötig, wenn dringend etwas am aktuellen Live-Shop geändert werden muss, da ein Critical Bug aufgetaucht ist (der Einkaufsprozess ist gestört)
- Ein Hotfix-Branch wird aus dem `main`-branch abgezweigt und löst ausschließlich dieseS Problem
- der Hotfix-branchname hat folgende Form: `hotfix/kurzDescription`
- Aus diesem Hotfix-Branch muss wieder ein PR gegen `main` generiert werden, welcher das deployment ermöglicht (PR's gegen main müssen immer von einer weiteren Person ge-reviewt werden)
- Nach dem golive muss dann der `main` wieder in den `develop` gemerged werden
