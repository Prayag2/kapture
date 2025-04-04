import { useEffect, useRef, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirestore } from "/src/contexts/FirestoreContext";
import Title from "/src/components/Title";
import Image from "/src/components/Image";
import Input from "/src/components/Input";
import Button from "/src/components/Button";
import Checkbox from "/src/components/Checkbox";
import Hr from "/src/components/Hr";
import AdminProductCard from "/src/components/AdminProductCard";

const AdminListings = () => {
  const {
    productData,
    getAllProducts,
    searchProduct,
    doc,
    updateDoc,
    db,
    addDoc,
    collection,
  } = useFirestore();
  const navigate = useNavigate();
  const searchEl = useRef();
  const searchFormEl = useRef();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    searchProduct("", true).then((data) => {
      console.log("[AdminListings] productList", data);
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
      enabled: enabled === "on",
    }).then(() => alert(`Updated successfully!`));
  };
  const handleNewListing = async () => {
    const docRef = await addDoc(collection(db, "product"), {
      tags: [],
      specifications: {},
      media: [],
      variations: {},
    });
    navigate(`/dashboard/listing/${docRef.id}`);
  };

  return (
    <section>
      <Title>Manage Listings</Title>
      <Button className="mb-4" onClick={handleNewListing}>
        Create New Listing
      </Button>
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
        {productList &&
          productList.map((product) => (
            <Fragment key={product.itemID}>
              <AdminProductCard
                product={product}
                updateListing={updateListing}
              />
            </Fragment>
          ))}
      </ul>
    </section>
  );
};

export default AdminListings;
