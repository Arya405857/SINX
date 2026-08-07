import { AnimatePresence, motion } from "framer-motion";

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.63-1.516 2.63H3.72c-1.347 0-2.189-1.463-1.515-2.63L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Form-level error banner. Field-level errors live on <Input error="…" />;
 * this is for whole-form / server-level failures
 * (e.g. "Invalid email or password", "Network error, try again").
 */
export default function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className = "",
}) {
  if (!message && !title) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        role="alert"
        aria-live="assertive"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        className={`flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 ${className}`}
      >
        <AlertIcon />
        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {message && <p className="mt-0.5 text-sm text-red-600">{message}</p>}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 text-sm font-medium text-red-700 underline underline-offset-2 hover:text-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
            >
              Try again
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
