import { motion } from "framer-motion"
import { fadeUp } from "../../utils/motion"

export default function TechnologyBadge({ icon: Icon, label }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-surface px-5 py-3 shadow-sm"
    >
      <Icon size={20} className="text-accent" aria-hidden="true" />
      <span className="text-base font-medium text-foreground">{label}</span>
    </motion.div>
  )
}
