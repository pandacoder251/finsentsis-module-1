import { ArrowDownRight, ArrowRight, ArrowUpRight, MoreVertical } from "lucide-react";
import type { StatCardData } from "../types/dashboard.types";
import styles from "./dashboardComponents.module.css";

interface StatCardProps {
  data: StatCardData;
  onClick?: (id: string) => void;
}

export function StatCard({ data, onClick }: StatCardProps) {
  const TrendIcon = data.trendDirection === "up" ? ArrowUpRight : data.trendDirection === "down" ? ArrowDownRight : ArrowRight;
  return (
    <button type="button" className={`${styles.statCard} ${styles[`stat_${data.status}`]}`} onClick={() => onClick?.(data.id)} aria-label={`${data.title}: ${data.value}. View details`}>
      <div className={styles.statTop}><span className={styles.statTitle}>{data.title}</span><MoreVertical size={13} className={styles.statMenuIcon} aria-hidden="true" /></div>
      <strong className={styles.statValue}>{data.value}{data.id === "compliance-health" && <small>/100</small>}</strong>
      <span className={styles.statDescription}><TrendIcon size={10} className={`${styles.trendIcon} ${data.trendDirection === "neutral" ? styles.trendNeutral : ""}`} />{data.description}</span>
    </button>
  );
}