import React from "react";
import Button from "/src/components/Button";
import Select from "/src/components/Select";
import { useNavigate } from "react-router-dom";
import { useCart } from "/src/contexts/CartContext";

const CartCard = ({ product, quantity }) => {
  const navigate = useNavigate();
  const { deleteFromCart, setIsCartOpen, updateCartItemQuantity } = useCart();

  return (
    <div
      onClick={() => {
        setIsCartOpen(false);
        navigate(`/product/${product.productID}`);
      }}
      className="cursor-pointer w-full text-left h-28 flex gap-5 items-start"
    >
      <div className="h-full shrink-0 aspect-square rounded-md overflow-hidden mb-4 relative bg-primary">
        <img
          alt=""
          src={product.media[0].url}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <h3 className="w-44 md:w-52 truncate text-lg">{product.name}</h3>
          <span className="font-bold font-display text-lg mr-3 inline-block mb-3">
            ₹{product.price}
          </span>
        </div>
        <div className="flex gap-3">
          <Select
            name="quantity"
            colour="secondary"
            placeholder="Quantity"
            className="w-full"
            defaultValue={quantity}
            onChange={(el) =>
              updateCartItemQuantity(product.productID, el.value)
            }
            options={Array.from(Array(product.quantity + 1).keys())
              .slice(1)
              .map((x) => `${x}`)}
          />
          <Button
            onClick={() => deleteFromCart(product.productID)}
            icon={
              <img
                className="invert"
                alt="Remove"
                src="/images/icons/trash.svg"
              />
            }
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
