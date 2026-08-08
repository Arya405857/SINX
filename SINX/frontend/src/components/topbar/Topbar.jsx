import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

/**
 * Topbar
 * Sits above the main dashboard content. Purely presentational —
 * all handlers are backend-ready placeholders.
 *
 * Props:
 * - title: string                 -> current page title
 * - userName: string              -> display name for the profile control
 * - notificationCount: number     -> badge count on the bell icon
 * - onMenuClick: () => void       -> opens the mobile sidebar drawer
 * - onSearch: (query) => void     -> placeholder search handler
 * - onToggleTheme: () => void     -> placeholder theme toggle handler
 * - isDarkMode: boolean           -> current theme state (controlled by parent)
 */
export default function Topbar({
  title = "Dashboard",
  userName = "Arya",
  notificationCount = 3,
  onMenuClick,
  onSearch,
  onToggleTheme,
  isDarkMode = false,
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    onSearch?.(query);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-100 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      {/* Mobile menu trigger */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Page title */}
      <h1 className="truncate text-[15px] font-semibold tracking-tight text-slate-900 sm:text-base">
        {title}
      </h1>

      {/* Search */}
      <form
        onSubmit={handleSearchSubmit}
        role="search"
        className="ml-2 hidden flex-1 max-w-sm items-center md:flex"
      >
        <label htmlFor="topbar-search" className="sr-only">
          Search SIGNIX
        </label>
        <div className="relative w-full">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="topbar-search"
            name="search"
            type="search"
            placeholder="Search lessons, signs, history..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={() => onToggleTheme?.()}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDarkMode ? (
            <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
          ) : (
            <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
          )}
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={`Notifications${notificationCount ? `, ${notificationCount} unread` : ""}`}
        >
          <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
          {notificationCount > 0 && (
            <span
              className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-600 px-1 text-[9.5px] font-semibold text-white"
              aria-hidden="true"
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" aria-hidden="true" />

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-haspopup="menu"
            aria-expanded={profileOpen}
            aria-label="Open profile menu"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-[12.5px] font-semibold text-white">
              {userName.charAt(0)}
            </span>
            <span className="hidden text-[13px] font-medium text-slate-700 sm:inline">
              {userName}
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:inline" aria-hidden="true" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                role="menu"
                className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg shadow-slate-200/60"
              >
                {["View profile", "Account settings", "Sign out"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="menuitem"
                    className="block w-full px-3.5 py-2 text-left text-[13px] text-slate-600 hover:bg-slate-50"
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
