import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

/**
 * TranslatorLayout
 *
 * Reusable page-level layout for the Signix AI Translator experience.
 * This component is presentation-only: it defines the page shell,
 * header, and content region so that feature components (speech,
 * text, image, and sign-language translators) can be composed inside
 * it without duplicating layout, spacing, or chrome.
 *
 * No business logic, API calls, AI logic, routing, or state
 * management lives here — it simply renders `children` inside a
 * consistent, accessible dashboard shell.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Feature content to render
 *   inside the main content card (e.g. translator panels/tabs).
 * @param {React.ReactNode} [props.actions] - Optional slot for
 *   header-level controls (e.g. language selector, settings button),
 *   rendered next to the title block. Purely a layout slot.
 */
export default function TranslatorLayout({ children, actions }) {
  return (
    <DashboardLayout title="AI Translator" activeItem="translator">
      <div>
        {/* Page header */}
        <header className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">AI Translator</h2>
              <p className="mt-1.5 max-w-2xl text-sm text-slate-600 sm:text-base">
                Translate speech, text, images, and sign language using AI.
              </p>
            </div>

            {actions ? (
              <div className="flex shrink-0 items-center gap-2">{actions}</div>
            ) : null}
          </div>
        </header>

        {/* Main content area */}
        <div
          aria-label="AI Translator content"
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60 sm:p-6 lg:p-8"
        >
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
}
