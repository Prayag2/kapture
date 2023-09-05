import { useState, useContext, createContext, useMemo } from "react";

const cartContext = createContext();
export const useCart = () => useContext(cartContext);

const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartQuantity = useMemo(() => {
    let total = 0;
    cartData.forEach((item) => (total += item.quantity));
    console.log(cartData);
    return total;
  }, [cartData]);

  const isProductInCart = (productID) => {
    return cartData.some((el) => el.product.productID === productID);
  };

  const addToCart = (product, quantity) => {
    if (isProductInCart(product.productID)) return;
    setCartData((prev) => [...prev, { product, quantity }]);
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (productID, newQuantity) => {
    setCartData((prev) =>
      prev.map((item) => {
        if (item.product.productID === productID)
          item.quantity = parseInt(newQuantity);
        return item;
      }),
    );
  };

  const isCartEmpty = () => cartData.length === 0;

  const deleteFromCart = (productID) => {
    setCartData((prev) =>
      prev.filter((item) => item.product.productID != productID),
    );
  };

  return (
    <cartContext.Provider
      value={{
        addToCart,
        updateCartItemQuantity,
        deleteFromCart,
        cartData,
        isCartOpen,
        setIsCartOpen,
        isCartEmpty,
        cartQuantity,
        isProductInCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
