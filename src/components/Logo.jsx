import { Link } from "react-router-dom";

const Logo = ({ full }) => {
  return (
    <Link to="/" className="h-8 inline-block">
      <img
        alt="Kapture"
        className={`h-full ${full ? "block" : "hidden md:block"}`}
        src="/images/logo/logo.svg"
      />
      <img
        alt="Kapture"
        className={`h-full ${full ? "hidden" : "md:hidden"}`}
        src="/images/logo/icon.svg"
      />
    </Link>
  );
};

Logo.defaultProps = {
  full: false,
};
export default Logo;
