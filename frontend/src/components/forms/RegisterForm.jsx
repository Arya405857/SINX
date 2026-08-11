import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Divider from "../ui/Divider";
import PasswordField from "./PasswordField";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import SocialLogin from "./SocialLogin";
import ErrorState from "../ui/ErrorState";
import SuccessState from "../ui/SuccessState";
import { Link } from "react-router-dom";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ fullName, email, password, confirmPassword, acceptTerms }) {
  const errors = {};
  if (!fullName?.trim()) errors.fullName = "Full name is required.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";

  if (!password) errors.password = "Password is required.";
  else if (password.length < 8) errors.password = "Use at least 8 characters.";

  if (!confirmPassword) errors.confirmPassword = "Confirm your password.";
  else if (confirmPassword !== password) errors.confirmPassword = "Passwords don't match.";

  if (!acceptTerms) errors.acceptTerms = "You must accept the Terms to continue.";

  return errors;
}

/**
 * RegisterForm — presentational + client-side validation only.
 *
 * Props:
 *  - onSubmit({ fullName, email, password, acceptTerms })
 *  - loading, errors ({ fullName?, email?, password?, confirmPassword?, acceptTerms?, form? }), success
 *  - onLoginClick, onGoogleClick, onGithubClick, socialLoadingProvider
 */
export default function RegisterForm({
  onSubmit,
  loading = false,
  errors = {},
  success = false,
  onLoginClick,
  onGoogleClick,
  onGithubClick,
  socialLoadingProvider = null,
}) {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [touched, setTouched] = useState({});
  const [localErrors, setLocalErrors] = useState({});
  const navigate = useNavigate();

  const fieldError = (field) => localErrors[field] || errors[field];

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setLocalErrors(validate({ ...values, acceptTerms }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate({ ...values, acceptTerms });
    setLocalErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      onSubmit?.({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        acceptTerms,
      });
    }
  };

  if (success) {
    return (
      <SuccessState
        title="Account created"
        message="Redirecting you to your dashboard…"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {errors.form && <ErrorState message={errors.form} />}

      <SocialLogin
        onGoogleClick={onGoogleClick}
        onGithubClick={onGithubClick}
        loadingProvider={socialLoadingProvider}
        disabled={loading}
      />

      <Divider label="or continue with email" />

      <Input
        id="fullName"
        label="Full name"
        type="text"
        autoComplete="name"
        placeholder="Jordan Lee"
        required
        disabled={loading}
        value={values.fullName}
        onChange={handleChange("fullName")}
        onBlur={handleBlur("fullName")}
        error={touched.fullName ? fieldError("fullName") : undefined}
      />

      <Input
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        disabled={loading}
        value={values.email}
        onChange={handleChange("email")}
        onBlur={handleBlur("email")}
        error={touched.email ? fieldError("email") : undefined}
      />

      <div className="flex flex-col gap-2">
        <PasswordField
          id="password"
          label="Password"
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
        label="Confirm password"
        autoComplete="new-password"
        disabled={loading}
        value={values.confirmPassword}
        onChange={handleChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        error={touched.confirmPassword ? fieldError("confirmPassword") : undefined}
      />

      <div className="flex flex-col gap-1">
        <label className="inline-flex items-start gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={acceptTerms}
            disabled={loading}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            onBlur={handleBlur("acceptTerms")}
            aria-invalid={Boolean(touched.acceptTerms && fieldError("acceptTerms"))}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
          />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-700">Terms of Service</Link>{" "}
            and{" "}
            <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-700">Privacy Policy</Link>
            .
          </span>
        </label>
        {touched.acceptTerms && fieldError("acceptTerms") && (
          <p role="alert" className="text-xs font-medium text-red-600">
            {fieldError("acceptTerms")}
          </p>
        )}
      </div>

      <Button type="submit" fullWidth loading={loading} disabled={loading}>
        Create account
      </Button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}
