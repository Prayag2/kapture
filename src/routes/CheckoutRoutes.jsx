import { useEffect } from "react";
import ProtectedRoute from "/src/components/ProtectedRoute";
import CheckoutContact from "/src/pages/CheckoutContact";
import CheckoutShipping from "/src/pages/CheckoutShipping";
import CheckoutPayment from "/src/pages/CheckoutPayment";
import NotFound from "/src/pages/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCheckout } from "/src/contexts/CheckoutContext";
import { useCart } from "/src/contexts/CartContext";
import { useValidate } from "/src/hooks/Validate";

const CheckoutRoutes = () => {
  const { checkoutInfo, checkoutPages } = useCheckout();
  const { isCartEmpty, singleProduct, setSingleProduct } = useCart();
  const isValid = useValidate();

  useEffect(() => {
    // Reset singleProduct when the user leaves this route
    return () => setSingleProduct(null);
  }, []);

  return (
    <Routes>
      {Object.keys(checkoutInfo).map((stepID, i) => (
        <Route
          key={stepID}
          element={
            <ProtectedRoute
              condition={(!isCartEmpty() || singleProduct !== null) && checkoutInfo[stepID].accessible}
              redirect="/404"
            />
          }>
          <Route path={stepID} element={checkoutPages[stepID]}></Route>
        </Route>
      ))}
      <Route path="*" element={<Navigate to="/checkout/contact" />} />
    </Routes>
  );
};

export default CheckoutRoutes;
