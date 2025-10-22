import React from "react";

export function Card({ className = "", ...props }) {
  const classes = ["card", className].filter(Boolean).join(" ");
  return <div className={classes} {...props} />;
}

export function CardHeader({ className = "", ...props }) {
  const classes = ["card-header", className].filter(Boolean).join(" ");
  return <div className={classes} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  const classes = ["card-title", className].filter(Boolean).join(" ");
  return <h3 className={classes} {...props} />;
}

export function CardDescription({ className = "", ...props }) {
  const classes = ["card-description", className].filter(Boolean).join(" ");
  return <p className={classes} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  const classes = ["card-content", className].filter(Boolean).join(" ");
  return <div className={classes} {...props} />;
}
