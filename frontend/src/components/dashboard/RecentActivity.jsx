import React from "react";
import { motion } from "framer-motion";
import { Camera, Mic, Type, GraduationCap } from "lucide-react";

/**
 * RecentActivity
 * Chronological feed of the user's latest actions across the platform.
 *
 * Props:
 * - activities: Array<{ id, type, title, time }>
 */
const ICONS = {
  camera: Camera,
  speech: Mic,
  text: Type,
  learning: GraduationCap,
};

const DEFAULT_ACTIVITIES = [
  { id: 1, type: "camera", title: "Translated \u201cGood morning\u201d via camera", time: "10 min ago" },
  { id: 2, type: "learning", title: "Completed lesson: Family & Relationships", time: "1 hour ago" },
  { id: 3, type: "speech", title: "Speech-to-sign session, 6 phrases", time: "3 hours ago" },
  { id: 4, type: "text", title: "Translated a paragraph to sign sequence", time: "Yesterday" },
];

export default function RecentActivity({ activities = DEFAULT_ACTIVITIES }) {
  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50"
    >
      <h2
        id="recent-activity-heading"
        className="text-[13.5px] font-semibold text-slate-900"
      >
        Recent Activity
      </h2>

      <ul className="mt-4 space-y-1">
        {activities.map((activity, i) => {
          const Icon = ICONS[activity.type] || Camera;
          return (
            <motion.li
              key={activity.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-slate-700">
                  {activity.title}
                </p>
                <p className="text-[11.5px] text-slate-400">{activity.time}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
