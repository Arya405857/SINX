import { motion } from "framer-motion"
import { cn } from "../../utils/cn"
import { fadeUp, viewportOnce } from "../../utils/motion"

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) {
  const isCenter = align === "center"

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-xl",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-muted text-pretty">{description}</p>
      )}
    </motion.div>
  )
}
