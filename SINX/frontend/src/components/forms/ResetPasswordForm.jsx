import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import ErrorState from "../ui/ErrorState";
import SuccessState from "../ui/SuccessState";
import PasswordField from "./PasswordField";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

function validate({ password, confirmPassword }) {
  const errors = {};
  if (!password) errors.password = "Password is required.";
  else if (password.length < 8) errors.password = "Use at least 8 characters.";

  if (!confirmPassword) errors.confirmPassword = "Confirm your new password.";
  else if (confirmPassword !== password)
    errors.confirmPassword = "Passwords don't match.";

  return errors;
}

/**
 * ResetPasswordForm — sets a new password, typically reached via a
 * tokenized email link. The token itself is handled by the parent /
 * router, not this component.
 *
 * Props:
 *  - onSubmit({ password })
 *  - loading, errors ({ password?, confirmPassword?, form? }), success
 *  - onBackToLoginClick
 */
export default function ResetPasswordForm({
  onSubmit,
  loading = false,
  errors = {},
  success = false,
  onBackToLoginClick,
}) {
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const [touched, setTouched] = useState({});
  const [localErrors, setLocalErrors] = useState({});
  const navigate = useNavigate();

  const fieldError = (field) => localErrors[field] || errors[field];

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setLocalErrors(validate(values));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setLocalErrors(validationErrors);
    setTouched({ password: true, confirmPassword: true });

    if (Object.keys(validationErrors).length === 0) {
      if (onSubmit) {
        onSubmit({ password: values.password });
      } else {
        navigate("/login");
      }
    }
  };

  if (success) {
    return (
      <SuccessState
        title="Password updated"
        message="Your password has been reset. You can now sign in with your new password."
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

      <div className="flex flex-col gap-2">
        <PasswordField
          id="password"
          label="New password"
          autoComplete="new-password"
          disabled={loading}
          value={values.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          error={touched.password ? fieldError("password") : undefined}
        />
        <PasswordStrengthMeter password={values.password} />
      </div>

      <PasswordField
        id="confirmPassword"
        label="Confirm new password"
        autoComplete="new-password"
        disabled={loading}
        value={values.confirmPassword}
        onChange={handleChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        error={
          touched.confirmPassword ? fieldError("confirmPassword") : undefined
        }
      />

      <Button type="submit" fullWidth loading={loading} disabled={loading}>
        Reset password
      </Button>
    </form>
  );
}
