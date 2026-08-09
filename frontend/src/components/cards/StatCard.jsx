import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * StatCard
 * A single metric tile used inside the statistics grid.
 *
 * Props:
 * - icon: LucideIcon
 * - label: string
 * - value: string | number
 * - trend: { direction: "up" | "down", value: string } (optional)
 * - accent: string -> tailwind color token, e.g. "blue" | "indigo" | "emerald" | "amber"
 * - delay: number -> stagger delay for entrance animation
 */
const ACCENTS = {
  blue: "bg-blue-50 text-blue-600",
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  accent = "blue",
  delay = 0,
}) {
  const TrendIcon = trend?.direction === "down" ? TrendingDown : TrendingUp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENTS[accent] || ACCENTS.blue}`}
          aria-hidden="true"
        >
          {Icon && <Icon className="h-5 w-5" strokeWidth={2} />}
        </div>

        {trend && (
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
              trend.direction === "down"
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            <TrendIcon className="h-3 w-3" aria-hidden="true" />
            {trend.value}
          </span>
        )}
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-[13px] font-medium text-slate-500">{label}</p>
    </motion.div>
  );
}
