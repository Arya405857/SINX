import TranslatorLayout from "../../components/translator/TranslatorLayout";
import TranslationMode from "../../components/translator/TranslationMode";
import TranslationInput from "../../components/translator/TranslationInput";
import TranslationOutput from "../../components/translator/TranslationOutput";
import SignaAssistant from "../../components/translator/SignaAssistant";
import ConversationPanel from "../../components/translator/ConversationPanel";

export default function Translator() {
  return (
    <TranslatorLayout>
      <div className="space-y-6 lg:space-y-8">
        <TranslationMode />

        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Choose Translation Mode
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select how you'd like to communicate with Signix AI.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <TranslationInput />
          <TranslationOutput />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <SignaAssistant />
          <ConversationPanel />
        </div>
      </div>
    </TranslatorLayout>
  );
}
