import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFirestore } from "/src/contexts/FirestoreContext";
import Title from "/src/components/Title";
import ImageGallery from "/src/components/ImageGallery";
import Image from "/src/components/Image";
import Input from "/src/components/Input";
import TextArea from "/src/components/TextArea";
import Button from "/src/components/Button";
import Checkbox from "/src/components/Checkbox";
import Loading from "/src/components/Loading";
import Hr from "/src/components/Hr";
import { useDialog } from "/src/contexts/DialogContext";

const AdminListing = () => {
  const { getProduct, getProductVariations, productData, doc, updateDoc, db, uploadFiles } =
    useFirestore();
  const { itemID } = useParams();
  const { showAlert, showPrompt } = useDialog();

  const [variations, setVariations] = useState([]);
  const [product, setProduct] = useState(null);
  const [specifications, setSpecifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const quantityEl = useRef();

  useEffect(() => {
    getProduct(itemID)
      .then((product) => {
        setProduct(product);
        setSpecifications(product.specifications);
        if (product.hasOwnProperty("variations"))
          getProductVariations(product).then((data) => setVariations(data));
      })
      .catch((err) => {
        alert("Galat Link Hai Motu!");
        navigate("/dashboard/listings");
      });
  }, [location.pathname]);

  const updateListing = useCallback((e, productID) => {
    e.preventDefault();
    let formData = new FormData(
      document.querySelector(`#listingForm-${productID}`),
    );

    const enabled = formData.get("enabled");
    const quantity = formData.get("quantity");
    const price = formData.get("price");
    const mrp = formData.get("mrp");

    updateDoc(doc(db, "product", productID), {
      quantity: quantity,
      price: price,
      mrp: mrp,
      enabled: enabled !== null,
    }).then(() => alert(`Updated successfully!`));
  }, []);

  return !product ? (
    <Loading />
  ) : (
    <section className="w-full">
      <Title>Manage Listing</Title>
      <div className="space-y-2">
        <Checkbox
          name="enabled"
          value={product.enabled}
          placeholder="Listing Active"
        />
        <Checkbox
          name="featured"
          value={product.featured}
          placeholder="Show on Home Page"
        />
        <Input
          name="name"
          label="Name"
          otherProps={{ defaultValue: product.name }}
        />
        <Input
          name="price"
          type="number"
          label="Price"
          otherProps={{ defaultValue: product.price }}
        />
        <Input
          name="mrp"
          type="number"
          label="MRP"
          otherProps={{ defaultValue: product.mrp }}
        />
        <Input
          name="quantity"
          type="number"
          label="Quantity"
          otherProps={{ defaultValue: product.quantity }}
        />
        <TextArea
          name="description"
          label="Description"
          otherProps={{ defaultValue: product.description }}
        />
        <Input
          name="tags"
          label="Tags"
          otherProps={{ defaultValue: product.tags.join(",") }}
        />
        <TextArea
          name="warranty"
          label="Warranty"
          otherProps={{ defaultValue: product.warranty }}
        />
      </div>
      <div className="w-full my-5 p-5 border border-accent rounded-md space-y-3 relative">
        <p className="absolute uppercase font-bold text-lg bg-background inline-block top-[-0.75rem]">
          Specifications
        </p>
        {Object.keys(specifications).map((spec, index) => (
          <div className="flex gap-3 items-end" key={`specification-${index}`}>
            <Input
              name={spec}
              label={spec}
              placeholder="Edit Value"
	      className="w-full"
              otherProps={{
                defaultValue: specifications[spec],
                onChange: (e) => {
                  setSpecifications((prev) => {
                    prev[spec] = e.target.value;
                    return { ...prev };
                  });
                },
              }}
            />
            <Button
              colour="accent"
              className="h-9"
              onClick={() =>
                setSpecifications((prev) => {
                  delete prev[spec];
                  return { ...prev };
                })
              }
              icon={
                <img className="invert" alt="" src="/images/icons/trash.svg" />
              }
            />
          </div>
        ))}
        <Button
          onClick={async () => {
            const output = await showPrompt("Enter Specification Name");
            if (output)
              setSpecifications((prev) => {
                if (!prev[output]) prev[output] = "";
                return { ...prev };
              });
          }}>
          Add More
        </Button>
      </div>
      <div>
        <ImageGallery media={product.media} />
        <Input
          type="file"
          className="mt-2"
          label="Upload image or video"
          otherProps={{
            accept:
              "image/png,image/jpg,image/jpeg,image/webp,video/mp4,video/mov",
	    onChange: e => uploadFiles("test", e.target.files),
	    multiple: true
          }}
          icon={<img src="/images/icons/upload.svg" />}
        />
      </div>
    </section>
  );
};

export default AdminListing;
