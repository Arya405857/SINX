import AuthLayout from "../../components/layout/AuthLayout";
import OTPVerificationForm from "../../components/forms/OTPVerificationForm";
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';
import useAuth from '../../hooks/useAuth';

/**
 * OTPVerificationPage — thin composition layer over OTPVerificationForm.
 *
 * Props:
 *  - destination: email/phone the code was sent to
 *  - length: digits in the code
 *  - onSubmit, onResend, loading, resending, errors, success
 */
export default function OTPVerificationPage({
  destination,
  length,
  onSubmit,
  onResend,
  loading,
  resending,
  errors,
  success,
}) {
  const navigate = useNavigate(); const [params] = useSearchParams(); const purpose = params.get('purpose') === 'reset-password' ? 'reset-password' : 'verify-email'; const [busy, setBusy] = useState(false); const [formError, setFormError] = useState('');
  const { verifyOtp } = useAuth();
  const verify = async (code) => { setBusy(true); setFormError(''); try { const result = await verifyOtp(code, purpose); navigate(purpose === 'reset-password' ? `/reset-password?token=${encodeURIComponent(result.resetToken)}` : '/dashboard'); } catch (error) { setFormError(error.message); } finally { setBusy(false); } };
  const resend = async () => { setBusy(true); try { await authService.resendOtp(purpose); } catch (error) { setFormError(error.message); } finally { setBusy(false); } };
  return (
    <AuthLayout
      title="Verify your identity"
      subtitle="This helps us keep your Signix account secure."
      showBrandPanel={false}
    >
      <OTPVerificationForm
        destination={destination || sessionStorage.getItem('signix.pendingEmail')}
        length={length}
        onSubmit={onSubmit || verify}
        onResend={onResend || resend}
        loading={loading ?? busy}
        resending={resending ?? busy}
        errors={errors || { form: formError }}
        success={success}
      />
    </AuthLayout>
  );
}
