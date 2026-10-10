import { Outlet } from "react-router-dom";
import { Navigation } from "../nav/Navigation";
import styles from "./DashboardLayout.module.css";

export function DashboardLayout() {
  return <div className={styles.shell}><Navigation /><main className={styles.main}><Outlet /></main></div>;
}