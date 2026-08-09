import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Divider from "../ui/Divider";
import PasswordField from "./PasswordField";
import RememberMe from "./RememberMe";
import SocialLogin from "./SocialLogin";
import ErrorState from "../ui/ErrorState";
import SuccessState from "../ui/SuccessState";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }) {
  const errors = {};
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";

  if (!password) errors.password = "Password is required.";

  return errors;
}

/**
 * LoginForm — presentational + client-side validation only.
 *
 * Props:
 *  - onSubmit({ email, password, rememberMe }): called with validated data
 *  - loading: bool — disables inputs, shows spinner on submit button
 *  - errors: { email?, password?, form? } — server-side errors to display
 *  - success: bool — show a success banner instead of (or above) the form
 *  - onForgotPasswordClick, onRegisterClick: nav callbacks
 *  - onGoogleClick, onGithubClick, socialLoadingProvider: social auth UI hooks
 */
export default function LoginForm({
  onSubmit,
  loading = false,
  errors = {},
  success = false,
  onForgotPasswordClick,
  onRegisterClick,
  onGoogleClick,
  onGithubClick,
  socialLoadingProvider = null,
}) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
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
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length === 0) {
      onSubmit?.({ ...values, rememberMe });
    }
  };

  if (success) {
    return (
      <SuccessState
        title="Signed in"
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

      <div className="flex flex-col gap-1.5">
        <PasswordField
          id="password"
          value={values.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          error={touched.password ? fieldError("password") : undefined}
          disabled={loading}
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="self-end text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
        >
          Forgot password?
        </button>
      </div>

      <RememberMe checked={rememberMe} onChange={setRememberMe} disabled={loading} />

      <Button type="submit" fullWidth loading={loading} disabled={loading}>
        Sign in
      </Button>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
