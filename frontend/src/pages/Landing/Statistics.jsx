import { motion } from "framer-motion"
import { Zap, Layers, Accessibility, Timer } from "lucide-react"
import SectionTitle from "../../components/ui/SectionTitle"
import StatisticCard from "../../components/ui/StatisticCard"
import { stagger, viewportOnce } from "../../utils/motion"

const stats = [
  {
    icon: Zap,
    value: "Real-time AI Translation",
    label: "Instant translation across sign, speech and text as you communicate.",
  },
  {
    icon: Layers,
    value: "Multiple Translation Modes",
    label: "Sign, text and speech converted seamlessly in every direction.",
  },
  {
    icon: Accessibility,
    value: "Accessible Design",
    label: "WCAG-friendly, high contrast and keyboard navigable throughout.",
  },
  {
    icon: Timer,
    value: "Fast Response",
    label: "Optimized AI pipelines built for low latency and smooth results.",
  },
]

export default function Statistics() {
  return (
    <section id="about" className="scroll-mt-16 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Platform Capabilities"
          title="What makes Signix different"
          description="Real capabilities focused on accessibility, speed and clarity."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatisticCard key={stat.value} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
