import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Hand,
  GraduationCap,
  History,
  UserCircle,
  Settings,
  LogOut,
  X,
  Sparkles,
} from "lucide-react";

/**
 * Sidebar
 * Primary navigation for the SIGNIX dashboard shell.
 *
 * Props:
 * - activeItem: string        -> id of the currently active menu item
 * - onNavigate: (id) => void  -> called when a menu item is selected (routing placeholder)
 * - isOpen: boolean           -> controls the mobile drawer visibility
 * - onClose: () => void       -> called to close the mobile drawer
 * - onLogout: () => void      -> backend-ready placeholder for sign-out
 */

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "translator", label: "Translator", icon: Hand },
  { id: "learning", label: "Learning", icon: GraduationCap },
  { id: "history", label: "History", icon: History },
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "settings", label: "Settings", icon: Settings },
];

function SidebarContent({ activeItem, onNavigate, onLogout, onClose }) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-sm shadow-blue-500/30">
          <Sparkles className="h-4.5 w-4.5" strokeWidth={2.25} aria-hidden="true" />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold tracking-tight text-slate-900">
            SIGNIX
          </p>
          <p className="text-[11px] font-medium text-slate-400">
            Communicate
            Without Barriers
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          aria-label="Close navigation menu"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 space-y-1 overflow-y-auto px-3.5"
        aria-label="Primary navigation"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                isActive
                  ? "text-blue-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-xl bg-blue-50"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                className={`relative z-10 h-[18px] w-[18px] shrink-0 transition-transform duration-150 group-hover:scale-105 ${
                  isActive ? "text-blue-600" : "text-slate-400"
                }`}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-100 px-3.5 py-4">
        <button
          type="button"
          onClick={() => onLogout?.()}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium text-slate-500 transition-colors duration-150 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({
  activeItem = "dashboard",
  onNavigate,
  isOpen = false,
  onClose,
  onLogout,
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden w-64 shrink-0 border-r border-slate-100 bg-white lg:block"
        aria-label="Sidebar"
      >
        <SidebarContent
          activeItem={activeItem}
          onNavigate={onNavigate}
          onLogout={onLogout}
          onClose={onClose}
        />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] lg:hidden"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Sidebar"
            >
              <SidebarContent
                activeItem={activeItem}
                onNavigate={onNavigate}
                onLogout={onLogout}
                onClose={onClose}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
