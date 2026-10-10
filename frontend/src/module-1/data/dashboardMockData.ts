import type { CountryRisk, StatCardData } from "../types/dashboard.types";

export const dashboardStats: StatCardData[] = [
  { id: "compliance-health", title: "Global Compliance Health", value: "87", description: "5% last month", trend: 5, trendDirection: "up", status: "success", icon: "health", detail: "Health improved by 5 points this month. HR and legal controls are on track; finance is the main opportunity." },
  { id: "risk-exposure", title: "Total Risk Exposure", value: "$12M", description: "8.3% vs last month", trend: 8.3, trendDirection: "up", status: "warning", icon: "exposure", detail: "Estimated exposure across monitored jurisdictions. The largest concentration is in regulatory filings and data privacy." },
  { id: "active-obligations", title: "Active Obligations", value: "1,247", description: "12% vs last month", trend: 12, trendDirection: "up", status: "neutral", icon: "obligations", detail: "1,247 obligations are currently tracked, with 84 requiring review in the next 30 days." },
  { id: "pending-tasks", title: "Pending Tasks", value: "318", description: "28 due this week", trend: 28, trendDirection: "up", status: "warning", icon: "tasks", detail: "318 tasks are open across active workflows. 28 are due this week and 6 are blocked." },
  { id: "critical-alerts", title: "Critical Alerts", value: "23", description: "7 vs last month", trend: 7, trendDirection: "up", status: "danger", icon: "alerts", detail: "23 critical alerts are open. The alert panel highlights the highest-priority items and due dates." },
  { id: "countries-monitored", title: "Countries Monitored", value: "190+", description: "No change", trend: 0, trendDirection: "neutral", status: "neutral", icon: "countries", detail: "Coverage spans more than 190 jurisdictions across the Americas, Europe, Africa, Asia-Pacific, and the Middle East." },
];

export const countryRisks: CountryRisk[] = [
  { id: "us", country: "United States", iso: "USA", riskLevel: "medium", exposure: 1_240_000, obligations: 184 },
  { id: "ca", country: "Canada", iso: "CAN", riskLevel: "low", exposure: 420_000, obligations: 96 },
  { id: "mx", country: "Mexico", iso: "MEX", riskLevel: "high", exposure: 920_000, obligations: 72 },
  { id: "br", country: "Brazil", iso: "BRA", riskLevel: "high", exposure: 1_060_000, obligations: 88 },
  { id: "gb", country: "United Kingdom", iso: "GBR", riskLevel: "low", exposure: 360_000, obligations: 112 },
  { id: "de", country: "Germany", iso: "DEU", riskLevel: "low", exposure: 310_000, obligations: 106 },
  { id: "fr", country: "France", iso: "FRA", riskLevel: "medium", exposure: 510_000, obligations: 94 },
  { id: "ng", country: "Nigeria", iso: "NGA", riskLevel: "critical", exposure: 1_480_000, obligations: 53 },
  { id: "za", country: "South Africa", iso: "ZAF", riskLevel: "high", exposure: 740_000, obligations: 68 },
  { id: "in", country: "India", iso: "IND", riskLevel: "critical", exposure: 1_820_000, obligations: 142 },
  { id: "cn", country: "China", iso: "CHN", riskLevel: "high", exposure: 1_370_000, obligations: 128 },
  { id: "jp", country: "Japan", iso: "JPN", riskLevel: "low", exposure: 280_000, obligations: 92 },
  { id: "au", country: "Australia", iso: "AUS", riskLevel: "medium", exposure: 480_000, obligations: 86 },
  { id: "ae", country: "United Arab Emirates", iso: "ARE", riskLevel: "medium", exposure: 560_000, obligations: 64 },
];

export const dashboardConfiguration = {
  title: "Global Dashboard & Risk Radar",
  description: "A unified view of global performance and emerging risks, so you can act with confidence.",
  dataLabel: "Illustrative mock data · Last updated just now",
};