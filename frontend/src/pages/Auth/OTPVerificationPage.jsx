import AuthLayout from "../../components/layout/AuthLayout";
import OTPVerificationForm from "../../components/forms/OTPVerificationForm";

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
  return (
    <AuthLayout
      title="Verify your identity"
      subtitle="This helps us keep your Signix account secure."
      showBrandPanel={false}
    >
      <OTPVerificationForm
        destination={destination}
        length={length}
        onSubmit={onSubmit}
        onResend={onResend}
        loading={loading}
        resending={resending}
        errors={errors}
        success={success}
      />
    </AuthLayout>
  );
}
