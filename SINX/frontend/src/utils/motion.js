export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const viewportOnce = { once: true, amount: 0.2 }
