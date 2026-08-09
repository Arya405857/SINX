import { motion } from "framer-motion"
import { Atom, Server, BrainCircuit, ScanLine, Camera, Network } from "lucide-react"
import SectionTitle from "../../components/ui/SectionTitle"
import TechnologyBadge from "../../components/ui/TechnologyBadge"
import { stagger, viewportOnce } from "../../utils/motion"

const technologies = [
  { icon: Atom, label: "React" },
  { icon: Server, label: "Django" },
  { icon: BrainCircuit, label: "TensorFlow" },
  { icon: ScanLine, label: "MediaPipe" },
  { icon: Camera, label: "OpenCV" },
  { icon: Network, label: "REST API" },
]

export default function Technology() {
  return (
    <section id="technology" className="scroll-mt-16 bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Technology"
          title="Built on a modern, reliable stack"
          description="Signix combines proven frameworks and AI tooling to deliver accurate, real-time results."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {technologies.map((tech) => (
            <TechnologyBadge key={tech.label} {...tech} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
