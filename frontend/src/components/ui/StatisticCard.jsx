import { motion } from "framer-motion"
import { fadeUp } from "../../utils/motion"

export default function StatisticCard({ icon: Icon, value, label }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
        <Icon size={22} aria-hidden="true" />
      </span>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-sm leading-relaxed text-muted">{label}</p>
    </motion.div>
  )
}
