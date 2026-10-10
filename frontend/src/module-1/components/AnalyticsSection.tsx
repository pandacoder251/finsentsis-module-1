import type { DashboardAnalytics } from "../types/analytics.types";
import type { WorkflowRecord, WorkflowStatus as WorkflowStatusType } from "../types/workflow.types";
import { ComplianceBreakdown } from "./ComplianceBreakdown";
import { PenaltyExposure } from "./PenaltyExposure";
import { RiskDistribution } from "./RiskDistribution";
import { WorkflowStatus } from "./WorkflowStatus";
import styles from "./dashboardComponents.module.css";

interface AnalyticsSectionProps {
  workflows: WorkflowRecord[];
  analytics: DashboardAnalytics;
  onWorkflowStatusChange: (id: string, status: WorkflowStatusType) => void;
  onNotify: (message: string) => void;
}

export function AnalyticsSection({ analytics, workflows, onWorkflowStatusChange, onNotify }: AnalyticsSectionProps) {
  return <section className={styles.analyticsSection} aria-labelledby="analytics-section-title"><div className={styles.analyticsHeading}><div><span className={styles.panelEyebrow}>COMPLIANCE INTELLIGENCE</span><h2 id="analytics-section-title">Performance & exposure</h2></div><span className={styles.dataSource}><i />Illustrative mock data</span></div><div className={styles.analyticsGrid}><ComplianceBreakdown categories={analytics.complianceCategories} /><PenaltyExposure datasets={analytics.penaltyDatasets} /><WorkflowStatus workflows={workflows} onStatusChange={onWorkflowStatusChange} onNotify={onNotify} /><RiskDistribution data={analytics.riskDistribution} /></div></section>;
}