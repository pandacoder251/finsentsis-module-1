import { useState } from "react";
import { AlertTriangle, ArrowRight, CalendarDays, Check, Clock3, ExternalLink } from "lucide-react";
import type { ComplianceAlert } from "../types/alert.types";
import { Dialog } from "./Dialog";
import styles from "./dashboardComponents.module.css";

interface CriticalAlertsProps {
  alerts: ComplianceAlert[];
  onReview: (id: string) => void;
  onNotify: (message: string) => void;
  referenceDate: string;
}

const formatCurrency = (value: number): string => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const formatDate = (date: string): string => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00`));

export function CriticalAlerts({ alerts, onReview, onNotify, referenceDate }: CriticalAlertsProps) {
  const [selected, setSelected] = useState<ComplianceAlert | null>(null);
  const [showAll, setShowAll] = useState(false);
  const activeAlerts = alerts.filter((alert) => alert.state === "open");
  const outstanding = alerts.filter((alert) => alert.state === "open").length;
  const reviewSelected = (alert: ComplianceAlert): void => {
    onReview(alert.id);
    setSelected(null);
    onNotify("Alert marked as reviewed in this preview");
  };

  const alertRow = (alert: ComplianceAlert, detailed = false) => {
    const dayDelta = Math.ceil((new Date(`${alert.dueDate}T23:59:59`).getTime() - new Date(`${referenceDate}T00:00:00`).getTime()) / 86_400_000);
    return <article className={styles.alertItem} key={alert.id}><div className={styles.alertMarker} /><div className={styles.alertInfo}><div className={styles.alertTags}><span className={`${styles.severityTag} ${styles[`severity_${alert.severity}`]}`}>{alert.severity}</span><span>{alert.category}</span></div><h3>{alert.title}</h3><p>{alert.description}</p><div className={styles.alertMeta}><span className={dayDelta < 0 ? styles.overdue : ""}><CalendarDays size={13} />{dayDelta < 0 ? `Overdue · ${formatDate(alert.dueDate)}` : `Due ${formatDate(alert.dueDate)}`}</span><span><Clock3 size={13} />{dayDelta < 0 ? `${Math.abs(dayDelta)}d overdue` : `${dayDelta}d left`}</span></div></div><div className={styles.alertExposure}><small>Penalty exposure</small><strong>{formatCurrency(alert.penaltyExposure)}</strong>{detailed && alert.state === "open" && <button type="button" className={styles.checkButton} onClick={() => setSelected(alert)}>Check now <ArrowRight size={13} /></button>}{detailed && alert.state === "reviewed" && <span className={styles.reviewed}><Check size={13} />Reviewed</span>}</div>{!detailed && <button type="button" className={styles.alertOpen} aria-label={`View ${alert.title}`} onClick={() => setSelected(alert)}><ExternalLink size={14} /></button>}</article>;
  };

  return (
    <section className={styles.panel} aria-labelledby="critical-alerts-title">
      <div className={styles.sectionHeader}><div><span className={styles.panelEyebrow}>ACTION REQUIRED</span><h2 id="critical-alerts-title">Critical alerts</h2></div><span className={styles.alertCount}><AlertTriangle size={13} />{outstanding} open</span></div>
      <div className={styles.alertList}>{activeAlerts.slice(0, 3).map((alert) => alertRow(alert))}{activeAlerts.length === 0 && <div className={styles.emptyState}><Check size={17} />All alerts are reviewed</div>}</div>
      <div className={styles.alertFooter}><span><i />{alerts.filter((alert) => alert.severity === "critical" && alert.state === "open").length} critical alerts</span><button type="button" className={styles.textButton} onClick={() => setShowAll(true)}>View all alerts <ArrowRight size={14} /></button></div>
      {showAll && <Dialog title="All compliance alerts" wide onClose={() => setShowAll(false)}><div className={styles.allAlerts}>{alerts.map((alert) => alertRow(alert, true))}</div></Dialog>}
      {selected && <Dialog title={selected.title} onClose={() => setSelected(null)}><div className={styles.alertDetail}><span className={`${styles.severityTag} ${styles[`severity_${selected.severity}`]}`}>{selected.severity} severity</span><p>{selected.description}</p><div className={styles.detailGrid}><span>Category<strong>{selected.category}</strong></span><span>Due date<strong>{formatDate(selected.dueDate)}</strong></span><span>Penalty exposure<strong>{formatCurrency(selected.penaltyExposure)}</strong></span></div><p className={styles.finePrint}>Alert details are illustrative. Review status is stored only in this browser session.</p>{selected.state === "open" ? <button type="button" className={styles.primaryButton} onClick={() => reviewSelected(selected)}><Check size={15} />Mark as reviewed</button> : <span className={styles.reviewed}><Check size={14} />Reviewed</span>}</div></Dialog>}
    </section>
  );
}