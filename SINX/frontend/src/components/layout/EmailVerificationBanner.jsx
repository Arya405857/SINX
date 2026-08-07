import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 14.5v-9Z" opacity=".15" />
      <path d="M4.5 4.75a.75.75 0 0 0-.44 1.36l5.44 3.9a.75.75 0 0 0 .87 0l5.44-3.9a.75.75 0 1 0-.87-1.22L10 8.42 4.94 4.79a.75.75 0 0 0-.44-.04Z" />
      <path d="M3 6.62v7.13A2.25 2.25 0 0 0 5.25 16h9.5A2.25 2.25 0 0 0 17 13.75V6.62l-6.13 4.4a1.5 1.5 0 0 1-1.74 0L3 6.62Z" />
    </svg>
  );
}

/**
 * Persistent banner reminding an authenticated-but-unverified user to
 * confirm their email. Typically mounted at the top of the app shell,
 * not inside the auth forms themselves.
 */
export default function EmailVerificationBanner({
  email,
  onResend,
  resending = false,
  dismissible = true,
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full overflow-hidden border-b border-blue-100 bg-blue-50"
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-blue-800 sm:px-6">
          <div className="flex items-center gap-2.5">
            <MailIcon />
            <p className="text-sm">
              Please verify your email
              {email ? (
                <>
                  {" "}
                  — we sent a link to{" "}
                  <span className="font-semibold">{email}</span>.
                </>
              ) : (
                "."
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onResend}
              disabled={resending}
              className="text-sm font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded disabled:opacity-60"
            >
              {resending ? "Resending…" : "Resend email"}
            </button>

            {dismissible && (
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss verification reminder"
                className="flex h-7 w-7 items-center justify-center rounded-md text-blue-500 hover:bg-blue-100 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M4.29 4.29a1 1 0 0 1 1.42 0L10 8.59l4.29-4.3a1 1 0 1 1 1.42 1.42L11.41 10l4.3 4.29a1 1 0 0 1-1.42 1.42L10 11.41l-4.29 4.3a1 1 0 0 1-1.42-1.42L8.59 10l-4.3-4.29a1 1 0 0 1 0-1.42Z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
