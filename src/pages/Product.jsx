import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useCart } from "/src/contexts/CartContext";
import { useFirestore } from "/src/contexts/FirestoreContext";
import Accordian from "/src/components/Accordian";
import Button from "/src/components/Button";
import Hr from "/src/components/Hr";
import ImageGallery from "/src/components/ImageGallery";
import ImageList from "/src/components/ImageList";
import Loading from "/src/components/Loading";
import Select from "/src/components/Select";
import Table from "/src/components/Table";
import Wrapper from "/src/components/Wrapper";

const Product = () => {
  const { itemID } = useParams();
  const { isProductInCart, addToCart, setIsCartOpen } = useCart();
  const { getProduct, getProductVariations } = useFirestore();

  const [variations, setVariations] = useState([]);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const quantityEl = useRef();

  useEffect(() => {
    getProduct(itemID)
      .then((product) => {
        if (!product.enabled) navigate("/404");

        setProduct(product);
        if (product.hasOwnProperty("variations"))
          getProductVariations(product).then((data) => setVariations(data));
      })
      .catch(() => navigate("/404"));
  }, [location.pathname]);

  return !product ? (
    <Loading fullScreen />
  ) : (
    <Wrapper className="my-4">
      <Hr mt={false} />
      <section
        aria-label="Product Section"
        className="grid grid-cols-1 md:grid-cols-2 mb-5 max-w-[65rem] mx-auto gap-5 justify-items-center md:justify-items-stretch">
        <ImageGallery media={product.media} />
        <div className="text-center md:text-left w-full basis-1/2 shrink-1 grow-0">
          <h2 className="text-xl md:text-2xl font-bold font-display mb-5">
            {product.name}
          </h2>
          <p aria-label="price" className="font-bold font-display mb-3">
            <span
              className="font-normal text-accent mr-3 text-xl md:text-2xl"
              aria-label="discount">
              -{Math.floor(100 - (product.price / product.mrp) * 100)}%
            </span>
            <span className="text-2xl md:text-3xl">₹{product.price}</span>
          </p>
          <p aria-label="MRP" className="text-primary text-lg mb-4">
            MRP: <span className="line-through">₹{product.mrp}</span>
          </p>
          <div className="w-full space-y-2">
            {product.hasOwnProperty("variations") ? (
              <div>
                <p className="text-lg capitalize">
                  {product.variations.name}: {product.variationName}
                </p>
                <ImageList
                  key={itemID}
                  media={variations.map((v) => v.media[0])}
                  onClick={(index) =>
                    navigate(`/product/${variations[index].itemID}`)
                  }
                  defaultCurrentIndex={product.variations.products.indexOf(
                    itemID,
                  )}
                />
              </div>
            ) : null}
            <Select
              refEl={quantityEl}
              name="quantity"
              colour="secondary"
              placeholder="Quantity"
              defaultValue={1}
              options={Array.from(Array(product.quantity + 1).keys())
                .slice(1)
                .map((x) => `${x}`)}
            />
            <Button colour="secondary" className="w-full">
              Buy Now
            </Button>
            <Button
              colour="accent"
              className="w-full"
              onClick={() =>
                isProductInCart(itemID)
                  ? setIsCartOpen(true)
                  : addToCart(product, quantityEl.current.value)
              }
              icon={
                <img
                  src={`/images/icons/${
                    isProductInCart(itemID) ? "check" : "cart"
                  }.svg`}
                  className="invert"
                />
              }>
              {isProductInCart(itemID) ? "Added To Cart" : "Add To Cart"}
            </Button>
          </div>
        </div>
        <div className="w-full col-span-full">
          <Accordian summary="Product Warranty">{product.warranty}</Accordian>
          <Accordian summary="Description">{product.description}</Accordian>
          <Accordian summary="Specifications">
            <Table data={product.specifications} />
          </Accordian>
          <Accordian summary="Replacement and Return Policy">
            This product does not come with any kind of warranty. If your order
            is damaged please contact our support.
          </Accordian>
        </div>
      </section>
      <Hr />
    </Wrapper>
  );
};
export default Product;
