export type AlertSeverity = "critical" | "high" | "medium";
export type AlertState = "open" | "reviewed";

export interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  penaltyExposure: number;
  dueDate: string;
  category: string;
  state: AlertState;
}