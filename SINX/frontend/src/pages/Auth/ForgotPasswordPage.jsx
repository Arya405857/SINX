import AuthLayout from "../../components/layout/AuthLayout";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";

/**
 * ForgotPasswordPage — thin composition layer over ForgotPasswordForm.
 *
 * Props:
 *  - onSubmit, loading, errors, success   → forwarded to ForgotPasswordForm
 *  - onBackToLoginClick                    → navigation callback
 */
export default function ForgotPasswordPage({
  onSubmit,
  loading,
  errors,
  success,
  onBackToLoginClick,
}) {
  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="No worries — enter your email and we'll send you a reset link."
      showBrandPanel={false}
    >
      <ForgotPasswordForm
        onSubmit={onSubmit}
        loading={loading}
        errors={errors}
        success={success}
        onBackToLoginClick={onBackToLoginClick}
      />
    </AuthLayout>
  );
}
