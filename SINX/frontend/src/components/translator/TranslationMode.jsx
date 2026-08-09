import { motion } from "framer-motion";
import { Type, Mic, Camera, Image as ImageIcon } from "lucide-react";

// Static mode definitions — purely presentational, no side effects.
const MODES = [
  {
    id: "text",
    label: "Text",
    description: `
Text
Translate typed conversations instantly.

Speech
Convert spoken language into sign language.

Camera
Translate live hand signs using AI vision.

Image
Translate signs from uploaded images.`,
    icon: Type,
  },
  {
    id: "speech",
    label: "Speech",
    description: "Speak and let Signix listen.",
    icon: Mic,
  },
  {
    id: "camera",
    label: "Camera",
    description: "Sign in real time using your camera.",
    icon: Camera,
  },
  {
    id: "image",
    label: "Image",
    description: "Upload an image to translate.",
    icon: ImageIcon,
  },
];

/**
 * TranslationMode
 *
 * Lets the user pick how they want to communicate with Signix AI
 * (text, speech, camera, or image). Presentation only — the parent
 * owns the selected mode and any downstream behavior.
 *
 * @param {Object} props
 * @param {string} props.value - Currently selected mode id.
 * @param {(mode: string) => void} props.onChange - Called with the
 *   mode id whenever a new mode is selected.
 * @param {boolean} [props.disabled] - Disables interaction with all cards.
 */
export default function TranslationMode({ value, onChange, disabled = false }) {
  return (
    <section aria-label="Translation mode" className="w-full">
      <div
        role="radiogroup"
        aria-label="Choose a translation mode"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {MODES.map(({ id, label, description, icon: Icon }, index) => {
          const isSelected = value === id;

          return (
            <motion.button
              key={id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={label}
              disabled={disabled}
              onClick={() => onChange?.(id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={disabled ? undefined : { y: -4 }}
              whileTap={disabled ? undefined : { scale: 0.97 }}
              className={`
                group flex flex-col items-start gap-3 rounded-xl border bg-white p-5
                text-left shadow-sm transition-colors duration-250
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-blue-100"
                    : "border-slate-200 hover:border-blue-300 hover:shadow-md"
                }
              `}
            >
              <span
                className={`
                  flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-250
                  ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500"
                  }
                `}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>

              <span>
                <span
                  className={`block text-base font-semibold ${
                    isSelected ? "text-blue-600" : "text-slate-900"
                  }`}
                >
                  {label}
                </span>
                <span className="mt-1 block text-sm text-slate-500">
                  {description}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
