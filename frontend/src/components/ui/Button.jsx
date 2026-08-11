import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-blue-700 focus-visible:outline-primary",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-emerald-600 focus-visible:outline-secondary",
  outline:
    "bg-surface text-foreground border border-border shadow-sm hover:bg-background",
  ghost: "bg-transparent text-foreground hover:bg-background",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export default function Button({
  as = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  fullWidth = false,
  loading = false,
  leftIcon = null,
  ...props
}) {
  const Component = motion[as] || motion.button;

  return (
    <Component
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? "Loading..." : <>{leftIcon}{children}</>}
    </Component>
  );
}
