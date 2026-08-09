import { motion } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Play,
  Smile,
  Cpu,
  AudioLines,
  UserRound,
  Wand2,
} from "lucide-react";

// Emotion states Signa can display. Only the active one is highlighted;
// the rest exist so the emotion layer never needs redesigning when
// real emotion detection lands.
const EMOTIONS = [
  { key: "calm", emoji: "🙂", label: "Calm" },
  { key: "happy", emoji: "😀", label: "Happy" },
  { key: "thinking", emoji: "🤔", label: "Thinking" },
  { key: "explaining", emoji: "😮", label: "Explaining" },
  { key: "success", emoji: "🎉", label: "Success" },
  { key: "idle", emoji: "😴", label: "Idle" },
  { key: "error", emoji: "😢", label: "Error" },
];

// Developer-facing engine status rows. Purely informational today —
// each will report real connection state once its engine is wired in.
const ENGINE_STATUS = [
  { key: "ai", label: "AI Engine", status: "Not Connected" },
  { key: "speech", label: "Speech Engine", status: "Not Connected" },
  { key: "avatar", label: "Avatar Engine", status: "Placeholder" },
  { key: "gesture", label: "Sign Animation", status: "Placeholder" },
];

const ONLINE_STYLES = {
  online: "bg-blue-50 text-blue-600",
  busy: "bg-amber-50 text-amber-600",
  offline: "bg-slate-100 text-slate-500",
  updating: "bg-purple-50 text-purple-600",
};

const ONLINE_LABELS = {
  online: "Ready",
  busy: "Busy",
  offline: "Offline",
  updating: "Updating",
};

/**
 * SignaAssistant
 *
 * Presentational shell for Signa, the Signix AI Companion. Today this
 * renders placeholder UI only; it is intentionally structured so that
 * future engines (LLM, speech, avatar rendering, sign-language
 * generation) can be plugged in via props without any redesign.
 *
 * @param {Object} props
 * @param {string} [props.status] - Current AI state label (e.g. "Ready to Translate", "Listening", "Thinking").
 * @param {"calm"|"happy"|"thinking"|"explaining"|"success"|"idle"|"error"} [props.emotion] - Active emotion key.
 * @param {string} [props.message] - Message shown in Signa's conversation bubble.
 * @param {boolean} [props.loading] - Shows skeleton placeholders instead of content.
 * @param {"online"|"busy"|"offline"|"updating"} [props.online] - Presence badge state.
 * @param {() => void} [props.onStartConversation]
 * @param {() => void} [props.onReplay]
 */
export default function SignaAssistant({
  status = "Ready to Translate",
  emotion = "calm",
  message = "Hello! I'm Signa. I'm here to help you translate conversations into sign language. Choose a translation mode to begin.",
  loading = false,
  online = "online",
  onStartConversation,
  onReplay,
}) {
  const activeEmotion = EMOTIONS.find((item) => item.key === emotion) || EMOTIONS[0];

  return (
    <section
      aria-label="Signa, your AI sign language companion"
      className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* ===================== Section 1: Assistant Header ===================== */}
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Signa</h2>
          <p className="text-sm text-slate-500">AI Sign Language Companion</p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            ONLINE_STYLES[online] || ONLINE_STYLES.online
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {ONLINE_LABELS[online] || ONLINE_LABELS.online}
        </span>
      </header>

      {/* ===================== Section 2: AI State Badge ===================== */}
      <div className="mt-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
          <Cpu className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
          {status}
        </span>
      </div>

      {/* ===================== Section 3: Avatar Engine ===================== */}
      <div className="mt-6 flex flex-col items-center">
        {loading ? (
          <div className="h-36 w-36 animate-pulse rounded-full bg-slate-100" />
        ) : (
          <div className="relative flex h-36 w-36 items-center justify-center">
            {/* Ambient glow pulse behind the avatar */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-blue-200/20 blur-xl"
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating + breathing avatar container */}
            {/* Avatar Engine Placeholder — future integration: Rive / Three.js / Ready Player Me */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-400 text-white shadow-lg shadow-blue-200"
            >
              <UserRound className="h-12 w-12" aria-hidden="true" />
            </motion.div>
          </div>
        )}
      </div>

      {/* ===================== Section 4: Emotion Layer ===================== */}
      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
          <Smile className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          <span aria-hidden="true">{activeEmotion.emoji}</span>
          {activeEmotion.label}
        </span>
      </div>

      {/* ===================== Section 5: Conversation Bubble ===================== */}
      <div className="mt-5">
        {loading ? (
          <div className="space-y-2 rounded-xl bg-slate-50 p-4">
            <div className="h-3 w-11/12 animate-pulse rounded-full bg-slate-200" />
            <div className="h-3 w-4/5 animate-pulse rounded-full bg-slate-200" />
            <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-start gap-2 rounded-xl rounded-tl-sm bg-blue-50 p-4"
          >
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-700">{message}</p>
          </motion.div>
        )}
      </div>

      {/* ===================== Section 6: Gesture Animation Canvas ===================== */}
      <div className="mt-5">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Gesture Animation</h3>
        {loading ? (
          <div className="h-32 w-full animate-pulse rounded-xl bg-slate-100" />
        ) : (
          <div className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <Wand2 className="h-5 w-5 text-slate-300" aria-hidden="true" />
            <p className="text-xs text-slate-400">
              Future AI sign-language animation will appear here.
            </p>
          </div>
        )}
      </div>

      {/* ===================== Section 7: Developer Status Panel ===================== */}
      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <AudioLines className="h-3.5 w-3.5" aria-hidden="true" />
          Engine Status
        </div>
        <ul className="space-y-1.5">
          {ENGINE_STATUS.map(({ key, label, status: engineStatus }) => (
            <li key={key} className="flex items-center justify-between text-xs">
              <span className="text-slate-500">{label}</span>
              <span className="font-medium text-slate-400">{engineStatus}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ===================== Section 8: Quick Actions ===================== */}
      <div className="mt-5 flex items-center gap-3">
        <motion.button
          type="button"
          onClick={onStartConversation}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-250 hover:bg-blue-600"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Start Conversation
        </motion.button>

        <motion.button
          type="button"
          onClick={onReplay}
          disabled
          aria-label="Replay animation"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Replay
        </motion.button>
      </div>
    </section>
  );
}
