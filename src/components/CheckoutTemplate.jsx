import Wrapper from "/src/components/Wrapper";
import OrderSummary from "/src/components/OrderSummary";
import Title from "/src/components/Title";
import { useState, useEffect } from "react";
import { useCheckout } from "/src/contexts/CheckoutContext";
import { useNavigate } from "react-router-dom";

const CheckoutTemplate = ({ children, formEl, curStepID, nextStepID }) => {
  const { checkoutInfo, handleFormChange } = useCheckout();
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const valid = await handleFormChange(formEl.current, curStepID, nextStepID);
    if (valid) {
      navigate(`/checkout/${nextStepID}`);
    } else {
      formEl.current.reportValidity();
    }
  };

  return (
    <Wrapper className="text-center">
      <Title>Checkout</Title>
      <div className="flex gap-8 justify-center w-full mb-8">
        {Object.keys(checkoutInfo).map((stepID, i) => {
          const isAccessible = checkoutInfo[stepID].accessible;
          return (
            <a
              onClick={() =>
                isAccessible ? navigate(`/checkout/${stepID}`) : null
              }
              key={`step-${stepID}`}
              className={`${
                curStepID == stepID ? "text-accent" : "text-primary"
              } ${
                !isAccessible
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}>
              {checkoutInfo[stepID].name}
            </a>
          );
        })}
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-10 p-5">
        <div className="w-full">{children}</div>
        <OrderSummary onSubmit={handleFormSubmit} />
      </div>
    </Wrapper>
  );
};

export default CheckoutTemplate;
