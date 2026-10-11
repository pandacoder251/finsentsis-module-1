import { useState } from "react";
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
  const [primaryView, setPrimaryView] = useState<"compliance" | "penalty">("compliance");
  const [secondaryView, setSecondaryView] = useState<"workflow" | "risk">("workflow");

  return (
    <section className={styles.analyticsSection} aria-label="Compliance analytics">
      <div className={styles.analyticsGrid}>
        <div className={styles.analyticsToggleCard}>
          <div className={styles.segmentTabs} role="radiogroup" aria-label="Primary risk view selector">
            {[
              { value: "compliance", label: "Compliance Breakdown" },
              { value: "penalty", label: "Penalty Exposure (USD)" },
            ].map((option) => (
              <label
                key={option.value}
                className={`${styles.segmentOption} ${primaryView === option.value ? styles.segmentOptionActive : ""}`}
              >
                <input
                  type="radio"
                  name="risk-primary-view"
                  checked={primaryView === option.value}
                  onChange={() => setPrimaryView(option.value as "compliance" | "penalty")}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          <div className={styles.segmentContent}>
            {primaryView === "compliance" ? (
              <ComplianceBreakdown categories={analytics.complianceCategories} className={styles.analyticsMainPanel} />
            ) : (
              <PenaltyExposure datasets={analytics.penaltyDatasets} />
            )}
          </div>
        </div>

        <div className={styles.analyticsToggleCard}>
          <div className={styles.segmentTabs} role="radiogroup" aria-label="Operational view selector">
            {[
              { value: "workflow", label: "Workflow Live Status" },
              { value: "risk", label: "Risk Distribution" },
            ].map((option) => (
              <label
                key={option.value}
                className={`${styles.segmentOption} ${secondaryView === option.value ? styles.segmentOptionActive : ""}`}
              >
                <input
                  type="radio"
                  name="risk-secondary-view"
                  checked={secondaryView === option.value}
                  onChange={() => setSecondaryView(option.value as "workflow" | "risk")}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          <div className={styles.segmentContent}>
            {secondaryView === "workflow" ? (
              <WorkflowStatus workflows={workflows} onStatusChange={onWorkflowStatusChange} onNotify={onNotify} />
            ) : (
              <RiskDistribution data={analytics.riskDistribution} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}