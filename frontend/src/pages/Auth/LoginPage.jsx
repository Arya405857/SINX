import AuthLayout from "../../components/layout/AuthLayout";
import LoginForm from "../../components/forms/LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * LoginPage — thin composition layer. All auth logic (API calls, routing,
 * token storage) is injected by the parent app via props, keeping this
 * component framework-agnostic and backend-ready.
 *
 * Props:
 *  - onSubmit, loading, errors, success        → forwarded to LoginForm
 *  - onForgotPasswordClick, onRegisterClick     → navigation callbacks
 *  - onGoogleClick, onGithubClick, socialLoadingProvider
 */
export default function LoginPage({
  onSubmit,
  loading,
  errors,
  success,
  onForgotPasswordClick,
  onRegisterClick,
  onGoogleClick,
  onGithubClick,
  socialLoadingProvider,
}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const { signIn } = useAuth();
  const handleSubmit = (values) => {
    if (onSubmit) return onSubmit(values);
    setIsSubmitting(true);
    signIn(values).then(() => { setComplete(true); window.setTimeout(() => navigate("/dashboard"), 700); }).finally(() => setIsSubmitting(false));
  };
  const handleSocial = () => handleSubmit({ email: "social@signix.ai" });
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your Signix workspace."
    >
      <LoginForm
        onSubmit={handleSubmit}
        loading={loading ?? isSubmitting}
        errors={errors}
        success={success ?? complete}
        onForgotPasswordClick={onForgotPasswordClick}
        onRegisterClick={onRegisterClick}
        onGoogleClick={onGoogleClick ?? handleSocial}
        onGithubClick={onGithubClick ?? handleSocial}
        socialLoadingProvider={socialLoadingProvider}
      />
    </AuthLayout>
  );
}
