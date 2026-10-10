import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { RiskDistributionItem } from "../types/analytics.types";
import styles from "./dashboardComponents.module.css";

interface RiskDistributionProps { data: RiskDistributionItem[] }

export function RiskDistribution({ data }: RiskDistributionProps) {
  const totalRisks = data.reduce((total, item) => total + item.count, 0);
  return (
    <section className={`${styles.panel} ${styles.riskDistributionPanel}`} aria-labelledby="risk-distribution-title">
      <div className={styles.sectionHeader}><div><span className={styles.panelEyebrow}>EXPOSURE MIX</span><h2 id="risk-distribution-title">Risk distribution</h2></div><span className={styles.inlineMetric}>By severity</span></div>
      <div className={styles.riskChartWrap}><div className={styles.donutChart}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="count" nameKey="level" innerRadius="68%" outerRadius="92%" paddingAngle={3} stroke="none">{data.map((item) => <Cell key={item.level} fill={item.color} />)}</Pie><Tooltip contentStyle={{ background: "#202124", border: "1px solid #3a3c40", borderRadius: 6, color: "#f0f1f2", fontSize: 11 }} formatter={(value) => [Number(value).toLocaleString(), "Risks"]} /></PieChart></ResponsiveContainer><div className={styles.donutCenter}><strong>{totalRisks.toLocaleString()}</strong><span>Total risks</span></div></div><div className={styles.riskLegend}>{data.map((item) => <div className={styles.riskLegendItem} key={item.level}><i style={{ background: item.color }} /><span>{item.level}</span><strong>{item.count}</strong><small>{totalRisks > 0 ? ((item.count / totalRisks) * 100).toFixed(0) : "0"}%</small></div>)}</div></div>
      <p className={styles.chartFootnote}>Illustrative distribution across monitored controls.</p>
    </section>
  );
}