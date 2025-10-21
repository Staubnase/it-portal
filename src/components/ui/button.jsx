import React from "react";

const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-slate-800 text-white hover:bg-slate-900",
  outline: "border border-slate-300 text-slate-900 hover:bg-slate-100",
  ghost: "text-slate-900 hover:bg-slate-100",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-5",
};

export const Button = React.forwardRef(function Button(
  { className = "", variant = "default", size = "default", ...props },
  ref
) {
  const variantClass = variants[variant] ?? variants.default;
  const sizeClass = sizes[size] ?? sizes.default;
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  );
});

export default Button;
