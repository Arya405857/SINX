import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

/**
 * DashboardLayout
 * Reusable shell (Sidebar + Topbar + content area) for every
 * authenticated page in SIGNIX — not just the dashboard.
 *
 * Props:
 * - title: string          -> page title shown in the Topbar
 * - activeItem: string     -> id of the active sidebar item
 * - userName: string       -> shown in the Topbar profile control
 * - onNavigate: (id) => void
 * - onLogout: () => void
 * - children: ReactNode
 */
export default function DashboardLayout({
  title = "Dashboard",
  activeItem = "dashboard",
  userName = "Arya",
  onNavigate,
  onLogout,
  children,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activeItem={activeItem}
        onNavigate={onNavigate}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLogout={onLogout}
      />

      <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
        <Topbar
          title={title}
          userName={userName}
          onMenuClick={() => setIsDrawerOpen(true)}
          onToggleTheme={() => setIsDarkMode((v) => !v)}
          isDarkMode={isDarkMode}
        />

        <main
          id="main-content"
          className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        >
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
