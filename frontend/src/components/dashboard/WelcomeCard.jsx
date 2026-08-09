import React from "react";
import { motion } from "framer-motion";
import { PlayCircle, Zap } from "lucide-react";

/**
 * WelcomeCard
 * Greets the user by name and surfaces the two most common next actions.
 *
 * Props:
 * - userName: string
 * - onContinueLearning: () => void  -> backend-ready placeholder
 * - onQuickTranslate: () => void    -> backend-ready placeholder
 */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function WelcomeCard({
  userName = "Arya",
  onContinueLearning,
  onQuickTranslate,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-labelledby="welcome-heading"
      className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50 sm:flex-row sm:items-center"
    >
      <div>
        <h2
          id="welcome-heading"
          className="text-xl font-semibold tracking-tight text-slate-900 sm:text-[22px]"
        >
          {getGreeting()}, {userName}
        </h2>
        <p className="mt-1 text-[13.5px] text-slate-500">
          Ready to keep building your sign language fluency today?
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => onContinueLearning?.()}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <PlayCircle className="h-4 w-4" aria-hidden="true" />
          Continue Learning
        </button>
        <button
          type="button"
          onClick={() => onQuickTranslate?.()}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Zap className="h-4 w-4 text-blue-600" aria-hidden="true" />
          Quick Translate
        </button>
      </div>
    </motion.section>
  );
}
