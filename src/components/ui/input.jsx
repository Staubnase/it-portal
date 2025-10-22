import React from "react";

export const Input = React.forwardRef(function Input({ className = "", ...props }, ref) {
  const classes = ["form-control", className].filter(Boolean).join(" ");
  return <input ref={ref} className={classes} {...props} />;
});

export default Input;
