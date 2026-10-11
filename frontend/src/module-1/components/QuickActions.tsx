import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, FileUp, ListPlus, ScanSearch, UserRoundPlus, Workflow } from "lucide-react";
import type { EntityRecord } from "../types/dashboard.types";
import type { NewWorkflowInput } from "../types/workflow.types";
import { Dialog } from "./Dialog";
import styles from "./dashboardComponents.module.css";

interface QuickActionsProps {
  onCreateWorkflow: (input: NewWorkflowInput) => void;
  onCreateEntity: (input: Omit<EntityRecord, "id">) => void;
  onNotify: (message: string) => void;
}

type ActionPanel = "workflow" | "entity" | "scan" | null;
const acceptedTypes = [".pdf", ".doc", ".docx", ".txt", ".png", ".jpg", ".jpeg"];

export function QuickActions({ onCreateWorkflow, onCreateEntity, onNotify }: QuickActionsProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const actionScroller = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<ActionPanel>(null);
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [priority, setPriority] = useState<NewWorkflowInput["priority"]>("Medium");
  const [entityName, setEntityName] = useState("");
  const [entityType, setEntityType] = useState<EntityRecord["type"]>("Entity");
  const [country, setCountry] = useState("");
  const [metadata, setMetadata] = useState("");
  const [scanState, setScanState] = useState<"ready" | "scanning" | "complete">("ready");
  const [fileMessage, setFileMessage] = useState("");
  const [hasPreviousActions, setHasPreviousActions] = useState(false);
  const [hasNextActions, setHasNextActions] = useState(false);

  useEffect(() => {
    const scroller = actionScroller.current;
    if (!scroller) return;
    const updateScrollState = (): void => {
      setHasPreviousActions(scroller.scrollLeft > 0);
      setHasNextActions(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1);
    };
    updateScrollState();
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(scroller);
    return () => resizeObserver.disconnect();
  }, []);

  const selectFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const extension = `.${file.name.split(".").pop()?.toLocaleLowerCase() ?? ""}`;
    if (!acceptedTypes.includes(extension)) {
      setFileMessage("Unsupported file type. Choose PDF, DOC, DOCX, TXT, PNG, or JPG.");
      onNotify("File type not supported");
    } else {
      setFileMessage(`${file.name} is ready. Mock upload completed; no file was sent to a server.`);
      onNotify(`Mock document upload complete: ${file.name}`);
    }
    event.currentTarget.value = "";
  };

  const createWorkflow = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!workflowName.trim()) return;
    onCreateWorkflow({ name: workflowName.trim(), description: workflowDescription.trim(), priority });
    setWorkflowName(""); setWorkflowDescription(""); setPriority("Medium"); setPanel(null);
    onNotify("Workflow added to this preview session");
  };

  const createEntity = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!entityName.trim() || !country.trim()) return;
    onCreateEntity({ name: entityName.trim(), type: entityType, country: country.trim(), metadata: metadata.trim() });
    setEntityName(""); setCountry(""); setMetadata(""); setPanel(null);
    onNotify("Record added to this preview session");
  };

  const startScan = (): void => {
    setScanState("scanning");
    window.setTimeout(() => { setScanState("complete"); onNotify("Simulated compliance scan complete"); }, 1200);
  };
  const revealNextAction = (): void => actionScroller.current?.scrollBy({ left: hasNextActions ? 180 : -180, behavior: "smooth" });
  const ActionScrollIcon = hasNextActions ? ChevronRight : ChevronLeft;

  return (
    <section className={styles.quickActions} aria-label="Quick actions">
      <span className={styles.quickLabel}>Quick Action Drawer</span>
      <div className={styles.actionStrip}>
        <div className={styles.actionButtons} ref={actionScroller}>
          <button type="button" className={styles.actionButton} onClick={() => fileInput.current?.click()}><FileUp size={13} /><span>Upload Contract / Document</span></button>
          <button type="button" className={styles.actionButton} onClick={() => setPanel("workflow")}><Workflow size={13} /><span>Create Workflow</span></button>
          <button type="button" className={styles.actionButton} onClick={() => setPanel("entity")}><UserRoundPlus size={13} /><span>Add Entity / Employee</span></button>
          <button type="button" className={styles.actionButton} onClick={() => { setScanState("ready"); setPanel("scan"); }}><ScanSearch size={13} /><span>Run AI Compliance Scan</span></button>
        </div>
        <button type="button" className={styles.actionNext} aria-label={hasNextActions ? "Show next quick actions" : "Show previous quick actions"} onClick={revealNextAction} disabled={!hasNextActions && !hasPreviousActions}><ActionScrollIcon size={17} /></button>
        <input ref={fileInput} className={styles.hiddenInput} type="file" accept={acceptedTypes.join(",")} onChange={selectFile} aria-label="Upload a contract or document" />
      </div>
      {fileMessage && <p className={styles.fileMessage} role="status"><ListPlus size={14} />{fileMessage}</p>}

        {panel === "workflow" && <Dialog title="Create workflow" onClose={() => setPanel(null)}><form className={styles.form} onSubmit={createWorkflow}><label>Workflow name<input autoFocus required maxLength={80} value={workflowName} onChange={(event) => setWorkflowName(event.currentTarget.value)} placeholder="e.g. Annual policy review" /></label><label>Description<textarea rows={3} maxLength={240} value={workflowDescription} onChange={(event) => setWorkflowDescription(event.currentTarget.value)} placeholder="What needs to be completed?" /></label><label>Priority<select value={priority} onChange={(event) => setPriority(event.currentTarget.value as NewWorkflowInput["priority"])}><option>Low</option><option>Medium</option><option>High</option></select></label><div className={styles.dialogActions}><button type="button" className={styles.secondaryButton} onClick={() => setPanel(null)}>Cancel</button><button type="submit" className={styles.primaryButton} disabled={!workflowName.trim()}>Create workflow</button></div></form></Dialog>}

        {panel === "entity" && <Dialog title="Add entity or employee" onClose={() => setPanel(null)}><form className={styles.form} onSubmit={createEntity}><label>Name<input autoFocus required maxLength={80} value={entityName} onChange={(event) => setEntityName(event.currentTarget.value)} placeholder="Name" /></label><label>Record type<select value={entityType} onChange={(event) => setEntityType(event.currentTarget.value as EntityRecord["type"])}><option>Entity</option><option>Employee</option></select></label><label>Country<input required maxLength={60} value={country} onChange={(event) => setCountry(event.currentTarget.value)} placeholder="Country or jurisdiction" /></label><label>Metadata<input maxLength={120} value={metadata} onChange={(event) => setMetadata(event.currentTarget.value)} placeholder="Department, registration ID, or note" /></label><div className={styles.dialogActions}><button type="button" className={styles.secondaryButton} onClick={() => setPanel(null)}>Cancel</button><button type="submit" className={styles.primaryButton} disabled={!entityName.trim() || !country.trim()}>Add record</button></div></form></Dialog>}

        {panel === "scan" && <Dialog title="Run compliance scan" onClose={() => setPanel(null)}><div className={styles.scanPanel}><span className={styles.scanIcon}><ScanSearch size={22} /></span><p>This preview will simulate a scan across your current obligations and monitored entities. No AI service or external data source is used.</p>{scanState === "scanning" && <div className={styles.scanProgress} role="status"><span />Analyzing illustrative records…</div>}{scanState === "complete" && <div className={styles.scanResult} role="status"><strong>Scan complete</strong><span>3 areas flagged for review across 190+ monitored jurisdictions.</span><small>Simulated result · no data was transmitted</small></div>}<div className={styles.dialogActions}><button type="button" className={styles.secondaryButton} onClick={() => setPanel(null)}>Close</button><button type="button" className={styles.primaryButton} disabled={scanState === "scanning"} onClick={startScan}>{scanState === "scanning" ? "Scanning…" : scanState === "complete" ? "Run again" : "Start scan"}</button></div></div></Dialog>}
      </section>
    );
  }