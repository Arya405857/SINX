import { motion } from "framer-motion"
import { Camera, Cpu, Languages, MessageCircle } from "lucide-react"
import SectionTitle from "../../components/ui/SectionTitle"
import { fadeUp, stagger, viewportOnce } from "../../utils/motion"

const steps = [
  {
    icon: Camera,
    title: "Camera",
    description: "Capture sign language gestures through your device camera.",
  },
  {
    icon: Cpu,
    title: "AI Detection",
    description: "Our models recognize hand shapes and movements with precision.",
  },
  {
    icon: Languages,
    title: "Translation",
    description: "Gestures are converted into text and speech in real time.",
  },
  {
    icon: MessageCircle,
    title: "Communication",
    description: "Share the message instantly and keep the conversation flowing.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="How It Works"
          title="From gesture to conversation in seconds"
          description="A simple, transparent flow powered by AI at every step."
        />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-14 grid gap-6 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.li key={step.title} variants={fadeUp} className="relative">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon size={24} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-base leading-relaxed text-muted">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
