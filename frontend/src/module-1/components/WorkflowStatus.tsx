import { useState, type ChangeEvent } from "react";
import { ArrowRight, CalendarDays, Circle, CircleCheck, CircleDashed } from "lucide-react";
import type { WorkflowRecord, WorkflowStatus as WorkflowStatusType } from "../types/workflow.types";
import { Dialog } from "./Dialog";
import styles from "./dashboardComponents.module.css";

interface WorkflowStatusProps {
  workflows: WorkflowRecord[];
  onStatusChange: (id: string, status: WorkflowStatusType) => void;
  onNotify: (message: string) => void;
}

const workflowStatuses: WorkflowStatusType[] = ["Not Started", "In Progress", "Under Review", "Completed", "Blocked"];
const statusClass: Record<WorkflowStatusType, string> = { "Not Started": styles.workflowNotStarted, "In Progress": styles.workflowInProgress, "Under Review": styles.workflowUnderReview, Completed: styles.workflowCompleted, Blocked: styles.workflowBlocked };
const formatDate = (date: string): string => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00`));

export function WorkflowStatus({ workflows, onStatusChange, onNotify }: WorkflowStatusProps) {
  const [selected, setSelected] = useState<WorkflowRecord | null>(null);
  const changeStatus = (id: string, event: ChangeEvent<HTMLSelectElement>): void => {
    const status = event.currentTarget.value as WorkflowStatusType;
    onStatusChange(id, status);
    onNotify("Workflow status updated in this preview");
  };

  return (
    <section className={`${styles.panel} ${styles.workflowPanel}`} aria-labelledby="workflow-status-title">
      <div className={styles.sectionHeader}><div><span className={styles.panelEyebrow}>LIVE STATUS</span><h2 id="workflow-status-title">Workflow progress</h2></div><span className={styles.inlineMetric}>{workflows.filter((item) => item.status === "Completed").length}/{workflows.length} complete</span></div>
      <div className={styles.workflowList}>{workflows.slice(0, 4).map((workflow) => <article className={styles.workflowItem} key={workflow.id}><div className={styles.workflowTitleRow}><span className={`${styles.workflowStatusDot} ${statusClass[workflow.status]}`}><Circle size={8} fill="currentColor" /></span><h3>{workflow.name}</h3><span className={`${styles.statusPill} ${statusClass[workflow.status]}`}>{workflow.status}</span></div><div className={styles.progressTrack} role="progressbar" aria-label={`${workflow.name} completion`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={workflow.completion}><span style={{ width: `${workflow.completion}%` }} /></div><div className={styles.workflowMeta}><span>{workflow.completion}% complete</span><span><CalendarDays size={12} />{formatDate(workflow.dueDate)}</span><button type="button" className={styles.textButton} onClick={() => setSelected(workflow)}>Details <ArrowRight size={12} /></button></div><label className={styles.statusSelectLabel}>Update status<select aria-label={`Update status for ${workflow.name}`} value={workflow.status} onChange={(event) => changeStatus(workflow.id, event)}>{workflowStatuses.map((status) => <option key={status}>{status}</option>)}</select></label></article>)}{workflows.length === 0 && <div className={styles.emptyState}><CircleDashed size={17} />No workflows yet</div>}</div>
      {selected && <Dialog title={selected.name} onClose={() => setSelected(null)}><div className={styles.workflowDetail}><span className={`${styles.statusPill} ${statusClass[selected.status]}`}>{selected.status}</span><div className={styles.detailGrid}><span>Owner<strong>{selected.owner}</strong></span><span>Due date<strong>{formatDate(selected.dueDate)}</strong></span><span>Priority<strong>{selected.priority}</strong></span><span>Completion<strong>{selected.completion}%</strong></span></div><p className={styles.finePrint}>Status changes are local to this preview and are not persisted to a server.</p><CircleCheck size={18} className={styles.workflowDetailIcon} /></div></Dialog>}
    </section>
  );
}