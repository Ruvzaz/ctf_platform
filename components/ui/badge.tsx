import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "alert";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className = "", variant = "default", ...props }, ref) => {
    const colorClass =
      variant === "alert"
        ? "border-secondary text-secondary"
        : "border-primary text-primary";
    return (
      <span
        ref={ref}
        className={`border ${colorClass} font-mono text-[12px] font-bold px-2 py-1 uppercase tracking-wider ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";
