import { Link } from "react-router-dom";

export default function Legal({ type }) {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  return <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6"><article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10"><Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">← Back to Signix</Link><h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">{title}</h1><p className="mt-2 text-sm text-slate-500">Frontend placeholder · Last updated August 2026</p><div className="mt-8 space-y-6 text-sm leading-7 text-slate-600"><section><h2 className="font-semibold text-slate-900">Purpose</h2><p className="mt-1">This placeholder provides a clear destination while Signix’s legal content is prepared for launch.</p></section><section><h2 className="font-semibold text-slate-900">Your account and data</h2><p className="mt-1">The future backend will define account, translation-data, and communication policies before any production data is collected.</p></section><section><h2 className="font-semibold text-slate-900">Contact</h2><p className="mt-1">For questions, contact <a className="text-blue-600 underline" href="mailto:hello@signix.ai">hello@signix.ai</a>.</p></section></div></article></main>;
}
