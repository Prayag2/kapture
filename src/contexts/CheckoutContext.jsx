import CheckoutContact from "/src/pages/CheckoutContact";
import CheckoutShipping from "/src/pages/CheckoutShipping";
import CheckoutPayment from "/src/pages/CheckoutPayment";
import NotFound from "/src/pages/NotFound";
import { useState, useEffect, createContext, useContext } from "react";
import { useLocalStorage } from "/src/hooks/LocalStorage";

const checkoutContext = createContext();
export const useCheckout = () => useContext(checkoutContext);

const CheckoutContextProvider = ({ children }) => {
  // stepID is also used for the route so it must be unique
  const [localCheckoutInfo, setLocalCheckoutInfo, removeLocalCheckoutInfo] =
    useLocalStorage("checkoutInfo", {
      contact: {
        name: "Contact Information",
        accessible: true,
        formData: {
          fullName: null,
          emailAddress: null,
          mobile: null,
          altMobile: null,
        },
      },
      shipping: {
        name: "Shipping Details",
        accessible: false,
        formData: {
          flat: null,
          area: null,
          landmark: null,
          city: null,
          state: null,
          pincode: null,
        },
      },
      payment: {
        accessible: false,
        name: "Payment Method",
      },
    });

  const checkoutPages = {
    contact: <CheckoutContact />,
    shipping: <CheckoutShipping />,
    payment: <CheckoutPayment />,
  };

  const [checkoutInfo, setCheckoutInfo] = useState(localCheckoutInfo);
  const updateCheckoutInfo = (stepID, property, val) => {
    setCheckoutInfo((prev) => {
      let updatedCheckoutInfo = { ...prev };
      updatedCheckoutInfo[stepID][property] = val;
      console.log("[CheckoutContext] updateCheckoutInfo called]")
      console.log(updatedCheckoutInfo);
      return updatedCheckoutInfo;
    });
  };

  const handleFormChange = async (formEl, curStepID, nextStepID) => {
    const formData = new FormData(formEl);
    let data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    updateCheckoutInfo(curStepID, "formData", data);
    if (formEl.checkValidity()) {
      console.log("[CheckoutContext] handleFormChange called");
      console.log(data);
      updateCheckoutInfo(nextStepID, "accessible", true);
      return true;
    } else {
      updateCheckoutInfo(nextStepID, "accessible", false);
      return false;
    }
  };

  const setValue = (name, value) => {
    const el = document.getElementById(name);
    if (el) el.value = value;
  };

  const populateFormData = (formEl, curStepID, nextStepID) => {
    console.log("[CheckoutContext] populateFormData called]");
    const handleInput = () => {
      setTimeout(
        () => handleFormChange(formEl.current, curStepID, nextStepID),
        0,
      );
    };
    if (formEl.current) {
      formEl.current.getElementsByTagName("input")[0].focus();
      Object.keys(checkoutInfo[curStepID].formData).forEach((name) => {
        setValue(name, checkoutInfo[curStepID].formData[name]);
      });
      formEl.current.querySelectorAll("input,select").forEach((el) => {
        el.addEventListener("input", handleInput);
      });
    }
    return () => {
      if (formEl.current) {
        formEl.current.querySelectorAll("input, select").forEach((el) => {
          el.removeEventListener("input", handleInput);
        });
      }
    };
  };

  useEffect(() => {
    // Update local storage on unload
    const handleBeforeUnload = (e) => {
      setLocalCheckoutInfo(checkoutInfo);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <checkoutContext.Provider
      value={{
        checkoutInfo,
        updateCheckoutInfo,
        checkoutPages,
        handleFormChange,
        populateFormData,
      }}>
      {children}
    </checkoutContext.Provider>
  );
};

export default CheckoutContextProvider;
