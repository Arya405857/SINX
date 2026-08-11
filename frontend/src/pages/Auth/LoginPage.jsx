import AuthLayout from "../../components/layout/AuthLayout";
import LoginForm from "../../components/forms/LoginForm";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [formError, setFormError] = useState("");
  const { signIn } = useAuth();
  const handleSubmit = async (values) => {
    if (onSubmit) return onSubmit(values);
    setIsSubmitting(true);
    setFormError("");
    try {
      await signIn(values);
      setComplete(true);
      const destination = location.state?.from || "/dashboard";
      window.setTimeout(() => navigate(destination, { replace: true }), 700);
    } catch (error) {
      setFormError(error.message || "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSocial = () => alert('Social sign-in is not configured yet. Please use email and password.');
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your Signix workspace."
    >
      <LoginForm
        onSubmit={handleSubmit}
        loading={loading ?? isSubmitting}
        errors={{ ...errors, form: formError || errors?.form }}
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
