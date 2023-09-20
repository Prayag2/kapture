import { Link } from "react-router-dom";
import Input from "/src/components/Input";
import Checkbox from "/src/components/Checkbox";
import Button from "/src/components/Button";
import Image from "/src/components/Image";

const AdminProductCard = ({ product, updateListing }) => {
  return (
    <li className="block mb-5 last-of-type:mb-0 flex flex-col lg:flex-row gap-5 items-center">
      <div className="w-full max-w-[20rem] lg:w-40 aspect-square rounded overflow-hidden shrink-0">
        <Image
          imageClassName="object-cover"
          alt=""
          src={product.media[0].url}
        />
      </div>
      <div>
        <Link
          className="block text-lg font-bold font-display mb-3"
          to={`/product/${product.itemID}`}
          target="_blank"
          rel="noopener noreferrer">
          {product.name}
        </Link>
        <form
          onSubmit={(e) => updateListing(e, product.itemID)}
          className="flex flex-col lg:flex-row lg:items-end gap-5 mb-3"
          id={`listingForm-${product.itemID}`}>
          <Checkbox
            name="enabled"
            value={product.enabled}
            placeholder="Listing Active"
          />
          <Input
            name="quantity"
            type="number"
            colour="accent"
            otherProps={{ defaultValue: product.quantity }}
            label="Quantity"
          />
          <Input
            name="price"
            type="number"
            colour="accent"
            icon={<img alt="" src="/images/icons/rupee.svg" />}
            otherProps={{ defaultValue: product.price }}
            label="Price"
          />
          <Input
            name="mrp"
            type="number"
            colour="accent"
            icon={<img alt="" src="/images/icons/rupee.svg" />}
            otherProps={{ defaultValue: product.mrp }}
            label="MRP"
          />
          <Button className="shrink-0">Save Changes</Button>
        </form>
        <div className="flex gap-5">
          <Button
            to={`/dashboard/listing/${product.itemID}`}
            colour="secondary">
            Edit Details
          </Button>
        </div>
      </div>
    </li>
  );
};

export default AdminProductCard;
