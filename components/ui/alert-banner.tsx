import React from "react";

export interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative border-2 border-secondary bg-surface p-4 pl-12 flex items-center mb-8 ${className}`}
        {...props}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-8"
          style={{
            background:
              "repeating-linear-gradient(45deg, var(--color-secondary), var(--color-secondary) 10px, var(--color-surface) 10px, var(--color-surface) 20px)",
          }}
        />
        <div className="font-heading font-bold text-secondary text-xl uppercase tracking-tight">
          {children}
        </div>
      </div>
    );
  }
);
AlertBanner.displayName = "AlertBanner";
