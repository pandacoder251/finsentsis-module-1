import { useState, type ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronLeft, Search, ShieldCheck } from "lucide-react";
import { navigationItems } from "./navigation.types";
import styles from "./Navigation.module.css";

export function Navigation() {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const onSearch = (event: ChangeEvent<HTMLInputElement>): void => setQuery(event.currentTarget.value);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleItems = navigationItems.filter((item) => item.label.toLocaleLowerCase().includes(normalizedQuery));

  return (
    <>
      <button className={styles.mobileToggle} type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? "Close" : "Menu"}</button>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${mobileOpen ? styles.mobileOpen : ""}`} aria-label="Main navigation">
        <div className={styles.brandRow}>
          <div className={styles.brandMark}><ShieldCheck size={22} strokeWidth={1.7} /></div>
          {!collapsed && <div className={styles.brandText}><strong>Finsentis</strong><span>Operating System</span></div>}
          <button className={styles.collapseButton} type="button" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setCollapsed((value) => !value)}><ChevronLeft size={16} /></button>
        </div>
        {!collapsed && <label className={styles.searchBox}><Search size={17} /><input aria-label="Search navigation" placeholder="Search for anything" value={query} onChange={onSearch} /><kbd>/</kbd></label>}
        <div className={styles.navGroup}>
          {!collapsed && <div className={styles.groupTitle}>Workspace <ChevronDown size={13} /></div>}
          {visibleItems.filter((item) => item.group === "Workspace").map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} title={collapsed ? label : undefined} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`} onClick={() => setMobileOpen(false)}><Icon size={18} strokeWidth={1.7} /><span>{!collapsed && label}</span></NavLink>)}
        </div>
        <div className={styles.supportGroup}>
          {visibleItems.filter((item) => item.group === "Support").map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} title={collapsed ? label : undefined} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`} onClick={() => setMobileOpen(false)}><Icon size={18} strokeWidth={1.7} /><span>{!collapsed && label}</span></NavLink>)}
          {!collapsed && <div className={styles.profile}><div className={styles.avatar}>SB</div><div><strong>Sophie Bennett</strong><span>sophie@finsentis.com</span></div><ChevronDown size={14} /></div>}
        </div>
      </aside>
      {mobileOpen && <button className={styles.scrim} type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    </>
  );
}