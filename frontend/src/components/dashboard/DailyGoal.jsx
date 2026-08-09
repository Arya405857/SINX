import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

/**
 * DailyGoal
 * Circular progress indicator for today's practice goal.
 *
 * Props:
 * - minutesDone: number
 * - minutesGoal: number
 * - streakDays: number
 */
export default function DailyGoal({
  minutesDone = 24,
  minutesGoal = 30,
  streakDays = 6,
}) {
  const percent = Math.min(100, Math.round((minutesDone / minutesGoal) * 100));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <section
      aria-labelledby="daily-goal-heading"
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <Flame className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
        <h2 id="daily-goal-heading" className="text-[13.5px] font-semibold text-slate-900">
          Daily Goal
        </h2>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <div
          className="relative flex h-24 w-24 shrink-0 items-center justify-center"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Daily practice goal progress"
        >
          <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-100"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-blue-600"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            />
          </svg>
          <span className="absolute text-[15px] font-semibold text-slate-900">
            {percent}%
          </span>
        </div>

        <div>
          <p className="text-[13.5px] font-medium text-slate-700">
            {minutesDone} / {minutesGoal} min
          </p>
          <p className="mt-0.5 text-[12px] text-slate-500">
            Practice goal for today
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-amber-600">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            {streakDays}-day streak
          </p>
        </div>
      </div>
    </section>
  );
}
