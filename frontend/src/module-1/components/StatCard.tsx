import { ArrowDownRight, ArrowRight, ArrowUpRight, Globe2, HeartPulse, ListChecks, ShieldAlert, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StatCardData } from "../types/dashboard.types";
import styles from "./dashboardComponents.module.css";

interface StatCardProps {
  data: StatCardData;
  onClick?: (id: string) => void;
}

const iconMap: Record<StatCardData["icon"], LucideIcon> = {
  health: HeartPulse,
  exposure: Wallet,
  obligations: ListChecks,
  tasks: ListChecks,
  alerts: ShieldAlert,
  countries: Globe2,
};

export function StatCard({ data, onClick }: StatCardProps) {
  const Icon = iconMap[data.icon];
  const TrendIcon = data.trendDirection === "up" ? ArrowUpRight : data.trendDirection === "down" ? ArrowDownRight : ArrowRight;
  return (
    <button type="button" className={`${styles.statCard} ${styles[`stat_${data.status}`]}`} onClick={() => onClick?.(data.id)} aria-label={`${data.title}: ${data.value}. View details`}>
      <div className={styles.statTop}><span className={styles.statIcon}><Icon size={17} /></span><TrendIcon size={15} className={`${styles.trendIcon} ${data.trendDirection === "neutral" ? styles.trendNeutral : ""}`} /></div>
      <span className={styles.statTitle}>{data.title}</span>
      <strong className={styles.statValue}>{data.value}</strong>
      <span className={styles.statDescription}>{data.description}</span>
    </button>
  );
}