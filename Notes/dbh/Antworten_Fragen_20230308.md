**Antworten auf Fragen für dbh:**
====================

![image-20230308110932710](/Users/ullihahndorf/Library/Application Support/typora-user-images/image-20230308110932710.png)

**React:**

- Welche externen Komponenten setzt dbh ein? Würde dbh diese Komponenten so wieder einsetzen.
  - ReactVirtualized (DataGrid)
  - MaterialUI  (Forms)
  - ReactRouter (Routing)
  - ReactPostify (Toaster)
  - Chakra UI (Ali Home)
- Was hat z.B. zur Entscheidung für Prime-React geführt? Welche anderen UI-Component Libraries wurden evaluiert?
  - ServerSideComponents?
  - ReactServer?
  - ReactQuery?
  - Redax?
  - SocketIO?
  - nur Hooks?
  - gleich ts anstatt js

- Gab es im Team bereits relevante Erfahrungen? Welche Erfahrungen hat dbh mit der Entwicklerlernkurve gemacht? Wie haben sich Umsteiger beim Lernen angestellt? Spezielle Schwierigkeiten bei bestimmten Komponenten.
- Gibt es Fehler, die dbh bei der Einführung von React & Co. gemacht hat? Gab es bereits Probleme, die sich mit React oder den eingesetzten Libraries nicht abbilden ließen?
- Hat sich dbh für eine Umsetzung der Komponenten als Funktionen oder als Klassen entschieden? (Ich tendiere zu Funktionen)

**Data binding:**

- Welche Technologie und (ggf) welche Libraries werden für die Kommunikation zwischen Frontend und Backend eingesetzt? Swagger backed REST? FetchAPI? (Wir denken derzeit an odata mit ODataStore-Library von DevExtreme. Gibt es bei dbh Erfahrungen?)
- Wird ein Message Broker für aktive Kommunikation zwischen Backend und Frontend realisiert? Wenn ja: Auf welcher Technologie-Basis? (Pull vs. Push)

**Deployment:**

- Wie werden bei dbh das Deployment der Backend- and Frontend-Packages synchronisiert?
- Wie hält dbh die Businessobjektmodelle zwischen Backend und Frontend synchron? Generierung von Frontend-Code?
- Welche Build Toolchains werden eingesetzt? Wurden die Node-Tools für das Frontend in die Backend-Deployment-Skripte integriert oder umgekehrt?

**Testing:**

- Testet dbh das Frontend automatisiert während der Entwicklung? 
- (Welche Tools werden zum Dev-Testing benutzt? Jest? Enzyme?)

Hilfe

- Components / Builder
- - kein Bindung

