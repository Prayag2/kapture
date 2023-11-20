import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "/src/components/Wrapper";
import OrderSummary from "/src/components/OrderSummary";
import Title from "/src/components/Title";
import {useCheckout} from "/src/contexts/CheckoutContext";

const CheckoutTemplate = ({ children, onSubmit }) => {
  const { checkoutInfo } = useCheckout();
  const location = useLocation();
  const routeName = location.pathname.split("/")[2]
  const currentTab = 0;

  return (
    <Wrapper className="text-center">
      <Title>Checkout</Title>
      <div className="flex gap-8 justify-center w-full mb-8">
        {checkoutInfo.checkoutInfo.map((tab, i) => (
          <p
            key={`tab-${i}`}
            className={`${routeName == tab.route ? "text-accent" : "text-primary"} ${
              !tab.completed && currentTab < i ? "opacity-50" : ""
            } cursor-pointer`}>
            {tab.name}
          </p>
        ))}
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-10 p-5">
	<div className="w-full">
	  {children}
	</div>
	<OrderSummary onSubmit={onSubmit} />
      </div>
    </Wrapper>
  );
};

export default CheckoutTemplate;
