# IT Helpdesk Portal

This project is a Vite + React portal configured for GitHub Pages.

## Lokale Entwicklung

1. Stelle sicher, dass Node.js (>= 18) und npm installiert sind.
2. Installiere die Abhängigkeiten mit `npm install`.
3. Starte die Entwicklungsumgebung mit `npm run dev`.
4. Erzeuge einen Produktions-Build mit `npm run build`.
5. Prüfe den Build optional lokal mit `npm run preview`.

## Automatische Bereitstellung auf GitHub Pages

Ein GitHub Actions Workflow (`.github/workflows/deploy.yml`) baut das Projekt
und veröffentlicht den `dist/`-Ordner automatisch nach GitHub Pages.

1. Stelle sicher, dass deine Änderungen auf den `main`-Branch gepusht werden.
2. Aktiviere unter **Settings → Pages** den Deployments-Zweig `GitHub Actions`.
3. Bei jedem Push auf `main` (oder manuell über "Run workflow") wird der Build
   erstellt und auf Pages veröffentlicht. Die veröffentlichte URL findest du im
   Deployment-Log des Workflows.

Solltest du einen anderen Branch verwenden wollen, passe den Workflow unter
`on.push.branches` entsprechend an.
