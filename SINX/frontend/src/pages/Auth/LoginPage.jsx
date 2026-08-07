import AuthLayout from "../../components/layout/AuthLayout";
import LoginForm from "../../components/forms/LoginForm";

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
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your Signix workspace."
    >
      <LoginForm
        onSubmit={onSubmit}
        loading={loading}
        errors={errors}
        success={success}
        onForgotPasswordClick={onForgotPasswordClick}
        onRegisterClick={onRegisterClick}
        onGoogleClick={onGoogleClick}
        onGithubClick={onGithubClick}
        socialLoadingProvider={socialLoadingProvider}
      />
    </AuthLayout>
  );
}
