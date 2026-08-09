import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionTitle from "../../components/ui/SectionTitle";
import { fadeUp, stagger, viewportOnce } from "../../utils/motion";

const points = [
  "Millions of people face daily barriers because sign, speech and text rarely connect.",
  "Signix uses AI to translate across sign language, speech and text in real time.",
  "One accessible platform for hearing-impaired, speech-impaired and hearing users alike.",
];

export default function WhySignix() {
  return (
    <section id="why" className="scroll-mt-16 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="order-2 rounded-3xl border border-border bg-surface p-4 shadow-sm lg:order-1"
        >
          <img
            src={`${import.meta.env.BASE_URL}why-illustration.png`}
            alt="Why"
            alt="An AI system bridging sign language, speech and text communication"
            className="h-auto w-full rounded-2xl"
            width={800}
            height={600}
          />
        </motion.div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionTitle
            align="left"
            eyebrow="Why Signix"
            title="Bridging the communication gap with AI"
            description="Communication should never be a barrier. Signix brings people together by translating between the ways we naturally express ourselves."
          />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-4"
          >
            {points.map((point) => (
              <motion.li
                key={point}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Check size={16} aria-hidden="true" />
                </span>
                <span className="text-base leading-relaxed text-muted">
                  {point}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
