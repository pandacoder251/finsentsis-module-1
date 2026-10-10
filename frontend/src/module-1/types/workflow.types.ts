export type WorkflowStatus = "Not Started" | "In Progress" | "Under Review" | "Completed" | "Blocked";
export type WorkflowPriority = "Low" | "Medium" | "High";

export interface WorkflowRecord {
  id: string;
  name: string;
  owner: string;
  status: WorkflowStatus;
  completion: number;
  dueDate: string;
  priority: WorkflowPriority;
}

export interface NewWorkflowInput {
  name: string;
  description: string;
  priority: WorkflowPriority;
}