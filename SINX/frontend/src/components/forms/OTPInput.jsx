import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Segmented OTP / verification code input.
 *
 * Props:
 *  - length: number of digits (default 6)
 *  - value: controlled string value (optional)
 *  - onChange(code): fired on every keystroke with the full current code
 *  - onComplete(code): fired once all boxes are filled
 *  - error: validation error message
 *  - disabled
 */
export default function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  error,
  disabled = false,
  className = "",
}) {
  const [digits, setDigits] = useState(
    () => value?.split("").slice(0, length) ?? Array(length).fill("")
  );
  const inputsRef = useRef([]);

  useEffect(() => {
    if (value !== undefined) {
      setDigits(value.split("").slice(0, length).concat(Array(length).fill("")).slice(0, length));
    }
  }, [value, length]);

  const emit = (next) => {
    const code = next.join("");
    onChange?.(code);
    if (next.every((d) => d !== "")) {
      onComplete?.(code);
    }
  };

  const focusIndex = (index) => {
    inputsRef.current[index]?.focus();
    inputsRef.current[index]?.select();
  };

  const handleChange = (index, raw) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    emit(next);

    if (digit && index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
        emit(next);
      } else if (index > 0) {
        focusIndex(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusIndex(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    const next = Array(length)
      .fill("")
      .map((_, i) => pasted[i] || "");
    setDigits(next);
    emit(next);
    focusIndex(Math.min(pasted.length, length - 1));
  };

  return (
    <div className={className}>
      <div
        role="group"
        aria-label="One-time verification code"
        className="flex justify-between gap-2 sm:gap-3"
      >
        {digits.map((digit, i) => (
          <motion.input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={Boolean(error)}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={[
              "h-12 w-11 sm:h-14 sm:w-12 rounded-lg border text-center text-lg font-semibold text-slate-900",
              "transition-colors duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
              error
                ? "border-red-400 focus-visible:ring-red-400"
                : "border-slate-300 focus:border-blue-500 focus-visible:ring-blue-400",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
            ].join(" ")}
          />
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
