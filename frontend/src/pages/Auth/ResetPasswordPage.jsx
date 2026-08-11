import AuthLayout from "../../components/layout/AuthLayout";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';

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
  const [params] = useSearchParams(); const navigate = useNavigate(); const [busy, setBusy] = useState(false); const [done, setDone] = useState(false); const [formError, setFormError] = useState('');
  const submit = async ({ password }) => { const resetToken = params.get('token'); if (!resetToken) return setFormError('A password reset token is required. Verify the code from your email first.'); setBusy(true); setFormError(''); try { await authService.resetPassword(resetToken, password); setDone(true); window.setTimeout(() => navigate('/login', { replace: true }), 1200); } catch (error) { setFormError(error.message); } finally { setBusy(false); } };
  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      showBrandPanel={false}
    >
      <ResetPasswordForm
        onSubmit={onSubmit || submit}
        loading={loading ?? busy}
        errors={{ ...errors, form: formError || errors?.form }}
        success={success ?? done}
        onBackToLoginClick={onBackToLoginClick || (() => navigate('/login'))}
      />
    </AuthLayout>
  );
}
