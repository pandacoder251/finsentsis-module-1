import { alertsMockData } from "../data/alertsMockData";
import { alertsReferenceDate } from "../data/alertsMockData";
import { complianceCategories, penaltyDatasets, riskDistribution } from "../data/analyticsMockData";
import { countryRisks, dashboardConfiguration, dashboardStats } from "../data/dashboardMockData";
import { workflowMockData } from "../data/workflowMockData";
import type { ComplianceAlert } from "../types/alert.types";
import type { CountryRisk, EntityRecord, StatCardData, ApiResponse } from "../types/dashboard.types";
import type { WorkflowRecord } from "../types/workflow.types";
import type { DashboardAnalytics, PenaltyDataset, PenaltyPeriod } from "../types/analytics.types";
import type { DashboardConfiguration } from "../types/dashboard.types";

export interface DashboardPayload {
  stats: StatCardData[];
  countries: CountryRisk[];
  alerts: ComplianceAlert[];
  workflows: WorkflowRecord[];
  entities: EntityRecord[];
  configuration: DashboardConfiguration;
  analytics: DashboardAnalytics;
  alertsAsOf: string;
}

const emptyPenaltyDataset = (): PenaltyDataset => ({ total: 0, change: 0, points: [] });

export const emptyDashboardPayload: DashboardPayload = {
  stats: [],
  countries: [],
  alerts: [],
  workflows: [],
  entities: [],
  configuration: { title: "", description: "", dataLabel: "" },
  alertsAsOf: "2026-10-10",
  analytics: {
    complianceCategories: [],
    penaltyDatasets: Object.fromEntries((["Monthly", "Quarterly", "Yearly"] as PenaltyPeriod[]).map((period) => [period, emptyPenaltyDataset()])) as Record<PenaltyPeriod, PenaltyDataset>,
    riskDistribution: [],
  },
};

export async function getDashboardData(): Promise<ApiResponse<DashboardPayload>> {
  const data: DashboardPayload = {
    stats: [...dashboardStats],
    countries: [...countryRisks],
    alerts: alertsMockData.map((alert) => ({ ...alert })),
    workflows: workflowMockData.map((workflow) => ({ ...workflow })),
    entities: [],
    configuration: { ...dashboardConfiguration },
    analytics: {
      complianceCategories: complianceCategories.map((category) => ({ ...category })),
      penaltyDatasets: Object.fromEntries(Object.entries(penaltyDatasets).map(([period, dataset]) => [period, { ...dataset, points: dataset.points.map((point) => ({ ...point })) }])) as Record<PenaltyPeriod, PenaltyDataset>,
      riskDistribution: riskDistribution.map((item) => ({ ...item })),
    },
    alertsAsOf: alertsReferenceDate,
  };

  return { data, receivedAt: new Date().toISOString(), source: "mock" };
}