import React from "react";
import Button from "/src/components/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "/src/contexts/CartContext";

const ProductCard = ({ product, badgeText }) => {
  const navigate = useNavigate();
  const { addToCart, isProductInCart, setIsCartOpen } = useCart();

  return (
    <div
      className="cursor-pointer w-72 text-left group"
      onClick={() => navigate(`/product/${product.productID}`)}
    >
      <div className="w-full aspect-square rounded-md overflow-hidden mb-4 relative bg-primary">
        <img
          alt=""
          src={product.media[0].url}
          className="w-full h-full object-contain transition-[transform] group-hover:scale-105 bg-white"
        />
        {badgeText ? (
          <span className="absolute top-2 left-2 bg-accent rounded text-background py-1 px-2 uppercase text-sm">
            {badgeText}
          </span>
        ) : null}
      </div>
      <div className="w-full flex justify-between items-center">
        <div>
          <h3 className="w-60 text-lg truncate">{product.name}</h3>
          <span className="font-bold font-display text-xl mr-3">
            ₹{product.price}
          </span>
          <span className="text-primary line-through">₹{product.mrp}</span>
        </div>
        <Button
          colour="accent"
          onClick={() =>
            isProductInCart(product.productID)
              ? setIsCartOpen(true)
              : addToCart(product, 1, 0)
          }
          icon={
            <img
              className="invert"
              alt="Buy"
              src={`/images/icons/${
                isProductInCart(product.productID) ? "check" : "cart"
              }.svg`}
            />
          }
        ></Button>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  image: "/images/categories/strap.jpg",
  title: "This is a brand new product with the best features!!",
  price: 699,
  mrp: 999,
  to: "/",
  badgeText: "sale",
};

export default ProductCard;
