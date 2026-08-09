import { forwardRef, useId } from "react";

/**
 * Accessible text input used across every auth form.
 * Backend-agnostic: parent owns value / onChange / validation logic.
 */
const Input = forwardRef(function Input(
  {
    label,
    id,
    error,
    hint,
    required = false,
    leftIcon = null,
    rightSlot = null,
    className = "",
    containerClassName = "",
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-600" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 flex h-5 w-5 items-center justify-center text-slate-400">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [hintId, errorId].filter(Boolean).join(" ") || undefined
          }
          className={[
            "h-11 w-full rounded-lg border bg-white text-sm text-slate-900",
            "placeholder:text-slate-400",
            "transition-colors duration-200",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
            leftIcon ? "pl-10" : "pl-3.5",
            rightSlot ? "pr-11" : "pr-3.5",
            error
              ? "border-red-400 focus:border-red-500 focus-visible:ring-red-400"
              : "border-slate-300 focus:border-blue-500 focus-visible:ring-blue-400",
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
            className,
          ].join(" ")}
          {...props}
        />

        {rightSlot && (
          <span className="absolute right-2 flex items-center">
            {rightSlot}
          </span>
        )}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
