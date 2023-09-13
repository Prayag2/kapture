import Nav from "/src/components/Nav/Nav";
import Wrapper from "/src/components/Wrapper";
import Button from "/src/components/Button";
import Input from "/src/components/Input";
import Logo from "/src/components/Logo";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "/src/contexts/CartContext";
import { useFirestore } from "/src/contexts/FirestoreContext";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((p) => !p);
  const navigate = useNavigate();

  const { setIsCartOpen, cartQuantity } = useCart();
  const { categoryData } = useFirestore();

  const navLinks = [
    {
      name: "Products",
      type: "link",
      to: "/products",
    },
    {
      name: "Categories",
      type: "dropdown",
      children: categoryData.map((item) => {
        return {
          name: item.name,
          type: "link",
          to: `/category/${item.itemID}`,
        };
      }),
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
          <div className="flex items-center gap-3">
            <Button
              colour="background"
              icon={<img alt="" src="/images/icons/search.svg" />}
              onClick={() => navigate("/search")}
              circle
            ></Button>
            <Button
              onClick={() => setIsCartOpen(true)}
              colour="background"
              icon={<img alt="" src="/images/icons/cart.svg" />}
              badgeText={cartQuantity.toString()}
              circle
            ></Button>
            <div className="lg:hidden">
              <Button
                onClick={toggleNav}
                colour="background"
                icon={<img alt="" src="/images/icons/menu.svg" />}
                circle
              ></Button>
            </div>
          </div>
        </Wrapper>
      </header>
      <div className="h-[10vh]"></div>
    </>
  );
};

export default Header;
