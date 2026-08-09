import React from "react";
import { Lightbulb } from "lucide-react";

/**
 * AccessibilityTip
 * Rotating, lightweight accessibility or communication tip.
 *
 * Props:
 * - tips: string[]  -> pool of tips to select from
 */
const DEFAULT_TIPS = [
  "Face the person you're signing to and keep your hands within your torso's width for clearer visibility.",
  "Good, even lighting on your face and hands improves camera translation accuracy significantly.",
  "Pause briefly between phrases — it gives both sign and speech translation models time to process cleanly.",
  "Captions and sign translation work best together: enable both for the clearest communication.",
];

export default function AccessibilityTip({ tips = DEFAULT_TIPS }) {
  const tip = tips[0] || "Accessibility settings are ready when you are.";

  return (
    <section
      aria-labelledby="accessibility-tip-heading"
      className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600">
          <Lightbulb className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
        <h2
          id="accessibility-tip-heading"
          className="text-[13.5px] font-semibold text-slate-900"
        >
          Accessibility Tip
        </h2>
      </div>
      <p className="mt-3.5 text-[13px] leading-relaxed text-slate-600">
        {tip}
      </p>
    </section>
  );
}
