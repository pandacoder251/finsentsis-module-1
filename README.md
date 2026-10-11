# Finsentis — Frontend Module 1

## Contents

- [Overview](#overview)
- [Current frontend status](#current-frontend-status)
- [Repository structure](#repository-structure)
- [`Frames_ui` reference and integration](#frames_ui-reference-and-integration)
- [Contributors](#contributors)
- [Setup and development](#setup-and-development)
- [Backend Integration TODO](#backend-integration-todo)

## Overview

Frontend Module 1 is the React dashboard experience for exploring illustrative compliance health, risk exposure, obligations, alerts, workflows, and analytics. It is a Vite single-page application written in TypeScript. React Router provides client-side routes, CSS Modules style the application shell and dashboard, Recharts renders analytics, and `react-simple-maps` renders the world map.

The dashboard route is `/dashboard`. Other navigation destinations currently render a shared placeholder page; they are not complete product modules. Dashboard data is supplied by local mock data. No backend API, database, authentication flow, or AI service is implemented in this repository.

## Current frontend status

### Implemented in the current code

- Responsive dashboard layout with a collapsible desktop sidebar, mobile navigation drawer, route navigation, and navigation search.
- Six illustrative metric cards; a risk map with color-coded risk levels, country details, zoom, reset, and fullscreen controls; and a critical-alert panel with review interactions.
- Compliance breakdown, penalty-exposure chart, risk-distribution chart, and workflow-status views.
- Header interactions for notifications, settings, help, simulated Copilot responses, and CSV report download. The CSV currently contains the dashboard metrics, workflow records, and alerts.
- Quick actions for selecting a local document, creating a workflow, adding an entity, and simulating a compliance scan; the action strip can scroll horizontally.
- Workflow and alert changes, new records, settings, and notifications are held in client-side page state; they are not persisted to a server.

### Known limitations and unfinished work

- `frontend/src/module-1/services/dashboardService.ts` returns copied mock datasets. Dashboard numbers and records are illustrative, not verified operational or regulatory data.
- The profile, notifications, Copilot response, scan result, report contents, and other preview content are illustrative. There is no account/session implementation or authorization model.
- Document selection checks the filename extension but does not upload or retain the file. Copilot and compliance scanning are simulations.
- The generated CSV is assembled in the browser from the current metric, workflow, and alert data; it is not a server-generated or audited report.
- New workflows and entities, alert reviews, and workflow status changes are local to the current page session. Reloading the page restores mock data.
- All non-dashboard navigation routes currently use a generic destination placeholder.
- No automated test files or test script are present in the frontend package. Responsive layouts and interactive flows still need systematic browser and accessibility verification.
- The repository contains Vercel SPA rewrite configuration at the root and in `frontend/`. A deployment must also use the frontend build/output settings; adding a rewrite alone does not configure a Vercel project build.

## Repository structure

The tree below lists the tracked project files and relevant source directories. Generated output and dependencies (including `node_modules/` and `frontend/dist/`) are intentionally omitted. `backend/` exists in the workspace but has no tracked implementation files.

```text
finsentsis-module-1/
├── Frames_ui/
│   └── Frame 1045.png                  # Dashboard design-reference image
├── backend/                            # No tracked backend source or configuration
├── frontend/
│   ├── .gitignore                      # Frontend-local ignored files
│   ├── .oxlintrc.json                  # Oxlint rules and plugins
│   ├── README.md                       # Frontend-specific setup and preview notes
│   ├── index.html                      # Vite HTML document and browser entry
│   ├── package.json                    # Frontend dependencies and npm scripts
│   ├── package-lock.json               # Locked npm dependency tree
│   ├── tsconfig.json                   # TypeScript project references
│   ├── tsconfig.app.json               # Strict browser/application TypeScript options
│   ├── tsconfig.node.json              # TypeScript options for Vite configuration
│   ├── vite.config.ts                  # Vite and React plugin configuration
│   ├── vercel.json                     # SPA rewrite for a Vercel project rooted here
│   ├── public/
│   │   └── favicon.png                 # Public favicon copied as-is by Vite
│   └── src/
│       ├── main.tsx                    # React DOM entry; mounts App
│       ├── App.tsx                     # BrowserRouter, route table, dashboard lazy-loading,
│       │                               # and placeholder destination routes
│       ├── App.module.css              # Placeholder-page and route-loading styles
│       ├── index.css                   # Global styles, font imports, and design tokens
│       ├── assets/
│       │   └── logo.png                # Sidebar brand image
│       ├── layouts/
│       │   ├── DashboardLayout.tsx     # Shared navigation shell and route outlet
│       │   └── DashboardLayout.module.css
│       ├── nav/
│       │   ├── Navigation.tsx          # Sidebar, filtering, collapse, and mobile drawer
│       │   ├── Navigation.module.css   # Sidebar and responsive-navigation styles
│       │   └── navigation.types.ts     # Typed route items and route titles
│       └── module-1/
│           ├── components/
│           │   ├── AnalyticsSection.tsx       # Switches between analytics and workflow views
│           │   ├── ComplianceBreakdown.tsx   # Compliance-category health display
│           │   ├── CriticalAlerts.tsx        # Alert list, details, and local review action
│           │   ├── Dialog.tsx                # Shared modal dialog
│           │   ├── Header.tsx                # Dashboard header and interactive panels
│           │   ├── PenaltyExposure.tsx       # Period selector and penalty chart
│           │   ├── QuickActions.tsx          # Upload selection, workflow/entity forms, scan
│           │   ├── RiskDistribution.tsx      # Risk-severity donut chart and legend
│           │   ├── RiskHeatmap.tsx           # Color-coded, interactive world map
│           │   ├── StatCard.tsx              # Individual metric card
│           │   ├── StatsGrid.tsx             # Metric grid, loading skeletons, and details
│           │   ├── WorkflowStatus.tsx        # Workflow list, details, and local status edits
│           │   └── dashboardComponents.module.css
│           ├── data/
│           │   ├── alertsMockData.ts         # Illustrative alert records and reference date
│           │   ├── analyticsMockData.ts      # Illustrative compliance, penalty, and risk data
│           │   ├── dashboardMockData.ts      # Illustrative statistics, map data, and copy
│           │   └── workflowMockData.ts       # Illustrative workflow records
│           ├── hooks/
│           │   └── useDashboardData.ts       # Loads dashboard payload and owns local mutations
│           ├── pages/
│           │   ├── Dashboard.tsx             # Dashboard composition, notifications, and CSV
│           │   └── Dashboard.module.css      # Dashboard page and responsive grid styles
│           ├── services/
│           │   └── dashboardService.ts       # Mock dashboard-data service boundary
│           ├── styles/
│           │   └── dashboardTokens.css       # Dashboard color, spacing, and surface tokens
│           └── types/
│               ├── alert.types.ts            # Alert record and status types
│               ├── analytics.types.ts        # Analytics and chart data types
│               ├── dashboard.types.ts        # Metrics, map, entity, and response types
│               └── workflow.types.ts         # Workflow record, priority, and status types
├── vercel.json                         # SPA rewrite for a Vercel project at repository root
└── README.md                           # This repository and module guide
```

### Application entry points and organization

The browser loads [`frontend/index.html`](frontend/index.html), which loads [`main.tsx`](frontend/src/main.tsx). `main.tsx` mounts [`App.tsx`](frontend/src/App.tsx). `App.tsx` configures `BrowserRouter` and wraps the route table in [`DashboardLayout.tsx`](frontend/src/layouts/DashboardLayout.tsx); `/dashboard` lazy-loads [`Dashboard.tsx`](frontend/src/module-1/pages/Dashboard.tsx), while the remaining declared routes render a placeholder. The dashboard page composes the header, quick actions, metric cards, map, alerts, and analytics. [`useDashboardData.ts`](frontend/src/module-1/hooks/useDashboardData.ts) obtains the typed payload through [`dashboardService.ts`](frontend/src/module-1/services/dashboardService.ts) and holds interactions in React state.

## `Frames_ui` reference and integration

The repository path is [`Frames_ui/`](Frames_ui/), with the single asset [`Frame 1045.png`](<Frames_ui/Frame 1045.png>). The image is a visual dashboard reference; it is not an executable UI framework.

There is no tracked directory named `frame_ui/` (the actual spelling and capitalization is `Frames_ui/`), and the application does not import the image or any component, layout, stylesheet, or code from it. Frontend Module 1 implements its own shell and screens under `frontend/src/`: [`DashboardLayout.tsx`](frontend/src/layouts/DashboardLayout.tsx) composes [`Navigation.tsx`](frontend/src/nav/Navigation.tsx) and a React Router outlet, while the dashboard imports its components using relative paths. Its runtime dependencies are declared in [`frontend/package.json`](frontend/package.json); none points to `Frames_ui`.

Therefore, the verified relationship is design reference only—not shared components or runtime integration. If the team intends `Frames_ui` to provide reusable application code, that integration is not present and its source/API contract must be supplied before it can be documented or wired in.

## Contributors

Git history shows one verifiable author for the tracked project history. The listed contribution is limited to work evidenced by repository commits; no separate role or team roster was found.

| Name | GitHub Profile | Contribution/Role |
|---|---|---|
| Pousali | [@pandacoder251](https://github.com/pandacoder251) | Git history includes the dashboard frontend implementation and updates to its source and repository documentation. |

## Setup and development

### Prerequisites

- Node.js **20.19+** or **22.12+** (the installed Vite 8 package's declared engine range).
- npm, for which `frontend/package-lock.json` is provided.

The repository does not pin a Node.js or npm version in an `.nvmrc`, `engines` field, or tool-version file.

### Install and run

```sh
cd frontend
npm ci
npm run dev
```

Vite prints the local URL when the server starts (normally `http://localhost:5173/`). Open [`http://localhost:5173/dashboard`](http://localhost:5173/dashboard) for Module 1. If port 5173 is already occupied, Vite may choose another port and prints that URL.

### Build, lint, and preview

Run these commands from `frontend/`:

```sh
npm run build    # TypeScript project build, then Vite production build
npm run lint     # Oxlint
npm run preview  # Serve the existing production build locally
```

There is no `test` script or automated test suite configured in `frontend/package.json`.

### Environment and Vercel

No frontend environment variables or API base URL are currently used. [`dashboardService.ts`](frontend/src/module-1/services/dashboardService.ts) returns local mock data and makes no HTTP requests.

For a Vercel deployment, configure the project root as `frontend/`, install with `npm ci`, build with `npm run build`, and serve the generated `dist/` output. `frontend/vercel.json` rewrites client-side paths to `index.html`. The root `vercel.json` contains the same SPA rewrite for deployments configured at the repository root; it does not, by itself, specify a root-level package, build command, or output directory. Confirm the Vercel project's Root Directory and build settings in its deployment configuration.

## Backend Integration TODO

The items below distinguish confirmed frontend gaps from contracts or product behavior that need backend-team confirmation. No backend endpoints or API schema are present in the repository; endpoint names and URLs are deliberately not invented.

### A. API Integration

**Confirmed frontend gaps**

- [ ] **[High]** Replace the mock-only `getDashboardData()` implementation in `frontend/src/module-1/services/dashboardService.ts` with a typed request for the dashboard payload used by `useDashboardData.ts`: statistics, countries, alerts, workflows, configuration, and analytics. Agree a backend endpoint and response schema before implementation; no endpoint currently exists in this codebase.
- [ ] **[High]** Connect workflow creation and status changes, entity creation, and alert review from `frontend/src/module-1/components/QuickActions.tsx`, `frontend/src/module-1/components/WorkflowStatus.tsx`, and `frontend/src/module-1/components/CriticalAlerts.tsx` to backend mutations after their API contracts are defined. These actions currently update only React state.
- [ ] **[High]** Implement a real document-upload request for the file picker in `frontend/src/module-1/components/QuickActions.tsx`; currently it only checks the filename extension and displays a preview message.
- [ ] **[Medium]** Decide whether the CSV created in `frontend/src/module-1/pages/Dashboard.tsx` should remain a client-side export of the loaded data or use a backend export/report contract. There is no server report endpoint in the repository.

**Confirm with the backend team**

- [ ] **[High]** Confirm endpoint paths, HTTP methods, request/response schemas, error formats, identifier formats, and ownership for dashboard reads and workflow/entity/alert mutations; then document the agreed contract alongside the service implementation.
- [ ] **[Medium]** Confirm whether Copilot responses and compliance scans are in this module's integration scope. The current UI in `Header.tsx` and `QuickActions.tsx` is explicitly simulated; no AI service or API contract is present.

### B. Data and State Management

**Confirmed frontend gaps**

- [ ] **[High]** Replace the imports of `alertsMockData`, `analyticsMockData`, `dashboardMockData`, and `workflowMockData` in `frontend/src/module-1/services/dashboardService.ts` with API-backed data while preserving the existing TypeScript record types or updating them to the agreed schemas.
- [ ] **[High]** Make the server authoritative for workflow status, alert review, entity creation, and workflow creation. Update or refetch query data after successful mutations so the UI does not imply that transient state is persisted.
- [ ] **[Medium]** Define loading, empty, and stale-data behavior for every dashboard section in `frontend/src/module-1/pages/Dashboard.tsx` and its components. The current hook exposes one page-level loading/error state, while only `StatsGrid.tsx` renders loading skeletons.
- [ ] **[Medium]** Define dashboard refresh and mutation synchronization behavior in `frontend/src/module-1/hooks/useDashboardData.ts` (including how refreshes, concurrent edits, and failed mutations reconcile with the displayed data).

**Confirm with the backend team**

- [ ] **[Medium]** Confirm the canonical sources and refresh cadence for dashboard metrics, jurisdiction coverage, analytics, notification items, and user/profile information; current values are hardcoded illustrative records.
- [ ] **[Low]** Confirm pagination, filtering, sorting, and time-range requirements for alert and workflow collections before choosing client- versus server-side state handling.

### C. Forms and Validation

**Confirmed frontend gaps**

- [ ] **[High]** Submit the create-workflow and add-entity forms in `frontend/src/module-1/components/QuickActions.tsx` to the agreed API and show pending, success, and failure results. Current validation is primarily native required/max-length checks and local required-field checks.
- [ ] **[High]** Validate all submitted fields on the server and map field-level validation errors back to these forms; browser validation alone cannot enforce backend/domain rules.
- [ ] **[High]** Add upload size/type/content validation, progress, cancellation, and failure handling to the document-selection flow in `QuickActions.tsx` when a secure upload contract is agreed. The current extension allowlist is not an upload or security boundary.

**Confirm with the backend team**

- [ ] **[Medium]** Agree workflow and entity field requirements, allowed transitions, due-date rules, and validation error schema before adding client-side rules beyond the current form checks.
- [ ] **[Medium]** Confirm accepted file types, size limits, storage/retention rules, malware-scanning requirements, and upload response behavior before enabling document uploads.

### D. Authentication and Authorization

**Confirm with the backend team**

- [ ] **[High]** Confirm whether this preview is expected to have authenticated access. No login, token/session handling, or authenticated API client is present in `frontend/src/`.
- [ ] **[High]** Confirm roles and permission rules for reading dashboard data, reviewing alerts, creating entities/workflows, and uploading documents. The current sidebar profile and role-independent controls are illustrative, not authorization.
- [ ] **[Medium]** After an auth contract is supplied, implement the agreed session lifecycle and unauthorized/forbidden handling without placing credentials in source-controlled configuration.

### E. UI and API Error Handling

**Confirmed frontend gaps**

- [ ] **[High]** Replace the generic load failure handling in `frontend/src/module-1/hooks/useDashboardData.ts` with visible, actionable API error states while retaining useful behavior for partially failed dashboard sections where appropriate.
- [ ] **[Medium]** Add retry or refresh behavior for failed dashboard reads. The current error banner in `frontend/src/module-1/pages/Dashboard.tsx` has no retry action.
- [ ] **[High]** Add pending, success, and failure feedback to backend mutations and prevent duplicate submissions in `QuickActions.tsx`, `WorkflowStatus.tsx`, and `CriticalAlerts.tsx`. Existing toasts indicate local preview changes only.
- [ ] **[Medium]** Define and implement behavior for expired sessions, rate limits, network timeouts, and server validation errors once the backend error and authentication contracts are known.

### F. Integration and Testing

**Confirmed frontend gaps**

- [ ] **[High]** Add a documented frontend API base URL setting and configure it through Vite environment variables only after the backend host and deployment environments are agreed. No API URL or `VITE_*` variable is currently read by the frontend.
- [ ] **[High]** Add automated tests for dashboard service responses, loading/error states, form validation, mutation feedback, and report generation. There are currently no test files or test script in the frontend package.
- [ ] **[Medium]** Add integration/browser tests against a test backend for dashboard loading and workflow, entity, alert, and upload flows after the API contract is available.
- [ ] **[Medium]** Manually verify direct navigation and refresh on `/dashboard` and other client-side routes in each deployment environment; confirm the Vercel root directory, build command, output directory, and SPA rewrite together.

**Confirm with the backend and deployment teams**

- [ ] **[High]** Confirm permitted frontend origins, preflight methods/headers, credentials policy, and CORS configuration for local development, preview deployments, and production before connecting browser requests.
- [ ] **[Medium]** Confirm separate API hosts/configuration for development, preview, and production, and provide a safe way to configure them without committing secrets.

### G. Pending Dependencies

**Backend-team confirmation required**

- [ ] **[High]** Provide the API contract for dashboard data and mutations (workflow, entity, alert review) before replacing local-only implementations.
- [ ] **[High]** Confirm whether authentication and role-based access are required and provide the supported identity/session contract.
- [ ] **[High]** Confirm whether document upload, AI/Copilot, and compliance scanning are in scope; provide storage and service contracts for any approved features.
- [ ] **[Medium]** Confirm canonical metric definitions, alert/workflow states and transitions, jurisdiction coverage, currency/time-zone rules, and data freshness so mock UI types can be aligned with real data.
- [ ] **[Medium]** Provide environment-specific API origins and CORS/deployment requirements; no backend URL, credentials, or environment-variable names are defined in this repository.
