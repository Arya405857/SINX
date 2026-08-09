import { useId } from "react";

/**
 * "Remember me" checkbox. Fully controlled — parent owns the checked state.
 */
export default function RememberMe({
  checked = false,
  onChange,
  label = "Remember me",
  disabled = false,
  className = "",
}) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={`inline-flex select-none items-center gap-2 text-sm text-slate-600 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className={[
          "h-4 w-4 rounded border-slate-300 text-blue-600",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1",
          "transition-colors duration-200",
        ].join(" ")}
      />
      {label}
    </label>
  );
}
