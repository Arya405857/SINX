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
  const { register } = useAuth();
  const handleSubmit = (values) => {
    if (onSubmit) return onSubmit(values);
    setIsSubmitting(true);
    register(values).then(() => { setComplete(true); window.setTimeout(() => navigate("/verify-otp"), 700); }).finally(() => setIsSubmitting(false));
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
        errors={errors}
        success={success ?? complete}
        onLoginClick={onLoginClick}
        onGoogleClick={onGoogleClick ?? handleSocial}
        onGithubClick={onGithubClick ?? handleSocial}
        socialLoadingProvider={socialLoadingProvider}
      />
    </AuthLayout>
  );
}
