import { useAuth } from "/src/contexts/AuthContext";
import { useFirestore } from "/src/contexts/FirestoreContext";
import Carousel from "/src/components/Carousel";
import Wrapper from "/src/components/Wrapper";
import Section from "/src/shared/Section";
import BasicCard from "/src/components/BasicCard";
import ProductCard from "/src/components/ProductCard";

const Home = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { productData } = useFirestore();

  return (
    <Wrapper className="my-4">
      <Carousel images={["/images/gallery/1.jpg", "/images/gallery/1.jpg"]} />
      <Section title="Shop By Categories" center>
        <div className="flex gap-5 flex-wrap justify-center">
          <BasicCard
            image="/images/categories/stationary.jpg"
            to="/products"
            buttonText="Stationary"
          />
          <BasicCard
            image="/images/categories/strap.jpg"
            buttonText="Watch Straps"
          />
          <BasicCard buttonText="Toys for Kids" />
        </div>
      </Section>
      <Section title="Best Selling Products" center>
        <div className="flex gap-5 flex-wrap justify-center">
          {productData.map((product) => (
            <ProductCard
              key={`product-${product.productID}`}
              product={product}
            />
          ))}
        </div>
      </Section>
    </Wrapper>
  );
};

export default Home;
