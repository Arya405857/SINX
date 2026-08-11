import AuthLayout from "../../components/layout/AuthLayout";
import RegisterForm from "../../components/forms/RegisterForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * RegisterPage — thin composition layer over RegisterForm.
 *
 * Props:
 *  - onSubmit, loading, errors, success   → forwarded to RegisterForm
 *  - onLoginClick                          → navigation callback
 *  - onGoogleClick, onGithubClick, socialLoadingProvider
 */
export default function RegisterPage({
  onSubmit,
  loading,
  errors,
  success,
  onLoginClick,
  onGoogleClick,
  onGithubClick,
  socialLoadingProvider,
}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [formError, setFormError] = useState("");
  const { register } = useAuth();
  const handleSubmit = async (values) => {
    if (onSubmit) return onSubmit(values);
    setIsSubmitting(true);
    setFormError("");
    try {
      await register(values);
      setComplete(true);
      window.setTimeout(() => navigate("/dashboard", { replace: true }), 700);
    } catch (error) {
      setFormError(error.message || "Unable to create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSocial = () => alert('Social sign-up is not configured yet. Please create an account with email.');
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Signix to start translating sign language in real time."
    >
      <RegisterForm
        onSubmit={handleSubmit}
        loading={loading ?? isSubmitting}
        errors={{ ...errors, form: formError || errors?.form }}
        success={success ?? complete}
        onLoginClick={onLoginClick}
        onGoogleClick={onGoogleClick ?? handleSocial}
        onGithubClick={onGithubClick ?? handleSocial}
        socialLoadingProvider={socialLoadingProvider}
      />
    </AuthLayout>
  );
}
