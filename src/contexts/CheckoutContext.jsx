import CheckoutContact from "/src/pages/CheckoutContact";
import CheckoutShipping from "/src/pages/CheckoutShipping";
import CheckoutPayment from "/src/pages/CheckoutPayment";
import NotFound from "/src/pages/NotFound";
import { useState, useMemo, useEffect, createContext, useContext } from "react";
import { useLocalStorage } from "/src/hooks/LocalStorage";

const checkoutContext = createContext();
export const useCheckout = () => useContext(checkoutContext);

const CheckoutContextProvider = ({ children }) => {
  const [localCheckoutInfo, setLocalCheckoutInfo, removeLocalCheckoutInfo] =
    useLocalStorage("checkoutInfo", [
      {
        name: "Contact Information",
        completed: false,
        route: "contact",
        condition: true,
        formInfo: {
          fullName: null,
          emailAddress: null,
          mobile: null,
	  altMobile: null
        },
      },
      {
        name: "Shipping Details",
        completed: false,
        route: "shipping",
        condition: false,
        formInfo: {
          flat: null,
          area: null,
          landmark: null,
          city: null,
          state: null,
          pincode: null,
        },
      },
      {
        name: "Payment Method",
        completed: false,
        route: "payment",
        condition: false,
      },
    ]);

  // Two separate properties inside checkoutinfo since we can't store component references
  // in local storage as strings. We'll only be storing the checkoutInfo part in local storage,
  // and not checkoutPages.
  const [checkoutInfo, setCheckoutInfo] = useState({
    checkoutPages: [
      <CheckoutContact />,
      <CheckoutShipping />,
      <CheckoutPayment />,
    ],
    checkoutInfo: localCheckoutInfo,
  });

  const updateCheckoutInfo = async (tabIndex, property, val) => {
    await setCheckoutInfo((prev) => {
      let updatedCheckoutInfo = { ...prev };
      updatedCheckoutInfo.checkoutInfo[tabIndex][property] = val;
      setLocalCheckoutInfo(updatedCheckoutInfo.checkoutInfo);
      return updatedCheckoutInfo;
    });
  };

  return (
    <checkoutContext.Provider value={{ checkoutInfo, updateCheckoutInfo }}>
      {children}
    </checkoutContext.Provider>
  );
};

export default CheckoutContextProvider;
