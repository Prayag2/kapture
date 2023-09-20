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
import AdminProductCard from "/src/components/AdminProductCard";
import { useDialog } from "/src/contexts/DialogContext";

const AdminListing = () => {
  const {
    getProduct,
    getProductVariations,
    productData,
    doc,
    updateDoc,
    db,
    uploadFiles,
    deleteObject,
    ref,
    storage,
  } = useFirestore();
  const { itemID } = useParams();
  const { showAlert, showPrompt } = useDialog();

  const [variations, setVariations] = useState([]);
  const [product, setProduct] = useState(null);
  const [specifications, setSpecifications] = useState([]);
  const [productMedia, setProductMedia] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const quantityEl = useRef();

  const acceptedFileTypes = {
    image: ["image/png", "image/jpg", "image/jpeg", "image/webp"],
    video: ["video/mp4", "video/mov"],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProduct(itemID);
        setProduct(product);
        setSpecifications(product.specifications);
        setProductMedia(product.media);

        if (product.hasOwnProperty("variations")) {
          const data = await getProductVariations(product);
          setVariations(data);
        }
      } catch (err) {
        showAlert("Galat Link Hai Motu!!");
        navigate("/dashboard/listings");
      }
    };
    fetchData();
  }, [location.pathname]);

  const handleUpdateListing = useCallback(
    async (e, productID) => {
      e.preventDefault();
      const formData = new FormData(
        document.querySelector(`#listingForm-${productID}`),
      );

      const enabled = formData.get("enabled");
      const quantity = formData.get("quantity");
      const price = formData.get("price");
      const mrp = formData.get("mrp");

      await updateDoc(doc(db, "product", productID), {
        quantity,
        price,
        mrp,
        enabled: enabled !== null,
      });

      alert(`Updated successfully!`);
    },
    [db, updateDoc],
  );

  const handleSpecificationChange = (e, spec) => {
    setSpecifications((prev) => ({
      ...prev,
      [spec]: e.target.value,
    }));
  };

  const handleDeleteSpecification = (spec) => {
    setSpecifications((prev) => {
      const updatedSpecs = { ...prev };
      delete updatedSpecs[spec];
      return updatedSpecs;
    });
  };

  const handleAddSpecification = async () => {
    const output = await showPrompt("Enter Specification Name");
    if (output) {
      setSpecifications((prev) => ({
        ...prev,
        [output]: "",
      }));
    }
  };

  const handleDeleteMedia = async (e, index) => {
    setUploadLoading(true);
    try {
      const media = productMedia.filter(
        (item, itemIndex) => itemIndex !== index,
      );
      await deleteObject(
        ref(
          storage,
          `images/products/${product.itemID}/${productMedia[index].fileName}`,
        ),
      );
      await updateDoc(doc(db, "product", product.itemID), {
        media,
      });
      setProductMedia(media);
    } catch (err) {
      showAlert(err);
    }
    setUploadLoading(false);
  };

  const handleUploadMedia = async (e) => {
    setUploadLoading(true);

    const mediaURLs = await uploadFiles(
      `images/products/${product.itemID}`,
      e.target.files,
    );

    const media = [...productMedia];
    mediaURLs.forEach((url, index) => {
      media.push({
        url,
        isVideo: acceptedFileTypes.video.includes(e.target.files[index].type),
        alt: `${product.name} - Image ${media.length + 1}`,
        fileName: e.target.files[index].name,
      });
    });

    await updateDoc(doc(db, "product", product.itemID), {
      media,
    });

    setProductMedia(media);
    setUploadLoading(false);
  };

  const handleUnlinkVariation = (variationID) => {
    const products = variations.filter((item) => item.itemID !== variationID);
    setVariations(products);
  };

  return !product ? (
    <Loading />
  ) : (
    <section className="w-full" key={product.itemID}>
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
                onChange: (e) => handleSpecificationChange(e, spec),
              }}
            />
            <Button
              colour="accent"
              className="h-9"
              onClick={() => handleDeleteSpecification(spec)}
              icon={
                <img className="invert" alt="" src="/images/icons/trash.svg" />
              }
            />
          </div>
        ))}
        <Button onClick={handleAddSpecification}>Add More</Button>
      </div>
      <div>
        <ImageGallery
          media={productMedia}
          actionButton="Delete"
          onActionButtonClick={handleDeleteMedia}
        />
        {uploadLoading && <Loading />}
        <Input
          type="file"
          className="mt-2"
          label="Upload image or video"
          otherProps={{
            accept: [
              ...acceptedFileTypes.image,
              ...acceptedFileTypes.video,
            ].join(","),
            onChange: handleUploadMedia,
            multiple: true,
          }}
          icon={<img src="/images/icons/upload.svg" />}
        />
      </div>
      {variations.length && (
        <div className="mt-5">
          <Title>Variations</Title>
          <ul>
            {variations
              .filter((item) => item.itemID !== itemID)
              .map((variation) => (
                <li
                  key={`variation-${variation.itemID}`}
                  className="flex flex-col max-w-[20rem] sm:max-w-none sm:h-28 sm:flex-row gap-5 mb-4">
                  <div className="h-full aspect-square rounded-md overflow-hidden">
                    <Image
                      className="aspect-square"
                      src={variation.media[0].url}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold font-display text-lg">
                      {variation.name}
                    </h3>
                    <h3 className="mb-4 capitalize">
                      {variation.variations.name} - {variation.variationName}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button to={`/dashboard/listing/${variation.itemID}`}>
                        Edit Variation
                      </Button>
                      <Button
                        onClick={(e) => handleUnlinkVariation(variation.itemID)}
                        colour="secondary">
                        Unlink Variation
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <Button>Add Variation</Button>
        </div>
      )}
    </section>
  );
};

export default AdminListing;
