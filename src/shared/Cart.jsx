import { useCart } from "/src/contexts/CartContext";
import { useFirestore } from "/src/contexts/FirestoreContext";
import Title from "/src/components/Title";
import CartCard from "/src/components/CartCard";

const Cart = () => {
  const { isCartOpen, setIsCartOpen, cartData } = useCart();
  const { getProduct } = useFirestore();

  return (
    <>
      {isCartOpen && (
        <div
          aria-label="cart backdrop"
          onClick={() => setIsCartOpen(false)}
          className="fixed top-0 left-0 w-full h-full bg-primary z-40 opacity-25"
        ></div>
      )}
      <div
        aria-label="shopping cart"
        className={`fixed top-0 transition-[right] duration-300 ${
          isCartOpen ? "right-0" : "right-[-100%]"
        } w-full max-w-[25rem] h-full bg-background z-50 shadow-lg p-5 overflow-y-scroll`}
      >
        <Title className="text-center">Your Cart</Title>

        <ul aria-label="Cart Items">
          {cartData.length ? (
            cartData.map((cartItem) => (
              <li
                key={`cartItem-${cartItem.product.productID}`}
                aria-label="Cart Item"
                className="mb-6"
              >
                <CartCard
                  product={cartItem.product}
                  quantity={cartItem.quantity}
                />
              </li>
            ))
          ) : (
            <p className="text-center">Your Cart Is Empty</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Cart;
