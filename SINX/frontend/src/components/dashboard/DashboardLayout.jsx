import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const routes = { dashboard: "/dashboard", translator: "/translator", learning: "/learning", history: "/history", profile: "/profile", settings: "/settings" };

  const handleNavigate = (item) => {
    setIsDrawerOpen(false);
    if (routes[item]) navigate(routes[item]);
    onNavigate?.(item);
  };
  const handleLogout = () => {
    setIsDrawerOpen(false);
    signOut();
    if (onLogout) onLogout();
    else navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activeItem={activeItem}
        onNavigate={handleNavigate}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
        <Topbar
          title={title}
          userName={userName}
          onMenuClick={() => setIsDrawerOpen(true)}
          onToggleTheme={() => setIsDarkMode((v) => !v)}
          isDarkMode={isDarkMode}
          onProfileAction={(action) => {
            if (action === "profile") navigate("/profile");
            if (action === "settings") navigate("/settings");
            if (action === "logout") handleLogout();
          }}
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
