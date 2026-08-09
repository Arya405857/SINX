import { useState } from "react";
import { ChevronDown, Languages } from "lucide-react";

const languages = ["English", "Hindi", "Odia", "Bengali", "Telugu", "Tamil", "Kannada", "Malayalam", "Gujarati", "Punjabi", "Marathi", "Urdu", "French", "German", "Spanish", "Arabic", "Japanese", "Chinese", "Indian Sign Language", "American Sign Language"];

export default function LanguageSelector() {
  const [language, setLanguage] = useState(languages[0]);
  return <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"><Languages className="h-4 w-4 text-blue-600" /><span className="sr-only">Translation language</span><select value={language} onChange={(event) => setLanguage(event.target.value)} className="max-w-36 bg-transparent text-sm font-medium outline-none sm:max-w-none"><option>{languages[0]}</option><option>{languages[1]}</option><option>{languages[2]}</option></select><ChevronDown className="pointer-events-none h-3.5 w-3.5 text-slate-400" /></label>;
}
