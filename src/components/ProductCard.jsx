import Button from "/src/components/Button";
import Image from "/src/components/Image";
import { useNavigate } from "react-router-dom";
import { useCart } from "/src/contexts/CartContext";

const ProductCard = ({ product, badgeText, horizontal, className }) => {
  const navigate = useNavigate();
  const { addToCart, isProductInCart, setIsCartOpen } = useCart();

  return (
    <div
      className={`cursor-pointer ${
        horizontal ? "sm:w-full sm:h-40 sm:flex-row" : "sm:w-72"
      } text-left group flex w-full flex-col ${className}`}
      onClick={() => navigate(`/product/${product.itemID}`)}>
      <div
        className={`${
          horizontal && "sm:h-full"
        } aspect-square rounded-md overflow-hidden mb-4 relative bg-primary shrink-0`}>
        <Image
          alt=""
          src={product.media[0].url}
          imageClassName="object-contain transition-[transform] group-hover:scale-105 bg-white"
        />
        {badgeText ? (
          <span className="absolute top-2 left-2 bg-accent rounded text-background py-1 px-2 uppercase text-sm">
            {badgeText}
          </span>
        ) : null}
      </div>
      <div
        className={`w-full flex justify-between items-left ${
          horizontal && "sm:flex-col sm:pl-5"
        }`}>
        <div className={`w-[80%] ${horizontal ? "sm:w-[90%]" : ""}`}>
          <h3
            className={`${horizontal && "sm:text-xl"} w-full text-lg truncate`}>
            {product.name}
          </h3>
          <span
            className={`font-bold font-display ${
              horizontal ? "sm:text-2xl" : ""
            } text-xl mr-3`}>
            ₹{product.price}
          </span>
          <span className="text-primary line-through">₹{product.mrp}</span>
        </div>
        <Button
          colour="accent"
          onClick={() =>
            isProductInCart(product.itemID)
              ? setIsCartOpen(true)
              : addToCart(product, 1, 0)
          }
          icon={
            <img
              className="invert"
              alt="Buy"
              src={`/images/icons/${
                isProductInCart(product.itemID) ? "check" : "cart"
              }.svg`}
            />
          }>
          {horizontal && (
            <span className="hidden sm:inline">
              {isProductInCart(product.itemID)
                ? "Added To Cart"
                : "Add to Cart"}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  to: "/",
  badgeText: "sale",
  horizontal: false,
};

export default ProductCard;
