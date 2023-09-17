import React from "react";
import NavItem from "/src/components/Nav/NavItem";
import NavDropdown from "/src/components/Nav/NavDropdown";
import Button from "/src/components/Button";
import Wrapper from "/src/components/Wrapper";
import Logo from "/src/components/Logo";

const generateNavLinks = (navLinks, touch) => {
  return navLinks.map((navLink, id) => {
    if (navLink.type === "link") {
      return (
        <NavItem className="block" key={`navItem${id}`} to={navLink.to}>
          {navLink.name}
        </NavItem>
      );
    } else {
      return (
        <NavDropdown
          key={`navDropdown${id}`}
          name={navLink.name}
          to={navLink.to}
          navLinks={navLink.children}
          touch={touch}
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
  });
};

const Nav = ({ navLinks, className, navOpen, toggleNav }) => {
  const navLinksRegular = generateNavLinks(navLinks, false);
  const navLinksTouch = generateNavLinks(navLinks, true);

  return (
    <>
      <nav className="lg:flex gap-8 hidden">{navLinksRegular}</nav>
      {navOpen && (
        <div
          aria-label="cart backdrop"
          onClick={() => toggleNav()}
          className="fixed top-0 left-0 w-full h-full bg-primary z-40 opacity-25"
        ></div>
      )}
      <nav
        onClick={toggleNav}
        className={`fixed top-0 w-full max-w-[30rem] h-[100vh] bg-background shadow-md transition-[left] ${
          navOpen ? "left-0" : "left-[-100%]"
        } z-50 text-lg py-5`}
      >
        <Wrapper className="space-y-5">
          <div className="flex justify-between items-center">
            <Logo full />
	    <Button onClick={toggleNav} colour="background" icon={ <img alt="⨯" src="/images/icons/close.svg"/> } circle />
          </div>
          <div className="space-y-3">{navLinksTouch}</div>
          <div className="flex gap-4">
            <Button to="/login">Login</Button>
            <Button to="/login">Sign Up</Button>
          </div>
        </Wrapper>
      </nav>
    </>
  );
};

Nav.defaultProps = {
  navLinks: [],
  className: "",
  navOpen: false,
};

export default Nav;
