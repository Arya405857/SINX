import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Camera,
  Upload,
  X,
  Languages,
  Image as ImageIcon,
} from "lucide-react";

const MAX_CHARACTERS = 1000;

/**
 * TranslationInput
 *
 * Collects user input for the currently selected translation mode
 * (text, speech, camera, image) and prepares it for a future
 * backend/AI integration. This component only gathers input — it
 * performs no translation, recognition, capture, or network calls.
 *
 * @param {Object} props
 * @param {"text"|"speech"|"camera"|"image"} props.mode - Active input mode.
 * @param {*} props.value - Current input value for the active mode.
 * @param {boolean} [props.loading] - Whether a translate action is in progress.
 * @param {boolean} [props.disabled] - Disables all interaction.
 * @param {(value: *) => void} props.onChange - Called when the input value changes.
 * @param {() => void} [props.onClear] - Called when the user clears the input.
 * @param {() => void} [props.onTranslate] - Called when the user requests translation.
 */
export default function TranslationInput({
  mode,
  value,
  loading = false,
  disabled = false,
  onChange,
  onClear,
  onTranslate,
  onSpeechStart,
  onCameraStart,
  onUpload,
}) {
  const textareaRef = useRef(null);

  // Auto-resize the textarea as the user types.
  useEffect(() => {
    if (mode === "text" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, mode]);

  const hasInput =
    Boolean(value) && (typeof value !== "string" || value.trim().length > 0);
  const canTranslate = hasInput && !loading && !disabled;

  const handleTextChange = (event) => {
    const next = event.target.value.slice(0, MAX_CHARACTERS);
    onChange?.(next);
  };

  const renderTextMode = () => (
    <div>
      <label htmlFor="translation-text-input" className="sr-only">
        Text to translate
      </label>
      <textarea
        id="translation-text-input"
        ref={textareaRef}
        value={value || ""}
        onChange={handleTextChange}
        disabled={disabled}
        placeholder="Type your message..."
        rows={5}
        maxLength={MAX_CHARACTERS}
        className="max-h-72 min-h-[140px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      />
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>
          {value?.length || 0}/{MAX_CHARACTERS}
        </span>
      </div>
    </div>
  );

  const renderSpeechMode = () => (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
      <motion.button
        type="button"
        onClick={onSpeechStart}
        disabled={disabled}
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.95 }}
        aria-label="Start recording"
        className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-white shadow-md shadow-blue-200 transition-colors duration-250 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Mic className="h-8 w-8" aria-hidden="true" />
      </motion.button>
      <p className="text-sm font-medium text-slate-600">
        Your voice will appear here after recording.
      </p>
      {/* Reserved space for a future audio waveform visualization. */}
      <div className="h-10 w-full max-w-xs" aria-hidden="true" />
    </div>
  );

  const renderCameraMode = () => (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Camera className="h-7 w-7" aria-hidden="true" />
      </div>
      <p className="text-sm text-slate-500">
        Your live camera feed will appear here.
      </p>
      <motion.button
        type="button"
        onClick={onCameraStart}
        disabled={disabled}
        whileHover={disabled ? undefined : { scale: 1.03 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-250 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Camera className="h-4 w-4" aria-hidden="true" />
        Capture
      </motion.button>
    </div>
  );

  const renderImageMode = () => (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Upload className="h-7 w-7" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-600">
          Upload an image containing sign language.
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Supported formats: PNG, JPG, JPEG
        </p>
      </div>
      <motion.button
        type="button"
        onClick={onUpload}
        disabled={disabled}
        whileHover={disabled ? undefined : { scale: 1.03 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-250 hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ImageIcon className="h-4 w-4" aria-hidden="true" />
        Browse Image
      </motion.button>
    </div>
  );

  const MODE_RENDERERS = {
    text: renderTextMode,
    speech: renderSpeechMode,
    camera: renderCameraMode,
    image: renderImageMode,
  };

  return (
    <section
      aria-label="Translation input"
      className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-slate-900">Input</h2>
        <p className="mt-1 text-sm text-slate-500">
          Provide your input using the selected translation mode.
        </p>
      </div>
      <div className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
        Ready for AI Translation
      </div>
      <hr className="my-4 border-slate-100" />

      {/* Dynamic mode content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {(MODE_RENDERERS[mode] || renderTextMode)()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="h-6 text-xs text-slate-400">{/* Future AI status */}</div>
      {/* Footer */}
      <div className="mt-5 flex items-center justify-end gap-3">
        {hasInput && (
          <motion.button
            type="button"
            onClick={onClear}
            disabled={disabled}
            whileHover={disabled ? undefined : { scale: 1.03 }}
            whileTap={disabled ? undefined : { scale: 0.97 }}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors duration-250 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Clear
          </motion.button>
        )}

        <motion.button
          type="button"
          onClick={onTranslate}
          disabled={!canTranslate}
          whileHover={canTranslate ? { scale: 1.03 } : undefined}
          whileTap={canTranslate ? { scale: 0.97 } : undefined}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-250 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Languages className="h-4 w-4" aria-hidden="true" />
          {loading ? "Translating..." : "Translate"}
        </motion.button>
      </div>
    </section>
  );
}
