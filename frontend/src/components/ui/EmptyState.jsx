import { motion } from "framer-motion";

/**
 * Generic empty state block. Not auth-specific, but included as part of
 * the shared UI primitives (e.g. "No accounts linked yet" on a profile
 * settings screen that consumes this same auth module).
 */
export default function EmptyState({
  icon = null,
  title,
  description,
  action = null,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center ${className}`}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        {description && (
          <p className="max-w-xs text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </motion.div>
  );
}
