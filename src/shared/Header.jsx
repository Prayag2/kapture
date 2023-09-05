import Nav from "/src/components/Nav/Nav";
import Wrapper from "/src/components/Wrapper";
import Button from "/src/components/Button";
import Input from "/src/components/Input";
import Logo from "/src/components/Logo";

import { useState } from "react";
import { useCart } from "/src/contexts/CartContext";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { setIsCartOpen, cartQuantity } = useCart();
  const toggleNav = () => setNavOpen((p) => !p);

  const navLinks = [
    {
      name: "Products",
      type: "link",
      to: "/products",
    },
    {
      name: "Categories",
      type: "dropdown",
      children: [
        {
          name: "Watch Straps",
          type: "link",
          to: "/products/categories/straps",
        },
        {
          name: "Toys",
          type: "link",
          to: "/products/categories/toys",
        },
        {
          name: "Stationary",
          type: "link",
          to: "/products/categories/stationary",
        },
      ],
    },
    {
      name: "Support",
      type: "link",
      to: "/support",
    },
  ];

  return (
    <>
      <header className="w-full h-[10vh] fixed z-10 bg-background">
        <Wrapper className="flex justify-between items-center h-full">
          <div className="flex items-center gap-10">
            <Logo />
            <Nav navLinks={navLinks} navOpen={navOpen} toggleNav={toggleNav} />
          </div>
          <div className="flex items-center gap-10">
            <div className="hidden md:block w-48 xl:w-64">
              <Input
                icon={<img alt="" src="/images/icons/search.svg" />}
                placeholder="Search products"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                colour="background"
                icon={<img alt="" src="/images/icons/heart.svg" />}
                circle
              ></Button>
              <Button
                onClick={() => setIsCartOpen(true)}
                colour="background"
                icon={<img alt="" src="/images/icons/cart.svg" />}
                badgeText={cartQuantity.toString()}
                circle
              ></Button>
              <div className="hidden lg:block">
                <Button
                  colour="background"
                  icon={<img alt="" src="/images/icons/user.svg" />}
                  circle
                >
                  Sign Up
                </Button>
              </div>
              <div className="lg:hidden">
                <Button
                  onClick={toggleNav}
                  colour="background"
                  icon={<img alt="" src="/images/icons/menu.svg" />}
                  circle
                ></Button>
              </div>
            </div>
          </div>
        </Wrapper>
      </header>
      <div className="h-[10vh]"></div>
    </>
  );
};

export default Header;
