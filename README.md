# Finsentis Dashboard

## Tech Stack

- React JS
- TypeScript
- CSS
- Mock / Static Frontend Data
- No Backend
- No API
- No Database

---

## Dev 1: Top Section

### Header

1. Breadcrumb
2. Ask Copilot button
3. Notification
4. Settings
5. Help icons


### Navigation
1. Global Dashboard & Risk Radar
2. AI Regulatory Intelligence Layer
3. Policy-to-Process Automation
4. Autonomous Compliance Copilot
5. Audit-Ready Evidence & Blockchain Trail
6. Consulting & Expert Marketplace 

### Quick Action Drawer

1. Upload Contract / Document
2. Create Workflow
3. Add Entity / Employee
4. Run AI Compliance Scan
5. Run AI Compliance Scan

### Statistics Cards

1. Global Compliance Health
2. Total Risk Exposure
3. Active Obligations
4. Pending Tasks
5. Critical Alerts
6. Countries Monitored

### Global Risk Heatmap

1. World Map
2. Zoom Controls
3. Fullscreen / Control Buttons

### Critical Alerts

1. Critical Badge
2. Penalty Exposure
3. Due Date
4. Check Now Button
5. View All Alerts

### Files

- `Header.tsx`
- `QuickActions.tsx`
- `StatCard.tsx`
- `StatsGrid.tsx`
- `RiskHeatmap.tsx`
- `CriticalAlerts.tsx`

---

## Dev 2: Bottom Section

### Compliance Breakdown

1. HR
2. Finance
3. Legal
4. Operations
5. Progress Bars
6. Percentage Values

### Penalty Exposure

1. Frontend Tab UI

### Workflow Live Status

1. Task 1
2. Task 2
3. Task 3
4. Completion Percentage

### Risk Distribution

1. Donut Chart
2. Risk Percentage

### Files

- `ComplianceBreakdown.tsx`
- `WorkflowStatus.tsx`
- `RiskDistribution.tsx`

---

## 🔗 Shared / Integration

### Files

- `App.tsx` → **Person 1**
- `App.css` → **One person should own the main CSS**
- `types.ts` → **Shared TypeScript interfaces**

### Tech Stack

- React
- TypeScript
- CSS
- Mock / Static Frontend Data
- No Backend
- No API
- No Database

---

## Module 1

![module 1](<Asset/Frame 1045.png>)

---

## Frontend Implementation

The frontend is in `frontend/`. It uses React, Vite, strict TypeScript, React Router, CSS Modules, Recharts, and Lucide React. Dashboard records are illustrative mock data; no backend is connected.

### Vercel Deployment

The Vercel rewrite configuration serves the SPA entry point for client-side routes such as `/dashboard`. The repository-root configuration supports deployments rooted at the repository, and `frontend/vercel.json` supports deployments with `frontend/` configured as the Vercel project root.

```text
frontend/
├── public/
│   └── favicon.png
└── src/
	├── App.module.css
	├── App.tsx
	├── index.css
	├── main.tsx
	├── assets/
	│   └── logo.png
	├── layouts/
	│   ├── DashboardLayout.module.css
	│   └── DashboardLayout.tsx
	├── nav/
	│   ├── Navigation.module.css
	│   ├── Navigation.tsx
	│   └── navigation.types.ts
	└── module-1/
		├── components/
		│   ├── AnalyticsSection.tsx
		│   ├── ComplianceBreakdown.tsx
		│   ├── CriticalAlerts.tsx
		│   ├── Dialog.tsx
		│   ├── Header.tsx
		│   ├── PenaltyExposure.tsx
		│   ├── QuickActions.tsx
		│   ├── RiskDistribution.tsx
		│   ├── RiskHeatmap.tsx
		│   ├── StatCard.tsx
		│   ├── StatsGrid.tsx
		│   ├── WorkflowStatus.tsx
		│   └── dashboardComponents.module.css
		├── data/
		│   ├── alertsMockData.ts
		│   ├── analyticsMockData.ts
		│   ├── dashboardMockData.ts
		│   └── workflowMockData.ts
		├── hooks/
		│   └── useDashboardData.ts
		├── pages/
		│   ├── Dashboard.module.css
		│   └── Dashboard.tsx
		├── services/
		│   └── dashboardService.ts
		├── styles/
		│   └── dashboardTokens.css
		└── types/
			├── alert.types.ts
			├── analytics.types.ts
			├── dashboard.types.ts
			└── workflow.types.ts
```

## To Do

- Replace the mock implementation in `frontend/src/module-1/services/dashboardService.ts` with API-backed dashboard retrieval and error handling.
- Add backend persistence for workflows, entities, alert acknowledgements, and workflow status changes.
- Connect document selection to a secure upload service with server-side validation and progress/error states.
- Replace the simulated Copilot reply and compliance scan with approved AI services and clearly defined safety and review flows.
- Add browser-driven tests for dashboard interactions, navigation, dialogs, map controls, charts, and mobile layouts.
- Validate jurisdiction coverage, obligation counts, penalty estimates, and compliance scores with domain owners before using production data.
- Replace placeholder destinations in the global navigation as the remaining product modules are implemented.