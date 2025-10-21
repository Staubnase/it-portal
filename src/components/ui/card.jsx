import React from "react";

export function Card({ className = "", ...props }) {
  return <div className={`rounded-xl border border-slate-200 bg-white ${className}`} {...props} />;
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`space-y-1.5 p-6 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }) {
  return <p className={`text-sm text-slate-500 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}
