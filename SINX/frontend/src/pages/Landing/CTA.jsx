import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Button from "../../components/ui/Button"
import { fadeUp, viewportOnce } from "../../utils/motion"

export default function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-3xl bg-primary px-6 py-14 text-center shadow-sm sm:px-12 lg:py-20"
      >
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground text-balance sm:text-4xl">
          Ready to Communicate Better?
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-blue-100 text-pretty">
          Join Signix and start breaking down communication barriers with the power of AI.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            size="lg"
            href="#learning"
            className="focus-visible:outline-white"
          >
            Start Learning
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="#get-started"
            className="border-transparent bg-surface text-primary hover:bg-blue-50"
          >
            Create Account
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
