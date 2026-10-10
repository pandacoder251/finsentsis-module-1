import { useState } from "react";
import type { StatCardData } from "../types/dashboard.types";
import { Dialog } from "./Dialog";
import { StatCard } from "./StatCard";
import styles from "./dashboardComponents.module.css";

interface StatsGridProps { stats: StatCardData[]; loading: boolean }

export function StatsGrid({ stats, loading }: StatsGridProps) {
  const [selected, setSelected] = useState<StatCardData | null>(null);
  if (loading) return <div className={styles.statsGrid} aria-label="Loading dashboard statistics">{Array.from({ length: 6 }, (_, index) => <div key={index} className={styles.statSkeleton} />)}</div>;
  return <><section className={styles.statsGrid} aria-label="Compliance statistics">{stats.map((stat) => <StatCard key={stat.id} data={stat} onClick={(id) => setSelected(stats.find((entry) => entry.id === id) ?? null)} />)}</section>{selected && <Dialog title={selected.title} onClose={() => setSelected(null)}><div className={styles.statDetail}><strong>{selected.value}</strong><p>{selected.detail}</p><span className={styles.statePill}>Illustrative data</span></div></Dialog>}</>;
}