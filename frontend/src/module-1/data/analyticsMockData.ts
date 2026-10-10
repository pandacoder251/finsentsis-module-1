import type { ComplianceCategory, PenaltyDataset, PenaltyPeriod, RiskDistributionItem } from "../types/analytics.types";

export const complianceCategories: ComplianceCategory[] = [
  { id: "hr", name: "HR Compliance", abbreviation: "HR", percentage: 92, change: 3 },
  { id: "finance", name: "Finance Compliance", abbreviation: "Finance", percentage: 74, change: -2 },
  { id: "legal", name: "Legal Compliance", abbreviation: "Legal", percentage: 86, change: 4 },
  { id: "operations", name: "Operations Compliance", abbreviation: "Operations", percentage: 81, change: 1 },
];

export const penaltyDatasets: Record<PenaltyPeriod, PenaltyDataset> = {
  Monthly: { total: 1_240_000, change: -8.4, points: [{ label: "May", exposure: 980, previous: 1120 }, { label: "Jun", exposure: 1150, previous: 1210 }, { label: "Jul", exposure: 1090, previous: 1190 }, { label: "Aug", exposure: 1380, previous: 1420 }, { label: "Sep", exposure: 1180, previous: 1310 }, { label: "Oct", exposure: 1240, previous: 1350 }] },
  Quarterly: { total: 3_860_000, change: 4.2, points: [{ label: "Q1", exposure: 3240, previous: 3080 }, { label: "Q2", exposure: 3520, previous: 3410 }, { label: "Q3", exposure: 3860, previous: 3705 }, { label: "Q4", exposure: 0, previous: 3820 }] },
  Yearly: { total: 12_480_000, change: -3.1, points: [{ label: "2022", exposure: 10800, previous: 11400 }, { label: "2023", exposure: 11850, previous: 12100 }, { label: "2024", exposure: 13200, previous: 12740 }, { label: "2025", exposure: 12880, previous: 13200 }, { label: "2026 YTD", exposure: 12480, previous: 12880 }] },
};

export const riskDistribution: RiskDistributionItem[] = [
  { level: "Low Risk", count: 438, color: "#42c6a5" },
  { level: "Medium Risk", count: 516, color: "#e8b64b" },
  { level: "High Risk", count: 219, color: "#ef8153" },
  { level: "Critical Risk", count: 74, color: "#e4505d" },
];