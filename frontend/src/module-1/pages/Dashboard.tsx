import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { AnalyticsSection } from "../components/AnalyticsSection";
import { CriticalAlerts } from "../components/CriticalAlerts";
import { Header } from "../components/Header";
import { QuickActions } from "../components/QuickActions";
import { StatsGrid } from "../components/StatsGrid";
import { useDashboardData } from "../hooks/useDashboardData";
import type { WorkflowRecord } from "../types/workflow.types";
import styles from "./Dashboard.module.css";
import componentStyles from "../components/dashboardComponents.module.css";

const csvCell = (value: string | number): string => {
  const text = String(value);
  const safeText = /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safeText.replace(/"/g, '""')}"`;
};

const createDashboardReport = (stats: { title: string; value: string | number; description: string }[], workflows: WorkflowRecord[], alerts: { title: string; severity: string; category: string; state: string; dueDate: string; penaltyExposure: number }[]): string => {
  const rows: (string | number)[][] = [
    ["Finsentis Compliance Dashboard Report"],
    ["Generated", new Date().toISOString()],
    [],
    ["Dashboard Metrics", "Value", "Description"],
    ...stats.map((stat) => [stat.title, stat.value, stat.description]),
    [],
    ["Workflow", "Owner", "Status", "Completion (%)", "Due Date", "Priority"],
    ...workflows.map((workflow) => [workflow.name, workflow.owner, workflow.status, workflow.completion, workflow.dueDate, workflow.priority]),
    [],
    ["Alert", "Severity", "Category", "State", "Due Date", "Penalty Exposure (USD)"],
    ...alerts.map((alert) => [alert.title, alert.severity, alert.category, alert.state, alert.dueDate, alert.penaltyExposure]),
  ];
  return rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
};

const RiskHeatmap = lazy(async () => {
  const module = await import("../components/RiskHeatmap");
  return { default: module.RiskHeatmap };
});

export function Dashboard() {
  const dashboard = useDashboardData();
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => () => { if (toastTimer.current !== null) window.clearTimeout(toastTimer.current); }, []);

  const notify = (message: string): void => {
    setToast(message);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3800);
  };

  const generateReport = (): void => {
    const report = createDashboardReport(dashboard.stats, dashboard.workflows, dashboard.alerts);
    const url = URL.createObjectURL(new Blob([report], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `finsentis-dashboard-report-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    notify("Dashboard report downloaded as CSV");
  };

  return (
    <div className={styles.dashboard}>
      <Header configuration={dashboard.configuration} onGenerateReport={generateReport}>
        <QuickActions onCreateWorkflow={dashboard.addWorkflow} onCreateEntity={dashboard.addEntity} onNotify={notify} />
      </Header>
      <div className={styles.body}>
        {dashboard.error && <div className={styles.errorBanner} role="alert">{dashboard.error}</div>}
        <StatsGrid stats={dashboard.stats} loading={dashboard.loading} />
        <div className={styles.mapAlertsGrid}>
          <Suspense fallback={<div className={componentStyles.statSkeleton} aria-label="Loading global risk map" />}><RiskHeatmap countries={dashboard.countries} /></Suspense>
          <CriticalAlerts alerts={dashboard.alerts} onReview={dashboard.reviewAlert} onNotify={notify} referenceDate={dashboard.alertsAsOf} />
        </div>
        <AnalyticsSection analytics={dashboard.analytics} workflows={dashboard.workflows} onWorkflowStatusChange={dashboard.updateWorkflowStatus} onNotify={notify} />
        {dashboard.entities.length > 0 && <div className={styles.entityNotice} role="status">{dashboard.entities.length} entity or employee record{dashboard.entities.length === 1 ? "" : "s"} added in this session: {dashboard.entities[0]?.name}</div>}
        <footer className={styles.dashboardFooter}><span>Finsentis Compliance OS</span><span>Data shown is illustrative and is not legal advice.</span><span>Last synced just now</span></footer>
      </div>
      {toast && <div className={componentStyles.toast} role="status" aria-live="polite"><Check size={16} /><span>{toast}</span><button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}><X size={14} /></button></div>}
    </div>
  );
}