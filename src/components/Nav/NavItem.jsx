import { NavLink } from "react-router-dom";

const NavItem = ({ children, to, className, onClick }) => {
  return (
    <NavLink onClick={onClick} to={to} className={`${className}`}>
      {children}
    </NavLink>
  );
};

NavItem.defaultProps = {
  to: null,
  children: "Link",
  className: "",
  onClick: null,
};
export default NavItem;
