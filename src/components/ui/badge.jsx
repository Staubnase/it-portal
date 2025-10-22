import React from "react";

const variantClasses = {
  primary: "badge badge-primary",
  secondary: "badge badge-primary",
  outline: "badge badge-muted",
  info: "badge badge-info",
  muted: "badge badge-muted",
};

export function Badge({ className = "", variant = "secondary", ...props }) {
  const variantClass = variantClasses[variant] ?? variantClasses.secondary;
  const classes = [variantClass, className].filter(Boolean).join(" ");
  return <span className={classes} {...props} />;
}
