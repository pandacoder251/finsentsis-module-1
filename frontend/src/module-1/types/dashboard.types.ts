export type RiskLevel = "low" | "medium" | "high" | "critical";
export type TrendDirection = "up" | "down" | "neutral";
export type StatStatus = "success" | "warning" | "danger" | "neutral";
export type StatIconName = "health" | "exposure" | "obligations" | "tasks" | "alerts" | "countries";

export interface StatCardData {
  id: string;
  title: string;
  value: string | number;
  description: string;
  trend: number;
  trendDirection: TrendDirection;
  status: StatStatus;
  icon: StatIconName;
  detail: string;
}

export interface CountryRisk {
  id: string;
  country: string;
  iso: string;
  riskLevel: RiskLevel;
  exposure: number;
  obligations: number;
}

export interface EntityRecord {
  id: string;
  name: string;
  type: "Entity" | "Employee";
  country: string;
  metadata: string;
}

export interface ApiResponse<T> {
  data: T;
  receivedAt: string;
  source: "mock" | "api";
}

export interface DashboardConfiguration {
  title: string;
  description: string;
  dataLabel: string;
}