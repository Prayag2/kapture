import React, { useMemo } from "react";
import Title from "/src/components/Title";
import Button from "/src/components/Button";
import Hr from "/src/components/Hr";
import MiniProductCard from "/src/components/MiniProductCard";
import { useCart } from "/src/contexts/CartContext";

const OrderSummary = ({ nextLink, onSubmit }) => {
  const { cartData, singleProduct } = useCart();
  const totalAmount = useMemo(() => {
    if (singleProduct !== null) {
      return singleProduct.quantity * singleProduct.product.price;
    } else if (cartData.length > 0) {
      return cartData.reduce(
        (total, current) => total + current.quantity * current.product.price,
        0,
      );
    }
  }, [cartData, singleProduct]);

  return (
    <div
      aria-label="order summary"
      className="w-full max-w-[25rem] bg-secondary h-full p-5 rounded-md">
      <Title>Order Summary</Title>
      <Hr compact />
      {singleProduct === null ? (
        cartData.map((product) => (
          <MiniProductCard
            key={`summary#${product.product.itemID}`}
            product={product.product}
            quantity={product.quantity}
            className="w-full mb-3 last-of-type:mb-0"
          />
        ))
      ) : (
        <MiniProductCard
          product={singleProduct.product}
          quantity={singleProduct.quantity}
        />
      )}
      <Hr compact />
      <div className="w-full flex justify-between px-4 text-lg">
        <p>Items</p>
        <p className="text-primary">₹ {totalAmount}</p>
      </div>
      <div className="w-full flex justify-between px-4 text-lg">
        <p>Delivery</p>
        <p className="text-primary">FREE</p>
      </div>
      <Button className="w-full mt-5" onClick={e => onSubmit()}>Proceed to Next Step</Button>
    </div>
  );
};

OrderSummary.defaultProps = {
  nextLink: "/",
};

export default OrderSummary;
