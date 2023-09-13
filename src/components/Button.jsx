import { useNavigate } from "react-router-dom";

function Button({
  children,
  colour,
  onClick,
  icon,
  circle,
  to,
  className,
  badgeText,
}) {
  const colours = {
    primary: "bg-primary text-background hover:bg-primary-dark",
    secondary: "bg-secondary text-primary hover:bg-secondary-dark",
    background: "bg-background text-primary hover:bg-background-dark",
    accent: "bg-accent text-background hover:bg-accent-dark",
  };
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.stopPropagation();
    if (to) navigate(to);
    else onClick();
  };
  return (
    <button
      onClick={handleClick}
      className={`px-2 h-10 min-w-[2.5rem] ${
        circle ? "rounded-full" : "rounded-md"
      } ${
        colours[colour]
      } flex items-center justify-center gap-2 ${className} relative`}
    >
      {icon ? <span className="h-full py-2 [&>*]:h-full">{icon}</span> : null}
      {badgeText ? (
        <span className="w-5 h-5 absolute top-0 right-0 bg-accent text-background text-xs rounded-full font-display font-bold flex justify-center items-center">
          {badgeText}
        </span>
      ) : null}
      {children ? children : null}
    </button>
  );
}

Button.defaultProps = {
  colour: "primary",
  circle: false,
  onClick: () => {},
};

export default Button;
