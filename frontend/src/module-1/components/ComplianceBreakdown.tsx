import { Building2, Scale, UsersRound, Workflow } from "lucide-react";
import type { ComplianceCategory } from "../types/analytics.types";
import styles from "./dashboardComponents.module.css";

interface ComplianceBreakdownProps { categories: ComplianceCategory[]; className?: string }
const iconById = { hr: UsersRound, finance: Building2, legal: Scale, operations: Workflow };
const toneByValue = (value: number): string => value >= 88 ? styles.progressGood : value >= 78 ? styles.progressMedium : styles.progressLow;

export function ComplianceBreakdown({ categories, className = "" }: ComplianceBreakdownProps) {
  return (
    <section className={`${styles.panel} ${className}`} aria-labelledby="compliance-breakdown-title">
      <div className={styles.sectionHeader}><div><span className={styles.panelEyebrow}>CONTROL HEALTH</span><h2 id="compliance-breakdown-title">Compliance breakdown</h2></div></div>
      <div className={styles.complianceList}>{categories.map((category) => {
        const Icon = iconById[category.id as keyof typeof iconById] ?? Building2;
        return <div className={styles.complianceItem} key={category.id}><div className={styles.complianceTitle}><span className={styles.complianceIcon}><Icon size={15} /></span><strong>{category.name}</strong><span className={styles.complianceValue}>{category.percentage}%</span></div><div className={styles.progressTrack} role="progressbar" aria-label={category.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={category.percentage}><span className={toneByValue(category.percentage)} style={{ width: `${category.percentage}%` }} /></div><div className={styles.complianceFoot}><span>{category.percentage >= 88 ? "On track" : category.percentage >= 78 ? "Needs attention" : "At risk"}</span><span className={category.change >= 0 ? styles.positiveText : styles.negativeText}>{category.change > 0 ? "+" : ""}{category.change}% <small>vs last month</small></span></div></div>;
      })}</div>
    </section>
  );
}