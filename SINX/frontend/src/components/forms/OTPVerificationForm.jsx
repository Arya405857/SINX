import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import ErrorState from "../ui/ErrorState";
import SuccessState from "../ui/SuccessState";
import OTPInput from "./OTPInput";

const RESEND_COOLDOWN_SECONDS = 30;

/**
 * OTPVerificationForm — verifies a code sent to email/phone.
 *
 * Props:
 *  - email / destination: string shown in the helper copy
 *  - length: digits in the code (default 6)
 *  - onSubmit(code)
 *  - onResend()
 *  - loading, resending, errors ({ otp?, form? }), success
 */
export default function OTPVerificationForm({
  destination,
  length = 6,
  onSubmit,
  onResend,
  loading = false,
  resending = false,
  errors = {},
  success = false,
}) {
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    timerRef.current = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [cooldown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === length) {
     if(onSubmit) {
      onSubmit(code);
     } else {
      navigate("/reset-password");
     }
    }
  };

  const handleResend = () => {
    if (cooldown > 0 || resending) return;
    onResend?.();
    setCooldown(RESEND_COOLDOWN_SECONDS);
  };


  if (success) {
    return (
      <SuccessState
        title="Verified"
        message="Your identity has been confirmed."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {errors.form && <ErrorState message={errors.form} />}

      <p className="text-sm text-slate-500">
        Enter the {length}-digit code we sent to{" "}
        <span className="font-medium text-slate-700">
          {destination || "your email"}
        </span>
        .
      </p>

      <OTPInput
        length={length}
        value={code}
        onChange={setCode}
        onComplete={(finalCode) => {
          if (onSubmit) {
            onSubmit(finalCode);
          } else {
            navigate("/reset-password");
          }
        }}
        error={errors.otp}
        disabled={loading}
      />

      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={loading || code.length !== length}
      >
        Verify
      </Button>

      <div className="text-center text-sm text-slate-500">
        Didn&apos;t get a code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || resending}
          className="font-medium text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
        >
          {resending
            ? "Resending…"
            : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend code"}
        </button>
      </div>
    </form>
  );
}
