import type { WorkflowRecord } from "../types/workflow.types";

export const workflowMockData: WorkflowRecord[] = [
  { id: "workflow-1", name: "Regulatory filing review", owner: "Sophie Bennett", status: "In Progress", completion: 62, dueDate: "2026-10-17", priority: "High" },
  { id: "workflow-2", name: "Quarterly policy attestation", owner: "Marcus Lee", status: "Under Review", completion: 78, dueDate: "2026-10-21", priority: "Medium" },
  { id: "workflow-3", name: "Supplier risk assessment", owner: "Amina Yusuf", status: "Not Started", completion: 0, dueDate: "2026-10-28", priority: "Medium" },
  { id: "workflow-4", name: "Employee training cycle", owner: "Elena Costa", status: "Completed", completion: 100, dueDate: "2026-10-06", priority: "Low" },
];