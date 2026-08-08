import React from "react";
import { Clock, Hand, Languages, Target, CheckCircle2 } from "lucide-react";
import StatCard from "../cards/StatCard";

/**
 * StatisticsGrid
 * Snapshot of the user's activity and performance.
 *
 * Props:
 * - stats: {
 *     todaysPractice: string,
 *     signsLearned: number,
 *     translations: number,
 *     accuracy: string,
 *     completionRate: string,
 *   }
 */
export default function StatisticsGrid({
  stats = {
    todaysPractice: "24 min",
    signsLearned: 128,
    translations: 342,
    accuracy: "94%",
    completionRate: "78%",
  },
}) {
  const cards = [
    {
      icon: Clock,
      label: "Today's Practice",
      value: stats.todaysPractice,
      accent: "blue",
      trend: { direction: "up", value: "+12%" },
    },
    {
      icon: Hand,
      label: "Signs Learned",
      value: stats.signsLearned,
      accent: "indigo",
      trend: { direction: "up", value: "+8" },
    },
    {
      icon: Languages,
      label: "Translations",
      value: stats.translations,
      accent: "blue",
    },
    {
      icon: Target,
      label: "Accuracy",
      value: stats.accuracy,
      accent: "emerald",
      trend: { direction: "up", value: "+2%" },
    },
    {
      icon: CheckCircle2,
      label: "Completion Rate",
      value: stats.completionRate,
      accent: "amber",
    },
  ];

  return (
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="mb-3.5 text-[13.5px] font-semibold text-slate-900">
        Statistics
      </h2>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card, i) => (
          <StatCard key={card.label} {...card} delay={i * 0.05} />
        ))}
      </div>
    </section>
  );
}
