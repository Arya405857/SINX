import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Clock3, Play, Sparkles, Trophy } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

const lessons = [
  { id: 1, title: "Everyday greetings", level: "Beginner", duration: "8 min", progress: 100, description: "Build confidence with essential introductions and greetings." },
  { id: 2, title: "Family and people", level: "Beginner", duration: "12 min", progress: 60, description: "Learn the signs used most often for people close to you." },
  { id: 3, title: "Getting around", level: "Intermediate", duration: "15 min", progress: 0, description: "Practice useful directions and travel vocabulary." },
];

export default function Learning() {
  const [activeLesson, setActiveLesson] = useState(lessons[1].id);
  return <DashboardLayout title="Learning" activeItem="learning">
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium"><Sparkles className="h-3.5 w-3.5" /> Personalized learning path</span><h2 className="mt-4 text-2xl font-semibold tracking-tight">Keep building your sign language fluency.</h2><p className="mt-2 max-w-xl text-sm text-blue-100">Short, focused lessons designed for consistent progress. Your lesson engine is ready for future AI feedback.</p></div><div className="rounded-2xl bg-white/10 p-4 text-center"><Trophy className="mx-auto h-7 w-7 text-amber-300" /><p className="mt-2 text-2xl font-semibold">4</p><p className="text-xs text-blue-100">day streak</p></div></div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3"><Stat icon={BookOpen} label="Lessons completed" value="12" /><Stat icon={Clock3} label="Practice time" value="2h 40m" /><Stat icon={CheckCircle2} label="Current accuracy" value="—" note="Available with AI feedback" /></section>
      <section><div className="mb-4"><h2 className="text-lg font-semibold text-slate-900">Your learning path</h2><p className="mt-1 text-sm text-slate-500">Continue where you left off or choose a new lesson.</p></div><div className="grid gap-4 lg:grid-cols-3">{lessons.map((lesson, index) => <motion.article key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} className={`rounded-2xl border bg-white p-5 shadow-sm ${activeLesson === lesson.id ? "border-blue-300 ring-2 ring-blue-100" : "border-slate-200"}`}><div className="flex items-center justify-between"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">{lesson.level}</span><span className="text-xs text-slate-400">{lesson.duration}</span></div><h3 className="mt-4 font-semibold text-slate-900">{lesson.title}</h3><p className="mt-2 min-h-10 text-sm leading-relaxed text-slate-500">{lesson.description}</p><div className="mt-5"><div className="mb-2 flex justify-between text-xs text-slate-500"><span>Progress</span><span>{lesson.progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${lesson.progress}%` }} /></div></div><button type="button" onClick={() => setActiveLesson(lesson.id)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"><Play className="h-4 w-4" />{lesson.progress ? "Continue lesson" : "Start lesson"}</button></motion.article>)}</div></section>
    </div>
  </DashboardLayout>;
}

function Stat({ icon: Icon, label, value, note }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon className="h-5 w-5 text-blue-600" /><p className="mt-4 text-2xl font-semibold text-slate-900">{value}</p><p className="mt-1 text-sm text-slate-600">{label}</p>{note && <p className="mt-1 text-xs text-slate-400">{note}</p>}</div>; }
