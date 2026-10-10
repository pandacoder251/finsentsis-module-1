export type PenaltyPeriod = "Monthly" | "Quarterly" | "Yearly";

export interface ComplianceCategory {
  id: string;
  name: string;
  abbreviation: string;
  percentage: number;
  change: number;
}

export interface PenaltyPoint {
  label: string;
  exposure: number;
  previous: number;
}

export interface PenaltyDataset {
  total: number;
  change: number;
  points: PenaltyPoint[];
}

export interface RiskDistributionItem {
  level: "Low Risk" | "Medium Risk" | "High Risk" | "Critical Risk";
  count: number;
  color: string;
}

export interface DashboardAnalytics {
  complianceCategories: ComplianceCategory[];
  penaltyDatasets: Record<PenaltyPeriod, PenaltyDataset>;
  riskDistribution: RiskDistributionItem[];
}