import { AnimatePresence, motion } from "framer-motion";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.68-1.68a.75.75 0 0 0-1.06 1.061l2.32 2.32a.75.75 0 0 0 1.137-.089l4-5.52Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Form-level success banner — e.g. "Password reset link sent",
 * "Account created successfully".
 */
export default function SuccessState({
  title = "Success",
  message,
  action = null,
  className = "",
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className={`flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700 ${className}`}
      >
        <CheckIcon />
        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {message && (
            <p className="mt-0.5 text-sm text-green-600">{message}</p>
          )}
          {action && <div className="mt-2">{action}</div>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
