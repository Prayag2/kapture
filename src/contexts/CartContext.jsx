import { useState, useContext, createContext, useMemo, useEffect } from "react";
import { useLocalStorage } from "/src/hooks/LocalStorage";

const cartContext = createContext();
export const useCart = () => useContext(cartContext);

const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  // singleProduct was created for the "Buy Now" button so that, if the user has
  // some items in the cart but still clicks "Buy Now" on a product, the user can
  // buy only that product without disturbing the cart
  const [singleProduct, setSingleProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [localCart, setLocalCart, removeLocalCart] = useLocalStorage(
    "cart",
    [],
  );

  useEffect(() => {
    setCartData(localCart);
  }, []);

  const cartQuantity = useMemo(() => {
    let total = 0;
    cartData.forEach((item) => (total += item.quantity));
    return total;
  }, [cartData]);

  const isProductInCart = (itemID) => {
    return cartData.some((el) => el.product.itemID === itemID);
  };

  const addToCart = (product, quantity) => {
    quantity = parseInt(quantity);
    if (isProductInCart(product.itemID)) return;
    setCartData((prev) => {
      const updatedCart = [...prev, { product, quantity }];
      setLocalCart(updatedCart);
      return updatedCart;
    });
  };

  const updateCartItemQuantity = (itemID, newQuantity) => {
    setCartData((prev) => {
      const updatedCart = prev.map((item) => {
        if (item.product.itemID === itemID)
          item.quantity = parseInt(newQuantity);
        return item;
      });
      setLocalCart(updatedCart);
      return updatedCart;
    });
  };

  const isCartEmpty = () => {
    return localCart.length === 0
  };

  const deleteFromCart = (itemID) => {
    setCartData((prev) => {
      const updatedCart = prev.filter((item) => item.product.itemID != itemID);
      setLocalCart(updatedCart);
      return updatedCart;
    });
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
	singleProduct,
	setSingleProduct
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
