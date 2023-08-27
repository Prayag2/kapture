function Button({ children, colour, onClick, icon, circle }) {
  const colours = {
    primary: "bg-primary text-background hover:bg-primary-dark",
    secondary: "bg-secondary hover:bg-secondary-dark",
    background: "bg-background hover:bg-background-dark",
    accent: "bg-accent text-background hover:bg-accent-dark",
  };

  return (
    <button
      onClick={onClick}
      className={`relative ${children ? "px-3" : "px-2"} h-9 ${
        circle ? "rounded-full" : "rounded-md"
      } ${colours[colour]} flex items-center justify-center gap-2`}
    >
      {icon ? <span className="h-full py-2 [&>*]:h-full">{icon}</span> : null}
      {children ? children : null}
    </button>
  );
}

Button.defaultProps = {
  colour: "primary",
  circle: false,
};

export default Button;
