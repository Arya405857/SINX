import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TranslatorLayout from "../../components/translator/TranslatorLayout";
import TranslationMode from "../../components/translator/TranslationMode";
import TranslationInput from "../../components/translator/TranslationInput";
import TranslationOutput from "../../components/translator/TranslationOutput";
import SignaAssistant from "../../components/translator/SignaAssistant";
import ConversationPanel from "../../components/translator/ConversationPanel";
import LanguageSelector from "../../components/translator/LanguageSelector";

const validModes = ["text", "speech", "camera", "image"];
const initialConversations = [
  { id: "welcome", sender: "signa", mode: "text", status: "completed", time: "Now", preview: "Choose a mode and I will prepare your translation workspace." },
];

export default function Translator() {
  const [searchParams] = useSearchParams();
  const initialMode = validModes.includes(searchParams.get("mode")) ? searchParams.get("mode") : "text";
  const [mode, setMode] = useState(initialMode);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState(initialConversations);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const visibleConversations = useMemo(() => conversations.filter((item) => {
    const matchesSearch = item.preview.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "favorites" ? item.favorite : item.sender === filter);
    return matchesSearch && matchesFilter;
  }), [conversations, filter, search]);

  const handleModeChange = (nextMode) => { setMode(nextMode); setInput(""); setResult(""); };
  const handleTranslate = () => {
    if (!input.trim()) return;
    setLoading(true);
    window.setTimeout(() => {
      const message = "Translation request prepared. Connect the AI translation service to return a signed-language result.";
      setResult(message);
      setConversations((items) => [{ id: Date.now().toString(), sender: "user", mode, status: "completed", time: "Just now", preview: input.trim() }, ...items]);
      setLoading(false);
    }, 450);
  };
  const handleFutureInput = (label) => setResult(`${label} capture is ready for its future AI integration.`);

  return (
    <TranslatorLayout actions={<LanguageSelector />}>
      <div className="space-y-6 lg:space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Choose Translation Mode</h2>
          <p className="mt-1 text-sm text-slate-500">Select how you would like to communicate with Signix AI.</p>
        </div>
        <TranslationMode value={mode} onChange={handleModeChange} />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 lg:gap-8">
          <TranslationInput mode={mode} value={input} loading={loading} onChange={setInput} onClear={() => setInput("")} onTranslate={handleTranslate} onSpeechStart={() => handleFutureInput("Speech")} onCameraStart={() => handleFutureInput("Camera")} onUpload={() => handleFutureInput("Image upload")} />
          <TranslationOutput result={result} loading={loading} onCopy={() => navigator.clipboard?.writeText(result)} onSave={() => setConversations((items) => items.map((item, index) => index === 0 ? { ...item, favorite: true } : item))} />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 lg:gap-8">
          <SignaAssistant status={loading ? "Preparing translation" : result ? "Ready for AI connection" : "Ready to Translate"} loading={loading} onStartConversation={() => setResult("Signa is ready. Start with text, speech, camera, or an image.")} />
          <ConversationPanel conversations={visibleConversations} searchQuery={search} selectedFilter={filter} onSearch={setSearch} onFilterChange={setFilter} onClear={() => setConversations([])} />
        </div>
      </div>
    </TranslatorLayout>
  );
}
