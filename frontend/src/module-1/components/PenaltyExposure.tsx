import { useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PenaltyDataset, PenaltyPeriod } from "../types/analytics.types";
import styles from "./dashboardComponents.module.css";

const periods: PenaltyPeriod[] = ["Monthly", "Quarterly", "Yearly"];
const formatMoney = (value: number): string => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(value);
interface PenaltyExposureProps { datasets: Record<PenaltyPeriod, PenaltyDataset> }

export function PenaltyExposure({ datasets }: PenaltyExposureProps) {
  const [period, setPeriod] = useState<PenaltyPeriod>("Monthly");
  const dataset = datasets[period];
  const improving = dataset.change < 0;

  return (
    <section className={`${styles.panel} ${styles.penaltyPanel}`} aria-labelledby="penalty-exposure-title">
      <div className={styles.sectionHeader}><div><span className={styles.panelEyebrow}>FINANCIAL RISK</span><h2 id="penalty-exposure-title">Penalty exposure</h2></div><div className={styles.tabs} role="tablist" aria-label="Penalty exposure period">{periods.map((item) => <button type="button" key={item} role="tab" aria-selected={period === item} className={period === item ? styles.activeTab : ""} onClick={() => setPeriod(item)}>{item}</button>)}</div></div>
      <div className={styles.penaltySummary}><div><span>Total potential exposure</span><strong>{formatMoney(dataset.total)}</strong></div><span className={`${styles.changeBadge} ${improving ? styles.changeGood : styles.changeBad}`}>{improving ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}{Math.abs(dataset.change)}% <small>vs prior period</small></span></div>
      <div className={styles.chartArea} aria-label={`${period} penalty exposure chart`}><ResponsiveContainer width="100%" height="100%"><LineChart data={dataset.points} margin={{ top: 10, right: 10, bottom: 0, left: -14 }}><CartesianGrid stroke="#2b2d31" vertical={false} strokeDasharray="3 5" /><XAxis dataKey="label" tick={{ fill: "#85888c", fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tickFormatter={(value: number) => `$${value.toLocaleString()}`} tick={{ fill: "#85888c", fontSize: 9 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "#202124", border: "1px solid #3a3c40", borderRadius: 6, color: "#f0f1f2", fontSize: 11 }} formatter={(value) => [`$${Number(value).toLocaleString()}k`, "Exposure"]} labelStyle={{ color: "#c3c5c9" }} /><Line type="monotone" dataKey="exposure" stroke="#4a9bff" strokeWidth={2.2} dot={{ fill: "#4a9bff", stroke: "#161719", strokeWidth: 2, r: 3 }} activeDot={{ r: 5, fill: "#a8d2ff" }} /><Line type="monotone" dataKey="previous" stroke="#676b70" strokeWidth={1.5} strokeDasharray="4 5" dot={false} /></LineChart></ResponsiveContainer></div>
      <div className={styles.chartLegend}><span><i />Current {period.toLocaleLowerCase()}</span><span><i />Previous period</span><span className={styles.currencyNote}>Values shown in thousands</span></div>
    </section>
  );
}