import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * AIRecommendation
 * Suggests a next lesson based on (future) AI-driven learning analysis.
 *
 * Props:
 * - lessonTitle: string
 * - reason: string
 * - onStartLesson: () => void  -> backend-ready placeholder
 */
export default function AIRecommendation({
  lessonTitle = "Workplace & Professional Signs",
  reason = "Based on your recent accuracy in everyday conversation drills.",
  onStartLesson,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-labelledby="ai-recommendation-heading"
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
        <h2
          id="ai-recommendation-heading"
          className="text-[13.5px] font-semibold text-slate-900"
        >
          AI Recommendation
        </h2>
      </div>

      <p className="mt-4 text-[13.5px] font-medium text-slate-700">
        {lessonTitle}
      </p>
      <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
        {reason}
      </p>

      <button
        type="button"
        onClick={() => onStartLesson?.()}
        className="group mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
      >
        Start Lesson
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>
    </motion.section>
  );
}
