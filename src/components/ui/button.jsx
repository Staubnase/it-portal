import React from "react";

const variantClasses = {
  default: "btn-primary",
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-secondary",
  ghost: "btn-ghost",
  link: "btn-link",
};

const sizeClasses = {
  default: "",
  sm: "btn-sm",
  lg: "btn-lg",
};

export const Button = React.forwardRef(function Button(
  { className = "", variant = "default", size = "default", ...props },
  ref
) {
  const variantClass = variantClasses[variant] ?? variantClasses.default;
  const sizeClass = sizeClasses[size] ?? sizeClasses.default;
  const classes = ["btn", variantClass, sizeClass, className].filter(Boolean).join(" ");
  return <button ref={ref} className={classes} {...props} />;
});

export default Button;
