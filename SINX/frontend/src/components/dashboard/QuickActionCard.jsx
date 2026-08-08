import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * QuickActionCard
 * A single tappable shortcut used inside the Quick Actions section.
 *
 * Props:
 * - icon: LucideIcon
 * - label: string
 * - description: string
 * - onClick: () => void   -> backend-ready placeholder
 * - delay: number         -> stagger delay for entrance animation
 */
export default function QuickActionCard({
  icon: Icon,
  label,
  description,
  onClick,
  delay = 0,
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick?.()}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm shadow-slate-200/50 transition-colors hover:border-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      aria-label={label}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        {Icon && <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />}
      </div>

      <div>
        <p className="text-[13.5px] font-semibold text-slate-900">{label}</p>
        {description && (
          <p className="mt-0.5 text-[12px] text-slate-500">{description}</p>
        )}
      </div>

      <ArrowUpRight
        className="absolute right-4 top-4 h-4 w-4 text-slate-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        aria-hidden="true"
      />
    </motion.button>
  );
}
