import { useMemo } from "react";
import { motion } from "framer-motion";

const LEVELS = [
  { label: "Very weak", color: "bg-red-400", text: "text-red-600" },
  { label: "Weak", color: "bg-orange-400", text: "text-orange-600" },
  { label: "Fair", color: "bg-yellow-400", text: "text-yellow-600" },
  { label: "Good", color: "bg-blue-500", text: "text-blue-600" },
  { label: "Strong", color: "bg-green-500", text: "text-green-600" },
];

/**
 * Pure client-side heuristic scorer — no network calls. The backend should
 * still perform authoritative validation on submit.
 */
function scorePassword(password = "") {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return Math.min(score, LEVELS.length - 1);
}

export default function PasswordStrengthMeter({ password = "", className = "" }) {
  const level = useMemo(() => scorePassword(password), [password]);
  const segments = LEVELS.length - 1;

  if (!password) return null;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} aria-live="polite">
      <div className="flex gap-1.5" role="presentation">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: i < level ? 1 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ originX: 0 }}
              className={`h-full w-full ${LEVELS[level].color}`}
            />
          </div>
        ))}
      </div>
      <p className={`text-xs font-medium ${LEVELS[level].text}`}>
        Password strength: {LEVELS[level].label}
      </p>
    </div>
  );
}
