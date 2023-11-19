import {useEffect} from "react";
import ProtectedRoute from "/src/components/ProtectedRoute";
import CheckoutContact from "/src/pages/CheckoutContact";
import CheckoutShipping from "/src/pages/CheckoutShipping";
import CheckoutPayment from "/src/pages/CheckoutPayment";
import NotFound from "/src/pages/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCheckout } from "/src/contexts/CheckoutContext";
import { useCart } from "/src/contexts/CartContext";

const CheckoutRoutes = () => {
  const { checkoutInfo } = useCheckout();
  const { isCartEmpty, singleProduct, setSingleProduct } = useCart();

  useEffect(()=>{
    // Reset singleProduct when the user leaves this route
    return () => setSingleProduct(null);
  }, [])

  return (
    <Routes>
      {checkoutInfo.checkoutInfo.map((tab, i) => (
        <Route
          key={tab.name}
          element={
            <ProtectedRoute
              condition={
                (!isCartEmpty() || singleProduct !== null) && tab.condition
              }
              redirect="/404"
            />
          }>
          <Route
            path={tab.route}
            element={checkoutInfo.checkoutPages[i]}></Route>
        </Route>
      ))}
      <Route path="*" element={<Navigate to="/checkout/contact" />} />
    </Routes>
  );
};

export default CheckoutRoutes;
