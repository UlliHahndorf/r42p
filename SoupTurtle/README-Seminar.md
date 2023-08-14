# React Webinar - Teil 1

## Links
- Offizielle Webseite: https://react.dev/
- Next (React client- und serverseitig): https://nextjs.org/
- https://remix.run/
- https://www.gatsbyjs.com/
- Statistiken über NPM Pakete: https://npmtrends.com/
- React Changelog: https://github.com/facebook/react/blob/main/CHANGELOG.md
- https://github.com/facebookarchive/codemod
- React Erweiterungen: https://github.com/brillout/awesome-react-components
- Initialisierung
  - https://create-react-app.dev/
  - https://vitejs.dev/
- Cartoon intro to react fiber: https://www.youtube.com/watch?v=ZCuYPiUIONs
- Renderer
  - React-DOM: https://www.npmjs.com/package/react-dom
  - https://reactnative.dev/
  - https://github.com/vadimdemedes/ink
  - https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
- Klassenkomponenten (NICHT VERWENDEN!): https://react.dev/reference/react/Component
- Thinking in React: https://react.dev/learn/thinking-in-react
- CSS Präprozessoren z.B. https://sass-lang.com/
- Tailwind (utility first css): https://tailwindcss.com/

## Setup
1. `npm create vite@latest 01-basics -- --template react-ts` => Scafffolding - erzeugen der Projektstruktur
2. `cd 01-basics` - ins Projektverzeichnis wechseln
3. `npm install` - Abhängigkeiten installieren
4. `npm run dev` - Startet die Applikation im Development Modus

## Components vs Elements
- Komponenten sind Funktionen in React die eine JSX-Struktur zurückgeben
- Komponenten beginnen mit einem Großbuchstaben
- Elemente sind Bausteine die auf native UI-Elemente referenzieren z.B. div im Browser

## JSX
- statt `class` `className` Attribut
- statt `for` `hmtlFor` Attribut nutzen

## Styling
- inline styles nur sehr sparsam und nur für punktuelle und dynamische Fälle
- CSS Import gilt global!
- CSS Modules liegen in Dateien die auf *.module.css enden. CSS Modules schaffen einen eigenen Namespace - verhindern globale Styles
- Präprozessoren: https://vitejs.dev/guide/features.html#css-pre-processors

# React Webinar - Teil 2

## Links
- Rules of Hooks: https://react.dev/warnings/invalid-hook-call-warning
- Context: https://react.dev/learn/passing-data-deeply-with-context
- Reducer Hook: https://react.dev/reference/react/useReducer
- Flux Standard Action: https://github.com/redux-utilities/flux-standard-action
- Immutability: 
  - https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
  - https://github.com/kolodny/immutability-helper
  - https://immerjs.github.io/immer/
  - https://immutable-js.com/
- Form libraries:
  - https://www.react-hook-form.com/
  - https://formik.org/
- Class Names (CSS classen): https://github.com/JedWatson/classnames

## Custom Hooks
1. Hook-Funktion mit "use" Präfix definieren (eigene Datei!)
2. Funktionalität identifizieren die ausgelagert werden soll, ausschneiden und in die Hook Funktion einfügen
3. import statements fixen
4. Herausfinden was in der Komponentente fehlt
5. Custom Hook ggf. parametrisieren (wenn Infos von außerhalb benötigt werden z.B. Props)
6. Die fehlenden Elemente im Custom Hook zurückgeben
7. Custom Hook importieren und einbinden

# React Webinar - Teil 3

## Links
- Cross-Env: https://www.npmjs.com/package/cross-env
- Material Design: https://m3.material.io/
- Material-UI: https://mui.com/
- Material-UI Github: https://github.com/mui/material-ui
- Material Icons: https://mui.com/material-ui/material-icons/
- React Router: https://reactrouter.com/en/main
- Data Fetching Libraries
  - SWR: https://swr.vercel.app/
  - React-Query: https://tanstack.com/query/latest
- https://www.npmjs.com/package/react-spinners
- I18N: https://github.com/i18next/react-i18next
- https://react.dev/reference/react/lazy
- https://github.com/bvaughn/react-window

## Installation von Mui
1. Pakete installieren: `npm install @mui/material @emotion/react @emotion/styled`
2. Roboto Schrift installieren: `npm install @fontsource/roboto`
3. Schriftart css in main.tsx einbetten
4. Icons installieren `npm install @mui/icons-material`

## React router
1. `npm install react-router-dom`
2. In einer zentralen Komponente z.B. App
   1. `<BrowserRouter>` einfügen
   2. `<Routes>` einfügen
   3. `<Route>` Routendefinitionen einfügen

## Installation von i18next
1. Pakete Installieren `npm install i18next i18next-browser-languagedetector i18next-http-backend react-i18next`
2. i18n.ts anlegen für Initialisierung
3. Datei Einbetten und übersetzen!

# React Webinar - Teil 4

## Links
- Redux Webseite: https://redux.js.org/
- You might not need redux: https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367
- Redux Toolkit: https://redux-toolkit.js.org/
- https://github.com/redux-utilities/flux-standard-action
- Redux Middleware
  - Thunk: https://github.com/reduxjs/redux-thunk - Standardmiddleware für redux toolkit, arbeitet mit Promises
  - Saga: https://redux-saga.js.org/ - arbeitet mit Generators
  - Observable: https://redux-observable.js.org/ - arbeitet mit RxJS

# React Webinar - Teil 5

## Links
- Testframeworks:
  - Mocha (Testframework) https://mochajs.org/
  - Chai (Assertion Library) https://www.chaijs.com/
  - Sinonjs (Test Doubles) https://sinonjs.org/
  - Jasmine (Testframework) https://jasmine.github.io/
  - Testrunner: https://karma-runner.github.io/latest/index.html
  - Jest (Testframework) https://jestjs.io/
  - Vitest (Testframework) https://vitest.dev/
  - Vergleich: https://npmtrends.com/jasmine-core-vs-jest-vs-mocha-vs-vitest 
- jsdom: https://github.com/jsdom/jsdom
- Testing Utils
  - Historisch: Enzyme https://enzymejs.github.io/enzyme/
  - React Testing library: https://testing-library.com/docs/react-testing-library/intro/
  - MSW - Mock Service Worker https://mswjs.io/
- E2E Testing frameworks: 
  - https://www.cypress.io/
  - https://playwright.dev/
- Code Coverage: https://vitest.dev/guide/coverage.html
## Setup
- vite.config.ts anpassen
- test/setup.ts anlegen und konfigurieren
- npm install -D @testing-library/react @testing-library/jest-dom jsdom
- package.json => test-script

## Playwright tests
- bitte gegen die Applikation in 04-redux laufen lassen. Achtung die data-testid properties müssen existieren