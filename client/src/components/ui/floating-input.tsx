import React from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

interface FloatingSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          id={id}
          ref={ref}
          className={cn(
            "form-input w-full px-4 pt-6 pb-2 bg-background border border-border rounded-lg text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={id}
          className="floating-label absolute left-4 top-4 text-muted-foreground text-sm pointer-events-none"
        >
          {label}
        </label>
        {error && (
          <p className="text-destructive text-sm mt-1" data-testid={`error-${id}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={cn(
            "form-input w-full px-4 pt-6 pb-2 bg-background border border-border rounded-lg text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={id}
          className="floating-label absolute left-4 top-4 text-muted-foreground text-sm pointer-events-none"
        >
          {label}
        </label>
        {error && (
          <p className="text-destructive text-sm mt-1" data-testid={`error-${id}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

export const FloatingSelect = React.forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          id={id}
          ref={ref}
          className={cn(
            "form-input w-full px-4 pt-6 pb-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <label
          htmlFor={id}
          className="floating-label absolute left-4 top-4 text-muted-foreground text-sm pointer-events-none"
        >
          {label}
        </label>
        {error && (
          <p className="text-destructive text-sm mt-1" data-testid={`error-${id}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FloatingSelect.displayName = "FloatingSelect";
