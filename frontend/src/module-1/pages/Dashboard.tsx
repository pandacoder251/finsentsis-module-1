import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { AnalyticsSection } from "../components/AnalyticsSection";
import { CriticalAlerts } from "../components/CriticalAlerts";
import { Header } from "../components/Header";
import { QuickActions } from "../components/QuickActions";
import { StatsGrid } from "../components/StatsGrid";
import { useDashboardData } from "../hooks/useDashboardData";
import styles from "./Dashboard.module.css";
import componentStyles from "../components/dashboardComponents.module.css";

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

  return (
    <div className={styles.dashboard}>
      <Header configuration={dashboard.configuration} />
      <div className={styles.body}>
        <QuickActions onCreateWorkflow={dashboard.addWorkflow} onCreateEntity={dashboard.addEntity} onNotify={notify} />
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