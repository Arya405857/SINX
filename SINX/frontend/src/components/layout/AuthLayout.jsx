import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function SignixMark({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
        S
      </span>
      <span className="text-lg font-semibold tracking-tight text-slate-900">
        Signix
      </span>
    </div>
  );
}

/**
 * Shared shell for every auth screen: logo, optional back link, a centered
 * card for the form, and a branding panel on larger screens.
 *
 * `children` is the form (LoginForm, RegisterForm, etc.).
 */
export default function AuthLayout({
  children,
  title,
  subtitle,
  footer,
  showBrandPanel = true,
}) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Form column */}
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" aria-label="Return to Signix home"><SignixMark className="mb-10" /></Link>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {(title || subtitle) && (
              <div className="mb-8 flex flex-col gap-1.5">
                {title && (
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm text-slate-500">{subtitle}</p>
                )}
              </div>
            )}

            {children}
          </motion.div>

          {footer && (
            <div className="mt-8 text-center text-sm text-slate-500">
              {footer}
            </div>
          )}
        </div>
      </div>

      {/* Brand panel */}
      {showBrandPanel && (
        <div className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:w-1/2">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.55), transparent 55%), radial-gradient(circle at 80% 75%, rgba(37,99,235,0.35), transparent 50%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-1 flex-col justify-between p-16">
            <SignixMark className="[&_span:last-child]:text-white" />

            <div className="flex flex-col gap-4">
              <p className="max-w-md text-3xl font-semibold leading-tight text-white">
                Sign language, understood instantly.
              </p>
              <p className="max-w-sm text-sm text-slate-400">
                Signix turns sign language into real-time captions and
                speech — built for classrooms, workplaces, and everyday
                conversation.
              </p>
            </div>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Signix. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
