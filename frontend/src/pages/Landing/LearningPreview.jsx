import { motion } from "framer-motion"
import { Type, Hash, BookOpen, HelpCircle } from "lucide-react"
import SectionTitle from "../../components/ui/SectionTitle"
import { fadeUp, stagger, viewportOnce } from "../../utils/motion"
import { useNavigate } from "react-router-dom"

const modules = [
  { icon: Type, title: "Alphabet", description: "Master all 26 signed letters." },
  { icon: Hash, title: "Numbers", description: "Learn to sign numbers with ease." },
  { icon: BookOpen, title: "Words", description: "Build a vocabulary of common words." },
  { icon: HelpCircle, title: "Quiz", description: "Test your knowledge as you go." },
]

export default function LearningPreview() {
  const navigate = useNavigate()
  return (
    <section id="learning" className="scroll-mt-16 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Learning Hub"
          title="Learn sign language, step by step"
          description="Interactive lessons and quizzes that make learning sign language approachable and fun."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-6 sm:grid-cols-2"
          >
            {modules.map((module) => (
              <motion.button
                type="button"
                onClick={() => navigate("/learning")}
                key={module.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 text-left shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <module.icon size={22} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
                <p className="text-base leading-relaxed text-muted">{module.description}</p>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 shadow-sm"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-foreground">Your progress</h3>
              <p className="text-base leading-relaxed text-muted">
                Track how far you have come across every learning module.
              </p>
            </div>

            <ul className="flex flex-col gap-5">
              {[
                { label: "Alphabet", value: 80 },
                { label: "Numbers", value: 60 },
                { label: "Words", value: 35 },
              ].map((item) => (
                <li key={item.label} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span>{item.label}</span>
                    <span className="text-muted">{item.value}%</span>
                  </div>
                  <div
                    className="h-2.5 w-full overflow-hidden rounded-full bg-background"
                    role="progressbar"
                    aria-valuenow={item.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.label} progress`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="h-full rounded-full bg-secondary"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
