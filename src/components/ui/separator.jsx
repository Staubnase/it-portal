export function Separator({ className = "", ...props }) {
  const classes = ["separator", className].filter(Boolean).join(" ");
  return <div className={classes} {...props} />;
}

export default Separator;
