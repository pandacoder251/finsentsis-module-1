import type { ComplianceAlert } from "../types/alert.types";

export const alertsReferenceDate = "2026-10-10";

export const alertsMockData: ComplianceAlert[] = [
  { id: "alert-1", title: "Statutory audit filing overdue", description: "The annual filing for the Singapore entity requires immediate attention.", severity: "critical", penaltyExposure: 250_000, dueDate: "2026-10-08", category: "Finance", state: "open" },
  { id: "alert-2", title: "Data processing review due", description: "Review updated cross-border processing terms for the EU region.", severity: "critical", penaltyExposure: 180_000, dueDate: "2026-10-15", category: "Privacy", state: "open" },
  { id: "alert-3", title: "Workplace safety certification", description: "Two facilities have certifications expiring within 10 days.", severity: "high", penaltyExposure: 95_000, dueDate: "2026-10-19", category: "HR", state: "open" },
  { id: "alert-4", title: "Beneficial ownership disclosure", description: "Updated ownership details are needed for the Mexico subsidiary.", severity: "high", penaltyExposure: 72_000, dueDate: "2026-10-25", category: "Legal", state: "open" },
  { id: "alert-5", title: "Vendor due diligence refresh", description: "Annual screening is pending for a high-risk supplier.", severity: "medium", penaltyExposure: 42_000, dueDate: "2026-11-03", category: "Operations", state: "open" },
];