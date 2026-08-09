import React from "react";
import { motion } from "framer-motion";
import { Hand, Sparkles, ArrowRight } from "lucide-react";

/**
 * SignaCard
 * "Meet Signa" — the premium, most important card on the dashboard.
 * UI-only: reserves generous space for a future animated AI avatar.
 * No AI logic is implemented here.
 *
 * Props:
 * - onStartConversation: () => void  -> backend-ready placeholder
 */
export default function SignaCard({ onStartConversation }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-labelledby="signa-heading"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-600/25 sm:p-8"
    >
      {/* Ambient decoration */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto]">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11.5px] font-medium text-white/90 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI Sign Language Assistant
          </span>

          <h2
            id="signa-heading"
            className="mt-4 text-[26px] font-semibold tracking-tight sm:text-3xl"
          >
            Meet Signa
          </h2>
          <p className="mt-1.5 text-[14.5px] font-medium text-blue-100">
            Your Personal AI Sign Language Assistant
          </p>

          <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-blue-100/90">
            Signa will become a real-time animated assistant, capable of
            translating sign language as you speak, sign, and learn —
            bridging the conversation instantly.
          </p>

          <motion.button
            type="button"
            onClick={() => onStartConversation?.()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[13.5px] font-semibold text-blue-700 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
          >
            Start Conversation
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </motion.button>
        </div>

        {/* Avatar placeholder — reserved space for future animated avatar */}
        <div
          className="relative mx-auto flex h-44 w-44 shrink-0 items-center justify-center sm:h-52 sm:w-52"
          role="img"
          aria-label="Signa avatar placeholder, reserved for a future animated AI assistant"
        >
          {/* Pulsing rings */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border border-white/30"
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
              aria-hidden="true"
            />
          ))}

          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 sm:h-36 sm:w-36">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-inner sm:h-24 sm:w-24">
              <Hand className="h-9 w-9 text-blue-600 sm:h-10 sm:w-10" strokeWidth={1.75} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
