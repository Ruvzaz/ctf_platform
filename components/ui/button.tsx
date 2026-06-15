import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", className = "", ...props }, ref) => {
    const isPrimary = variant === "primary";
    const borderColor = isPrimary ? "border-primary" : "border-outline";
    const shadowColor = isPrimary
      ? "shadow-[4px_4px_0_0_var(--color-primary)]"
      : "shadow-[4px_4px_0_0_var(--color-outline)]";
    const activeShadow = isPrimary
      ? "active:shadow-[2px_2px_0_0_var(--color-primary)]"
      : "active:shadow-[2px_2px_0_0_var(--color-outline)]";

    return (
      <button
        ref={ref}
        className={`border-2 ${borderColor} bg-surface text-on-surface px-6 py-3 font-heading font-bold uppercase tracking-wide transition-all active:translate-x-[2px] active:translate-y-[2px] ${shadowColor} ${activeShadow} hover:bg-surface-dim ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
