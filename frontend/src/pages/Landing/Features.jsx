import { motion } from "framer-motion"
import { ScanFace, Hand, Mic, Volume2, GraduationCap, LayoutDashboard } from "lucide-react"
import SectionTitle from "../../components/ui/SectionTitle"
import FeatureCard from "../../components/ui/FeatureCard"
import { stagger, viewportOnce } from "../../utils/motion"

const features = [
  {
    icon: ScanFace,
    title: "AI Sign Recognition",
    description: "Detect and interpret sign language gestures in real time using computer vision.",
  },
  {
    icon: Hand,
    title: "Text to Sign",
    description: "Convert written text into clear, animated sign language representations.",
  },
  {
    icon: Mic,
    title: "Speech to Text",
    description: "Transcribe spoken language into accurate, readable text instantly.",
  },
  {
    icon: Volume2,
    title: "Text to Speech",
    description: "Turn any text into natural, expressive speech for seamless conversations.",
  },
  {
    icon: GraduationCap,
    title: "Learning Hub",
    description: "Learn the alphabet, numbers and words with interactive lessons and quizzes.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Track your translations and progress from one clean, accessible workspace.",
  },
]

export default function Features() {
  return (
    <section id="features" className="scroll-mt-16 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Features"
          title="Everything you need to communicate"
          description="A complete toolkit of AI-powered features designed for accessible, real-time communication."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
