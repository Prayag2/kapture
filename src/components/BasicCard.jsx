import Image from "/src/components/Image";
import Button from "/src/components/Button";
import { useNavigate } from "react-router-dom";

const BasicCard = ({ image, buttonText, to, icon }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="aspect-square w-72 rounded-md overflow-hidden relative group cursor-pointer">
      <Image
        imageClassName="object-cover transition-[transform] group-hover:scale-110"
        alt=""
        src={image}
      />
      <div className="w-full h-full absolute top-0 left-0 bg-primary opacity-25"></div>
      <div className="absolute bottom-5 left-1/2 translate-x-[-50%]">
        <Button colour="background" icon={icon}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

BasicCard.defaultProps = {
  image: "/images/gallery/1.jpg",
  buttonText: "Shop Now",
  to: "/",
  icon: null,
};

export default BasicCard;
