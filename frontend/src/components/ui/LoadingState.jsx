import { motion } from "framer-motion";
import { Spinner } from "./Button";

/**
 * Full-block loading state — used while a form's async submission
 * (or an initial data fetch, e.g. validating a reset-password token)
 * is in flight.
 */
export default function LoadingState({
  label = "Loading…",
  className = "",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 py-12 text-slate-500 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Spinner className="h-6 w-6 text-blue-600" />
      </motion.div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

/** Compact inline spinner for use next to a label or inside a small area. */
export function InlineLoading({ label = "Loading", className = "" }) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 text-sm text-slate-500 ${className}`}
    >
      <Spinner className="h-4 w-4 text-blue-600" />
      {label}
    </span>
  );
}
