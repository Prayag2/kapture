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
  disabled
}) {
  const colours = {
    primary: `text-background bg-primary${disabled ? "-light " : " hover:bg-primary-dark"}`,
    secondary: `text-primary bg-secondary${disabled ? "-light " : " hover:bg-secondary-dark"}`,
    background: `text-primary bg-background${disabled ? "-light " : " hover:bg-background-dark"}`,
    accent: `text-background bg-accent${disabled ? "-light" : " hover:bg-accent-dark"}`,
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
      disabled={disabled}
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
  disabled: false
};

export default Button;
