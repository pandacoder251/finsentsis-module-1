import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { routeTitles } from "./nav/navigation.types";
import styles from "./App.module.css";

const Dashboard = lazy(async () => {
  const module = await import("./module-1/pages/Dashboard");
  return { default: module.Dashboard };
});

function DestinationPage() {
  const { pathname } = useLocation();
  const title = routeTitles[pathname as keyof typeof routeTitles] ?? "Workspace";
  return (
    <section className={styles.destination}>
      <span className={styles.eyebrow}>FINSENTIS OPERATING SYSTEM</span>
      <h1>{title}</h1>
      <p>This workspace module is represented with illustrative dashboard data in this frontend preview.</p>
      <p className={styles.note}>No backend connection is configured. Changes in this preview are local to the current session.</p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          {Object.entries(routeTitles).map(([path]) => (
            <Route key={path} path={path.slice(1)} element={path === "/dashboard" ? <Suspense fallback={<p className={styles.loading}>Loading dashboard…</p>}><Dashboard /></Suspense> : <DestinationPage />} />
          ))}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
