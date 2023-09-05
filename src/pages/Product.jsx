import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "/src/components/Wrapper";
import Accordian from "/src/components/Accordian";
import Select from "/src/components/Select";
import Input from "/src/components/Input";
import Table from "/src/components/Table";
import Button from "/src/components/Button";
import Hr from "/src/components/Hr";
import ImageGallery from "/src/components/ImageGallery";
import ImageList from "/src/components/ImageList";
import Section from "/src/shared/Section";
import { useCart } from "/src/contexts/CartContext";
import { useFirestore } from "/src/contexts/FirestoreContext";

const Product = ({ product }) => {
  const { isProductInCart, addToCart, deleteFromCart } = useCart();
  const navigate = useNavigate();
  const { getProductVariations } = useFirestore();
  const [variations, setVariations] = useState([]);

  useEffect(() => {
    if (product.hasOwnProperty("variations"))
      getProductVariations(product.productID).then((data) =>
        setVariations(data),
      );
  }, []);

  return (
    <Wrapper className="my-4">
      <Hr mt={false} />
      <section
        aria-label="Product Section"
        className="grid grid-cols-1 md:grid-cols-2 mb-5 max-w-[65rem] mx-auto gap-5 justify-items-center md:justify-items-stretch"
      >
        <ImageGallery media={product.media} />
        <div className="text-center md:text-left w-full basis-1/2 shrink-1 grow-0">
          <h2 className="text-xl md:text-2xl font-bold font-display mb-5">
            {product.name}
          </h2>
          <p
            aria-label="MRP"
            className="line-through text-primary text-lg mb-2"
          >
            ₹{product.mrp}
          </p>
          <p
            aria-label="price"
            className="font-bold font-display text-2xl md:text-3xl mb-4"
          >
            ₹{product.price}
          </p>
          <div className="w-full space-y-2">
            {product.hasOwnProperty("variations") ? (
              <div>
                <p className="text-lg capitalize">
                  Select {product.variations.name}
                </p>
                <ImageList
                  media={variations.map((v) => v.media[0])}
                  onClick={(index) =>
                    navigate(`/product/${variations[index].productID}`)
                  }
                  defaultCurrentIndex={product.variations.products.indexOf(
                    product.productID,
                  )}
                />
              </div>
            ) : null}
            <Select
              name="quantity"
              colour="secondary"
              placeholder="Select Quantity"
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
                isProductInCart(product.productID)
                  ? deleteFromCart(product.productID)
                  : addToCart(product, 1)
              }
              icon={
                <img
                  src={`/images/icons/${
                    isProductInCart(product.productID) ? "trash" : "bag"
                  }.svg`}
                  className="invert"
                />
              }
            >
              {isProductInCart(product.productID)
                ? "Remove From Bag"
                : "Add To Bag"}
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
