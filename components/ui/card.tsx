import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isAlert?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", isAlert = false, ...props }, ref) => {
    const borderClasses = isAlert
      ? "border-2 border-secondary border-b-4"
      : "border-2 border-primary border-b-4 hover:border-secondary";

    return (
      <div
        ref={ref}
        className={`bg-surface p-6 transition-colors ${borderClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
