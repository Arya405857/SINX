import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";

/**
 * LearningProgress
 * Shows progress through the current lesson module.
 *
 * Props:
 * - moduleName: string
 * - progress: number (0-100)
 * - lessonsCompleted: number
 * - totalLessons: number
 * - onContinueLearning: () => void  -> backend-ready placeholder
 */
export default function LearningProgress({
  moduleName = "Everyday Conversations",
  progress = 62,
  lessonsCompleted = 8,
  totalLessons = 13,
  onContinueLearning,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-labelledby="learning-progress-heading"
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <GraduationCap className="h-4.5 w-4.5" aria-hidden="true" />
          </div>
          <h2
            id="learning-progress-heading"
            className="text-[13.5px] font-semibold text-slate-900"
          >
            Learning Progress
          </h2>
        </div>
        <span className="text-[13px] font-semibold text-blue-600">
          {progress}%
        </span>
      </div>

      <p className="mt-4 text-[13.5px] font-medium text-slate-700">
        {moduleName}
      </p>
      <p className="mt-0.5 text-[12px] text-slate-500">
        {lessonsCompleted} of {totalLessons} lessons completed
      </p>

      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${moduleName} progress`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
        />
      </div>

      <button
        type="button"
        onClick={() => onContinueLearning?.()}
        className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
      >
        Continue Learning
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>
    </motion.section>
  );
}
