import { useEffect, useRef, useState } from "react";
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
import Select from "/src/components/Select";
import { useDialog } from "/src/contexts/DialogContext";

const AdminListing = () => {
  const {
    getProduct,
    getProductVariations,
    productData,
    categoryData,
    setProductData,
    doc,
    collection,
    updateDoc,
    db,
    uploadFiles,
    deleteObject,
    ref,
    storage,
    generateItemID,
    addDoc,
    deleteDoc,
    searchProduct,
  } = useFirestore();
  const { itemID } = useParams();
  const { showAlert, showPrompt } = useDialog();

  const [variations, setVariations] = useState([]);
  const [variationType, setVariationType] = useState("");
  const [product, setProduct] = useState(null);
  const [productSpecifications, setProductSpecifications] = useState({});
  const [productCategory, setProductCategory] = useState(null);
  const [productMedia, setProductMedia] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchEl = useRef();
  const variationTypeEl = useRef();
  const variationNameEl = useRef();
  const categoryEl = useRef();
  const formEl = useRef();

  const acceptedFileTypes = {
    image: ["image/png", "image/jpg", "image/jpeg", "image/webp"],
    video: ["video/mp4", "video/mov"],
  };

  useEffect(() => {
    if (variationTypeEl.current) variationTypeEl.current.value = variationType;
  }, [variationType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("[AdminListing] Getting Product");
        const product = await getProduct(itemID);
        setProductSpecifications(() => {
          return product.specifications;
        });
        setProductMedia(product.media);
        if (product.variations.name) {
          setVariationType(product.variations.name);
          console.log("[AdminListing] Getting Product Variations");
          const data = await getProductVariations(product);
          setVariations(data);
        }
        console.log("[AdminListing] searchProduct Called");
        console.log("[AdminListing] productData", productData);
        const productListData = await searchProduct(undefined, productData);
        console.log("[AdminListing] categoryData", categoryData);
        const category = categoryData.find(
          (item) => item.itemID === product.categoryID,
        );
        console.log("[AdminListing] productCategory", category);
        if (category) setProductCategory(category);
        else setProductCategory({ name: "", itemID: "" });
        setProductList(productListData);
        setProduct(product);
      } catch (err) {
        showAlert(`${err}`);
        navigate("/dashboard/listings");
      }
    };
    if (categoryData.length) fetchData();
  }, [categoryData, location.pathname]);

  const handleSearchVariations = () => {
    let searchTerm = searchEl.current.value;
    searchProduct(searchTerm).then((data) => {
      setProductList(data);
    });
  };

  const handleSaveChanges = async () => {
    const formData = new FormData(formEl.current);

    const enabled = formData.get("enabled") === "on";
    const featured = formData.get("featured") === "on";
    const name = formData.get("name");
    const price = formData.get("price");
    const mrp = formData.get("mrp");
    const quantity = parseInt(formData.get("quantity"));
    const description = formData.get("description");
    const tags = formData.get("tags");
    const warranty = formData.get("warranty");
    const variationName = variationNameEl.current.value;
    const categoryID = productCategory.itemID;
    const variationObj = {
      name: variationType,
      products: [product.itemID, ...variations.map((item) => item.itemID)],
    };

    if (
      !name ||
      !price ||
      !mrp ||
      !quantity ||
      !description ||
      !tags ||
      !warranty ||
      !categoryID
    ) {
      await showAlert("Please fill out all the fields!!");
      return;
    }

    const docObj = {
      enabled: enabled,
      featured: featured,
      name,
      price,
      mrp,
      quantity,
      description,
      tags: tags.replaceAll(" , ").replaceAll(" ,").replaceAll(", ").split(","),
      warranty,
      specifications: productSpecifications,
      variations: variationObj,
      categoryID,
      variationName,
    };
    await updateDoc(doc(db, "product", product.itemID), docObj);

    for (let item of variations) {
      await updateDoc(doc(db, "product", item.itemID), {
        variations: variationObj,
        variationName: item.variationName,
      });
    }
    await showAlert(
      `Updated successfully! Please reload to see all the changes.`,
    );
    window.location.reload();
  };

  const handleSpecificationChange = (e, spec) => {
    setProductSpecifications((prev) => ({
      ...prev,
      [spec]: e.target.value,
    }));
  };

  const handleDeleteSpecification = (spec) => {
    setProductSpecifications((prev) => {
      const updatedSpecs = { ...prev };
      delete updatedSpecs[spec];
      return updatedSpecs;
    });
  };

  const handleAddSpecification = async () => {
    const output = await showPrompt("Enter Specification Name");
    if (output) {
      setProductSpecifications((prev) => ({
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

  const handleUnlinkVariation = async (variationID) => {
    const products = variations.filter((item) => item.itemID !== variationID);
    setVariations(products);
  };

  const handleAddVariation = async (productID) => {
    if (productID === itemID) {
      showAlert("You can not use this product ID");
      return;
    }
    if (!variationType) {
      const _variationType = await showPrompt(
        'Enter type of the variation (for example, "Colour")',
      );
      if (_variationType) setVariationType(_variationType);
      else return;
    }

    try {
      const product = await getProduct(productID);
      setVariations((prev) => {
        return [...prev, product];
      });
    } catch (err) {
      showAlert(`${err}`);
      return;
    }
  };

  const handleDeleteListing = async () => {
    const confirm = await showPrompt(
      'Sahi me DELETE karna hai to "CONFIRM DELETE" type karo!',
    );
    if (confirm !== "CONFIRM DELETE") return;

    if (variationType && variations.length > 0) {
      const variationObj = {
        name: variationType,
        products: variations.filter((item) => item.itemID !== product.itemID),
      };
      for (let item of variations) {
        await updateDoc(doc(db, "product", item.itemID), {
          variations: variationObj,
        });
      }
    }
    await deleteDoc(doc(db, "product", product.itemID));
    setProductData((prev) =>
      prev.filter((item) => item.itemID !== product.itemID),
    );
    await showAlert("Listing deleted successfully!");
    navigate("/dashboard/listings");
  };

  const handleDuplicateListing = async () => {
    const docRef = await addDoc(collection(db, "product"), {
      ...product,
      itemID: null,
      media: [],
    });
    await updateDoc(doc(db, "product", docRef.id), { itemID: docRef.id });
    window.open(`/dashboard/listing/${docRef.id}`);
  };

  return !product ? (
    <Loading />
  ) : (
    <section className="w-full" key={product.itemID}>
      <Title>Manage Listing</Title>
      <form className="space-y-2" ref={formEl}>
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
      </form>
      <div className="mt-4 mb-8">
        <Title>Category</Title>
        {productCategory && (
          <Select
            options={categoryData.map((item) => item.name)}
            placeholder="Category"
            refEl={categoryEl}
            defaultValue={productCategory.name}
            onChange={(val) =>
              setProductCategory(
                categoryData.find((item) => item.name === val.value),
              )
            }
          />
        )}
      </div>
      <div className="w-full my-5 p-5 border border-accent rounded-md space-y-3 relative">
        <p className="absolute uppercase font-bold text-lg bg-background inline-block top-[-0.75rem]">
          Specifications
        </p>
        {Object.keys(productSpecifications).map((spec, index) => (
          <div className="flex gap-3 items-end" key={`specification-${index}`}>
            <Input
              name={spec}
              label={spec}
              placeholder="Edit Value"
              className="w-full"
              otherProps={{
                defaultValue: productSpecifications[spec],
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
        {productMedia && (
          <ImageGallery
            media={productMedia}
            actionButton="Delete"
            onActionButtonClick={handleDeleteMedia}
          />
        )}
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
      <div className="mt-5">
        <p className="text-2xl font-bold font-display mb-2">Variations</p>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <Input
            placeholder="Enter type of variation. For example, colour, material, etc."
            label="Variation Type"
            otherProps={{
              ref: variationTypeEl,
              onChange: (e) => setVariationType(e.target.value),
              defaultValue: variationType,
            }}
          />
          <Input
            placeholder={`Enter ${variationType.toLowerCase()}`}
            label={`${variationType} of this product`}
            otherProps={{
              ref: variationNameEl,
              defaultValue: product.variationName ? product.variationName : "",
            }}
          />
        </div>
        <ul>
          {variations
            .filter((item) => item.itemID !== product.itemID)
            .map((variation) => (
              <li
                key={`variation-${variation.itemID}`}
                className="flex flex-col max-w-[20rem] sm:max-w-none sm:h-40 sm:flex-row gap-5 mb-4">
                <div className="h-full aspect-square rounded-md overflow-hidden">
                  <Image
                    className="aspect-square"
                    imageClassName="object-cover"
                    src={variation.media[0].url}
                  />
                </div>
                <div>
                  <h3 className="font-bold font-display text-lg">
                    {variation.name}
                  </h3>
                  <Input
                    label={variationType}
                    placeholder={`Enter ${variationType}`}
                    otherProps={{
                      defaultValue: variation.variationName,
                      onChange: (e) => {
                        setVariations((prev) =>
                          prev.map((prevItem) => {
                            if (prevItem.itemID === variation.itemID) {
                              return {
                                ...prevItem,
                                variationName: e.target.value,
                              };
                            }
                            return prevItem;
                          }),
                        );
                      },
                    }}
                    className="mb-3"
                  />
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
        <div>
          <Input
            type="search"
            name="query"
            icon={<img alt="" src="/images/icons/search.svg" />}
            placeholder="Search Listings"
            className="mb-4"
            otherProps={{ onChange: handleSearchVariations, ref: searchEl }}
          />
          {searchEl.current && searchEl.current.value && (
            <ul className="px-4 my-4">
              {productList.map((item) => {
                if (
                  variations.some((vr) => vr.itemID === item.itemID) ||
                  item.itemID === product.itemID
                ) {
                  return null;
                }
                return (
                  <li
                    onClick={(e) => handleAddVariation(item.itemID)}
                    className="h-10 flex gap-5 my-2 items-center cursor-pointer">
                    <div className="aspect-square h-full rounded overflow-hidden">
                      <Image
                        imageClassName="object-cover"
                        src={item.media ? item.media[0].url : ""}
                      />
                    </div>
                    <p className="capitalize">{item.name}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full bg-secondary py-5 fixed bottom-0 left-0 flex justify-center gap-5">
        <Button to={`/product/${product.itemID}`}>Product Page</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
        <Button colour="accent" onClick={handleDuplicateListing}>
          Duplicate Listing
        </Button>
        <Button
          colour="accent"
          onClick={handleDeleteListing}
          icon={<img className="invert" src="/images/icons/trash.svg" />}>
          Delete Listing
        </Button>
      </div>
      <div className="h-20"></div>
    </section>
  );
};
export default AdminListing;
