import AuthLayout from "../../components/layout/AuthLayout";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import { useState } from 'react';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate(); const [busy, setBusy] = useState(false); const [done, setDone] = useState(false); const [formError, setFormError] = useState('');
  const submit = async ({ email }) => { setBusy(true); setFormError(''); try { await authService.forgotPassword(email); setDone(true); window.setTimeout(() => navigate('/verify-otp?purpose=reset-password'), 700); } catch (error) { setFormError(error.message); } finally { setBusy(false); } };
  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="No worries — enter your email and we'll send you a reset link."
      showBrandPanel={false}
    >
      <ForgotPasswordForm
        onSubmit={onSubmit || submit}
        loading={loading ?? busy}
        errors={errors || { form: formError }}
        success={success ?? done}
        onBackToLoginClick={onBackToLoginClick}
      />
    </AuthLayout>
  );
}
