import { useEffect, useRef, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useFirestore } from "/src/contexts/FirestoreContext";
import Title from "/src/components/Title";
import Image from "/src/components/Image";
import Input from "/src/components/Input";
import Button from "/src/components/Button";
import Checkbox from "/src/components/Checkbox";
import Hr from "/src/components/Hr";

const AdminListings = () => {
  const { productData, getAllProducts, searchProduct, doc, updateDoc, db } =
    useFirestore();
  const searchEl = useRef();
  const searchFormEl = useRef();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    searchProduct().then((data) => {
      setProductList(data);
    });
  }, []);

  const searchFunc = (e) => {
    e.preventDefault();
    let formData = new FormData(searchFormEl.current);
    let searchTerm = formData.get("query");

    searchProduct(formData.get("query")).then((data) => {
      setProductList(data);
    });
  };

  const updateListing = (e, productID) => {
    e.preventDefault();
    let formData = new FormData(
      document.querySelector(`#listingForm-${productID}`),
    );

    const enabled = formData.get("enabled");
    const quantity = formData.get("quantity");
    const price = formData.get("price");
    const mrp = formData.get("mrp");

    updateDoc(doc(db, "product", productID), {
      quantity: parseInt(quantity),
      price: parseInt(price),
      mrp: parseInt(mrp),
      enabled: enabled !== null,
    }).then(() => alert(`Updated successfully!`));
  };

  return (
    <section>
      <Title>Manage Listings</Title>
      <form ref={searchFormEl} className="mb-5">
        <Input
          type="search"
          name="query"
          icon={<img alt="" src="/images/icons/search.svg" />}
          placeholder="Search Listings"
          otherProps={{ onChange: searchFunc, ref: searchEl }}
        />
      </form>
      <ul>
        {productList.map((product) => (
          <Fragment key={product.itemID}>
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
                  className="flex flex-col lg:flex-row gap-5 mb-3"
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
          </Fragment>
        ))}
      </ul>
    </section>
  );
};

export default AdminListings;
