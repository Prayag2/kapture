import NavItem from "/src/components/Nav/NavItem";
import { useState } from "react";

const NavDropdown = ({ to, name, navLinks, touch, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((p) => !p);

  return touch ? (
    <div>
      <NavItem
        className="mb-3 block"
        onClick={(e) => {
          toggleDropdown();
          onClick(e);
        }}
      >
        {name}
        <img
          className={`h-5 ml-4 inline-block ${!isOpen && "rotate-180"}`}
          alt=""
          src="/images/icons/down-arrow.svg"
        />
      </NavItem>
      <div className={`pl-4 ${isOpen ? "hidden" : "block"} space-y-3`}>
        {navLinks.map((navLink, id) => (
          <NavItem
            key={`dropdownTouchItem${id}`}
            onClick={toggleDropdown}
            className="block"
            to={navLink.to}
          >
            {navLink.name}
          </NavItem>
        ))}
      </div>
    </div>
  ) : (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavItem className="py-4" to={to}>
        {name}
        <img
          className={`h-4 ml-2 inline-block`}
          alt=""
          src="/images/icons/down-arrow.svg"
        />
      </NavItem>
      <div
        className={`bg-secondary absolute top-8 px-5 py-3 space-y-3 rounded-md w-60 shadow-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((navLink, id) => (
          <NavItem
            key={`dropdownHoverItem-${id}`}
            className="block"
            to={navLink.to}
          >
            {navLink.name}
          </NavItem>
        ))}
      </div>
    </div>
  );
};

NavDropdown.defaultProps = {
  navLinks: [],
  touch: false,
};

export default NavDropdown;
