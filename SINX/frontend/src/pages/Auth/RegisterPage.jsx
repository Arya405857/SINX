import AuthLayout from "../../components/layout/AuthLayout";
import RegisterForm from "../../components/forms/RegisterForm";

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
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Signix to start translating sign language in real time."
    >
      <RegisterForm
        onSubmit={onSubmit}
        loading={loading}
        errors={errors}
        success={success}
        onLoginClick={onLoginClick}
        onGoogleClick={onGoogleClick}
        onGithubClick={onGithubClick}
        socialLoadingProvider={socialLoadingProvider}
      />
    </AuthLayout>
  );
}
