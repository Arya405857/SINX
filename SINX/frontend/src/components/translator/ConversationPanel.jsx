import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Star,
  Download,
  Trash2,
  MessageSquare,
  User,
  Sparkles,
  Settings,
  AlertTriangle,
  RotateCcw,
  Type,
  Mic,
  Camera,
  Image as ImageIcon,
  Gauge,
  BarChart3,
} from "lucide-react";

// Sender-level presentation config. Keeps avatar/icon logic out of JSX.
const SENDER_CONFIG = {
  user: { label: "You", icon: User, className: "bg-blue-500 text-white" },
  signa: { label: "Signa", icon: Sparkles, className: "bg-gradient-to-br from-blue-500 to-blue-400 text-white" },
  system: { label: "System", icon: Settings, className: "bg-slate-200 text-slate-600" },
};

// Translation mode badge config, reused across timeline items.
const MODE_CONFIG = {
  text: { label: "Text", icon: Type },
  speech: { label: "Speech", icon: Mic },
  camera: { label: "Camera", icon: Camera },
  image: { label: "Image", icon: ImageIcon },
};

const STATUS_STYLES = {
  completed: "bg-emerald-50 text-emerald-600",
  processing: "bg-amber-50 text-amber-600",
  failed: "bg-red-50 text-red-600",
  pending: "bg-slate-100 text-slate-500",
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "user", label: "You" },
  { key: "signa", label: "Signa" },
  { key: "system", label: "System" },
  { key: "favorites", label: "Favorites" },
];

/**
 * ConversationPanel
 *
 * Presentational communication timeline for the Signix Translator
 * page. Renders conversation history, search, and filter UI supplied
 * entirely by the parent — this component holds no API, translation,
 * AI, or business logic of its own.
 *
 * @param {Object} props
 * @param {Array<Object>} [props.conversations] - List of conversation entries to render.
 * @param {string|number} [props.selectedConversation] - Id of the currently selected entry.
 * @param {boolean} [props.loading] - Shows skeleton timeline.
 * @param {string} [props.error] - Error message to display.
 * @param {string} [props.searchQuery] - Current search input value.
 * @param {string} [props.selectedFilter] - Current active filter key.
 * @param {(query: string) => void} [props.onSearch]
 * @param {(filter: string) => void} [props.onFilterChange]
 * @param {(conversation: Object) => void} [props.onConversationSelect]
 * @param {() => void} [props.onExport]
 * @param {() => void} [props.onClear]
 */
export default function ConversationPanel({
  conversations = [],
  selectedConversation,
  loading = false,
  error,
  searchQuery = "",
  selectedFilter = "all",
  onSearch,
  onFilterChange,
  onConversationSelect,
  onExport,
  onClear,
}) {
  const hasConversations = conversations.length > 0;

  const stats = {
    total: conversations.length,
    completed: conversations.filter((item) => item.status === "completed").length,
    favorites: conversations.filter((item) => item.favorite).length,
  };

  const renderSkeleton = () => (
    <ul className="space-y-3" aria-hidden="true">
      {[...Array(4)].map((_, index) => (
        <li key={index} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-200" />
            <div className="h-3 w-4/5 animate-pulse rounded-full bg-slate-200" />
          </div>
        </li>
      ))}
    </ul>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <MessageSquare className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-slate-600">No conversations yet.</p>
      <p className="max-w-xs text-xs text-slate-400">
        Your translation history will appear here as a timeline.
      </p>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
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

  const renderTimelineItem = (conversation) => {
    const sender = SENDER_CONFIG[conversation.sender] || SENDER_CONFIG.user;
    const SenderIcon = sender.icon;
    const mode = MODE_CONFIG[conversation.mode];
    const ModeIcon = mode?.icon;
    const isSelected = conversation.id === selectedConversation;
    const statusStyle = STATUS_STYLES[conversation.status] || STATUS_STYLES.pending;

    return (
      <motion.li
        key={conversation.id}
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <button
          type="button"
          onClick={() => onConversationSelect?.(conversation)}
          aria-pressed={isSelected}
          className={`
            group flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors duration-250
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
            ${
              isSelected
                ? "border-blue-500 bg-blue-50/60"
                : "border-transparent hover:bg-slate-50"
            }
          `}
        >
          {/* Avatar */}
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${sender.className}`}
          >
            <SenderIcon className="h-4 w-4" aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            {/* Sender + time */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-slate-900">{sender.label}</span>
              <span className="shrink-0 text-xs text-slate-400">{conversation.time}</span>
            </div>

            {/* Preview */}
            {conversation.preview && (
              <p className="mt-0.5 truncate text-sm text-slate-500">{conversation.preview}</p>
            )}

            {/* Badges row */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {mode && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                  <ModeIcon className="h-3 w-3" aria-hidden="true" />
                  {mode.label}
                </span>
              )}

              {conversation.status && (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusStyle}`}>
                  {conversation.status}
                </span>
              )}

              {/* Reserved: AI confidence score placeholder */}
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                <Gauge className="h-3 w-3" aria-hidden="true" />
                Confidence: —
              </span>

              {conversation.favorite && (
                <span className="inline-flex items-center text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-current" aria-label="Favorite" />
                </span>
              )}
            </div>
          </div>
        </button>
      </motion.li>
    );
  };

  return (
    <section
      aria-label="Conversation timeline"
      className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* ===================== Header ===================== */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Conversation Panel</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your translation timeline with Signa.
          </p>
        </div>
      </div>

      {/* ===================== Search ===================== */}
      <div className="relative mt-4">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <label htmlFor="conversation-search" className="sr-only">
          Search conversations
        </label>
        <input
          id="conversation-search"
          type="text"
          value={searchQuery}
          onChange={(event) => onSearch?.(event.target.value)}
          placeholder="Search conversations..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* ===================== Filter Chips ===================== */}
      <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Filter conversations">
        {FILTERS.map((filter) => {
          const isActive = selectedFilter === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onFilterChange?.(filter.key)}
              className={`
                rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-250
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* ===================== Quick Statistics ===================== */}
      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center">
        <div>
          <p className="text-sm font-semibold text-slate-900">{stats.total}</p>
          <p className="text-[11px] text-slate-400">Total</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{stats.completed}</p>
          <p className="text-[11px] text-slate-400">Completed</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{stats.favorites}</p>
          <p className="text-[11px] text-slate-400">Favorites</p>
        </div>
      </div>

      {/* ===================== Timeline ===================== */}
      <div className="mt-4 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderError()}
            </motion.div>
          ) : loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderSkeleton()}
            </motion.div>
          ) : hasConversations ? (
            <motion.ul key="timeline" className="space-y-2">
              <AnimatePresence initial={false}>
                {conversations.map(renderTimelineItem)}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderEmptyState()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reserved: AI insights / summary placeholder */}
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-400">
        <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
        AI insights coming soon
      </div>

      {/* ===================== Footer Actions ===================== */}
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
        <motion.button
          type="button"
          onClick={onExport}
          disabled={!hasConversations}
          whileHover={hasConversations ? { scale: 1.03 } : undefined}
          whileTap={hasConversations ? { scale: 0.97 } : undefined}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-250 hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export
        </motion.button>

        <motion.button
          type="button"
          onClick={onClear}
          disabled={!hasConversations}
          whileHover={hasConversations ? { scale: 1.03 } : undefined}
          whileTap={hasConversations ? { scale: 0.97 } : undefined}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors duration-250 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear
        </motion.button>
      </div>
    </section>
  );
}
