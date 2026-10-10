# Finsentis Compliance Dashboard

Responsive React, TypeScript, and Vite frontend for the Finsentis compliance dashboard. All records are illustrative mock data; no backend, database, or AI service is connected.

## Run

```sh
npm install
npm run dev
npm run build
npm run lint
```

The app runs at the URL printed by Vite, with the main dashboard at `/dashboard`.

## Structure

- `src/nav/` contains reusable route navigation and typed navigation items.
- `src/layouts/` provides the shared application shell.
- `src/module-1/pages/` composes the dashboard sections.
- `src/module-1/components/` contains typed UI components and CSS Modules.
- `src/module-1/data/` contains independent typed mock datasets.
- `src/module-1/services/` and `src/module-1/hooks/` form the replaceable data-access boundary.
- `src/module-1/types/` defines shared records, unions, component data, and response types.

## Preview behavior

Workflow/entity creation, alert review, workflow status changes, notifications, settings, document selection, and compliance scans are local to the current page session. Document selection does not upload a file. Compliance scan and Copilot responses are simulated. Replace `getDashboardData` in `dashboardService.ts` with API-backed retrieval when a backend is available; presentation components receive their data through typed props.
