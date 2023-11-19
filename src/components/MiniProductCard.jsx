import Image from "/src/components/Image";

const MiniProductCard = ({ product, quantity, className }) => {
  return (
    <div className={`h-16 flex gap-5 text-left ${className}`}>
      <div className="h-full aspect-square rounded-md overflow-hidden">
        <Image
          imageClassName="object-cover"
          src={product.media[0] ? product.media[0].url : ""}
        />
      </div>
      <div className="w-[calc(100%-6rem)]">
        <p className="truncate w-full">{product.name}</p>
        <div className="flex justify-between">
          <p>Quantity: {quantity}</p>
          <p>₹ {product.price*quantity}</p>
        </div>
      </div>
    </div>
  );
};

MiniProductCard.defaultProps = {
  product: {
    name: "Redmi Smart Band Pro Strap Blue Colour Very Good",
    price: 599,
    media: []
  },
  quantity: 5,
};

export default MiniProductCard;
