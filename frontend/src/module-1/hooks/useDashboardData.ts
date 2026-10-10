import { useEffect, useState } from "react";
import { emptyDashboardPayload, getDashboardData, type DashboardPayload } from "../services/dashboardService";
import type { ComplianceAlert } from "../types/alert.types";
import type { EntityRecord } from "../types/dashboard.types";
import type { NewWorkflowInput, WorkflowRecord, WorkflowStatus } from "../types/workflow.types";

export interface DashboardDataState extends DashboardPayload {
  loading: boolean;
  error: string | null;
  addWorkflow: (input: NewWorkflowInput) => void;
  addEntity: (input: Omit<EntityRecord, "id">) => void;
  updateWorkflowStatus: (id: string, status: WorkflowStatus) => void;
  reviewAlert: (id: string) => void;
}

export function useDashboardData(): DashboardDataState {
  const [payload, setPayload] = useState<DashboardPayload>(emptyDashboardPayload);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getDashboardData()
      .then((response) => { if (active) setPayload(response.data); })
      .catch(() => { if (active) setError("Dashboard data could not be loaded."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const addWorkflow = (input: NewWorkflowInput): void => {
    const workflow: WorkflowRecord = {
      id: `workflow-${crypto.randomUUID()}`,
      name: input.name,
      owner: "Sophie Bennett",
      status: "Not Started",
      completion: 0,
      dueDate: new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10),
      priority: input.priority,
    };
    setPayload((current) => ({ ...current, workflows: [workflow, ...current.workflows] }));
  };

  const addEntity = (input: Omit<EntityRecord, "id">): void => {
    const entity = { ...input, id: `entity-${crypto.randomUUID()}` };
    setPayload((current) => ({ ...current, entities: [entity, ...current.entities] }));
  };

  const updateWorkflowStatus = (id: string, status: WorkflowStatus): void => {
    const completion = status === "Completed" ? 100 : status === "Not Started" ? 0 : status === "In Progress" ? 50 : status === "Under Review" ? 85 : 35;
    setPayload((current) => ({
      ...current,
      workflows: current.workflows.map((workflow) => workflow.id === id ? { ...workflow, status, completion } : workflow),
    }));
  };

  const reviewAlert = (id: string): void => {
    setPayload((current) => ({
      ...current,
      alerts: current.alerts.map((alert: ComplianceAlert) => alert.id === id ? { ...alert, state: "reviewed" } : alert),
    }));
  };

  return { ...payload, loading, error, addWorkflow, addEntity, updateWorkflowStatus, reviewAlert };
}