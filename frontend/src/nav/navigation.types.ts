import type { LucideIcon } from "lucide-react";
import { Activity, Bot, ClipboardCheck, FileClock, Headset, LayoutDashboard, Settings2, UserRound } from "lucide-react";

export type NavigationPath = "/dashboard" | "/intelligence" | "/automation" | "/copilot" | "/evidence" | "/marketplace" | "/help" | "/settings";

export interface NavigationItem {
  label: string;
  path: NavigationPath;
  icon: LucideIcon;
  group: "Workspace" | "Support";
}

export const navigationItems: NavigationItem[] = [
  { label: "Global Dashboard & Risk Radar", path: "/dashboard", icon: LayoutDashboard, group: "Workspace" },
  { label: "AI Regulatory Intelligence", path: "/intelligence", icon: Activity, group: "Workspace" },
  { label: "Policy-to-Process Automation", path: "/automation", icon: ClipboardCheck, group: "Workspace" },
  { label: "Autonomous Compliance Copilot", path: "/copilot", icon: Bot, group: "Workspace" },
  { label: "Audit-Ready Evidence", path: "/evidence", icon: FileClock, group: "Workspace" },
  { label: "Consulting & Marketplace", path: "/marketplace", icon: UserRound, group: "Workspace" },
  { label: "Help and Support", path: "/help", icon: Headset, group: "Support" },
  { label: "Settings", path: "/settings", icon: Settings2, group: "Support" },
];

export const routeTitles: Record<NavigationPath, string> = {
  "/dashboard": "Global Dashboard & Risk Radar",
  "/intelligence": "AI Regulatory Intelligence Layer",
  "/automation": "Policy-to-Process Automation",
  "/copilot": "Autonomous Compliance Copilot",
  "/evidence": "Audit-Ready Evidence & Blockchain Trail",
  "/marketplace": "Consulting & Expert Marketplace",
  "/help": "Help and Support",
  "/settings": "Settings",
};