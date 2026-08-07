import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ErrorState from "../ui/ErrorState";
import SuccessState from "../ui/SuccessState";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email }) {
  const errors = {};
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  return errors;
}

/**
 * ForgotPasswordForm — collects an email and requests a reset link.
 *
 * Props:
 *  - onSubmit({ email })
 *  - loading, errors ({ email?, form? }), success
 *  - onBackToLoginClick
 */
export default function ForgotPasswordForm({
  onSubmit,
  loading = false,
  errors = {},
  success = false,
  onBackToLoginClick,
}) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState(null);

  const fieldError = localError || errors.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate({ email });
    setLocalError(validationErrors.email || null);
    setTouched(true);

    if (!validationErrors.email) {
      onSubmit?.({ email });
    }
  };

  if (success) {
    return (
      <SuccessState
        title="Check your email"
        message={`If an account exists for ${email || "that address"}, we've sent a link to reset your password.`}
        action={
          <button
            type="button"
            onClick={onBackToLoginClick}
            className="text-sm font-medium text-green-700 underline underline-offset-2 hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded"
          >
            Back to sign in
          </button>
        }
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {errors.form && <ErrorState message={errors.form} />}

      <Input
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        disabled={loading}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        error={touched ? fieldError : undefined}
        hint="We'll send a password reset link to this address."
      />

      <Button type="submit" fullWidth loading={loading} disabled={loading}>
        Send reset link
      </Button>

      <button
        type="button"
        onClick={onBackToLoginClick}
        className="text-center text-sm font-medium text-slate-500 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
      >
        ← Back to sign in
      </button>
    </form>
  );
}
