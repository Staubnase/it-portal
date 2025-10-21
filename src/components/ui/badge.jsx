import React from "react";

export function Badge({ className = "", variant = "secondary", ...props }) {
  const variantClass =
    variant === "outline"
      ? "border border-slate-300 text-slate-700"
      : "bg-slate-900 text-white";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${variantClass} ${className}`}
      {...props}
    />
  );
}
