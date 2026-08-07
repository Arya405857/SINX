import AuthLayout from "../../components/layout/AuthLayout";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";

/**
 * ResetPasswordPage — thin composition layer over ResetPasswordForm.
 * The reset token (from the URL) is expected to be resolved by the
 * parent router and passed down through `onSubmit`'s closure.
 *
 * Props:
 *  - onSubmit, loading, errors, success   → forwarded to ResetPasswordForm
 *  - onBackToLoginClick                    → navigation callback
 */
export default function ResetPasswordPage({
  onSubmit,
  loading,
  errors,
  success,
  onBackToLoginClick,
}) {
  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      showBrandPanel={false}
    >
      <ResetPasswordForm
        onSubmit={onSubmit}
        loading={loading}
        errors={errors}
        success={success}
        onBackToLoginClick={onBackToLoginClick}
      />
    </AuthLayout>
  );
}
