import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div className="relative flex w-full">
        <input
          ref={ref}
          className={`border-2 border-primary bg-surface px-4 py-3 font-mono text-sm w-full focus:outline-none focus:border-secondary transition-colors ${className}`}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
