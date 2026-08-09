import { AnimatePresence, motion } from "framer-motion";
import {
  Copy,
  Download,
  Share2,
  Volume2,
  Bookmark,
  Languages,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from "lucide-react";

/**
 * TranslationOutput
 *
 * Displays translation results for the Translator page. This
 * component is purely presentational — it renders whatever `result`,
 * `loading`, and `error` it is given, and forwards user intent
 * (copy, download, share, speak, save) via callbacks. It performs no
 * translation, recognition, or network activity itself.
 *
 * @param {Object} props
 * @param {string} [props.result] - The translated content to display.
 * @param {boolean} [props.loading] - Whether a translation is in progress.
 * @param {string} [props.error] - Error message to display, if any.
 * @param {() => void} [props.onCopy]
 * @param {() => void} [props.onDownload]
 * @param {() => void} [props.onShare]
 * @param {() => void} [props.onSpeak]
 * @param {() => void} [props.onSave]
 */
export default function TranslationOutput({
  result,
  loading = false,
  error,
  onCopy,
  onDownload,
  onShare,
  onSpeak,
  onSave,
}) {
  const hasResult = Boolean(result) && result.trim().length > 0;
  const actionsDisabled = !hasResult || loading || Boolean(error);

  const statusLabel = error
    ? "Translation Failed"
    : loading
    ? "Processing..."
    : hasResult
    ? "Translation Complete"
    : "Ready for Translation";

  const statusStyles = error
    ? "bg-red-50 text-red-600"
    : loading
    ? "bg-amber-50 text-amber-600"
    : hasResult
    ? "bg-emerald-50 text-emerald-600"
    : "bg-blue-50 text-blue-600";

  const ACTIONS = [
    { key: "copy", label: "Copy", icon: Copy, onClick: onCopy },
    { key: "download", label: "Download", icon: Download, onClick: onDownload },
    { key: "share", label: "Share", icon: Share2, onClick: onShare },
    { key: "speak", label: "Speak", icon: Volume2, onClick: onSpeak },
    { key: "save", label: "Save", icon: Bookmark, onClick: onSave },
  ];

  const renderEmptyState = () => (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Languages className="h-7 w-7" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-slate-600">No translation available yet.</p>
      <p className="max-w-xs text-xs text-slate-400">
        Enter text, speech, image or camera input to begin.
      </p>
    </div>
  );

  const renderSkeleton = () => (
    <div className="flex h-full min-h-[220px] flex-col justify-center gap-3" aria-hidden="true">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="h-4 animate-pulse rounded-full bg-slate-100"
          style={{ width: `${90 - index * 12}%` }}
        />
      ))}
    </div>
  );

  const renderError = () => (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertTriangle className="h-7 w-7" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-slate-700">{error}</p>
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-250 hover:border-blue-300 hover:text-blue-600"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Retry
      </motion.button>
    </div>
  );

  const renderResult = () => (
    <div className="max-h-72 overflow-y-auto rounded-lg bg-slate-50 p-4">
      <p className="whitespace-pre-line text-sm leading-relaxed text-slate-800">
        {result}
      </p>
    </div>
  );

  const renderContent = () => {
    if (error) return renderError();
    if (loading) return renderSkeleton();
    if (hasResult) return renderResult();
    return renderEmptyState();
  };

  return (
    <section
      aria-label="Translation output"
      className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Output</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your translated result will appear here.
          </p>
        </div>

        <span
          className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles}`}
        >
          {statusLabel}
        </span>
      </div>

      <hr className="my-4 border-slate-100" />

      {/* Output area */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={error ? "error" : loading ? "loading" : hasResult ? "result" : "empty"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reserved AI status area */}
      <div className="mt-5 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
        <Sparkles className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
        <span>AI Online</span>
      </div>

      {/* Action bar */}
      <div className="mt-4 flex items-center justify-end gap-1.5">
        {ACTIONS.map(({ key, label, icon: Icon, onClick }) => (
          <motion.button
            key={key}
            type="button"
            aria-label={label}
            title={label}
            onClick={onClick}
            disabled={actionsDisabled}
            whileHover={actionsDisabled ? undefined : { scale: 1.08 }}
            whileTap={actionsDisabled ? undefined : { scale: 0.94 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors duration-250 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-500"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
