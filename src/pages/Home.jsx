import { useEffect, useState } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import { useFirestore } from "/src/contexts/FirestoreContext";
import Carousel from "/src/components/Carousel";
import Button from "/src/components/Button";
import Wrapper from "/src/components/Wrapper";
import Section from "/src/shared/Section";
import BasicCard from "/src/components/BasicCard";
import ProductCard from "/src/components/ProductCard";
import Loading from "/src/components/Loading";

const Home = () => {
  const [productLoading, setProductLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const { currentUser, logout, isAdmin } = useAuth();
  const {
    fetchData,
    query,
    where,
    orderBy,
    limit,
    productData,
    categoryData,
    setCategoryData,
    collection,
    db,
    updateProductData,
    productDataExists,
  } = useFirestore();

  useEffect(() => {
    if (productData.filter((item) => item.featured).length > 3) {
      setProductLoading(false);
    } else {
      fetchData(
        query(
          collection(db, "product"),
          orderBy("name"),
          where("featured", "==", true),
          limit(10),
        ),
      ).then((data) => {
        updateProductData(data);
        setProductLoading(false);
      });
    }
  }, []);

  useEffect(()=>{
    if(categoryData.length) {
      setCategoryLoading(false);
    }
  }, [categoryData])

  return (
    <Wrapper className="my-4">
      <Carousel images={["/images/gallery/1.jpg", "/images/gallery/1.jpg"]} />
      <Section title="Shop By Categories" center>
        <div className="flex gap-5 flex-wrap justify-center">
          {categoryLoading ? (
            <Loading />
          ) : (
            categoryData.map((category) => (
              <BasicCard
                key={category.itemID}
                image={category.image}
                to={`/category/${category.itemID}`}
                buttonText={category.name}
              />
            ))
          )}
        </div>
      </Section>
      <Section title="Best Selling Products" center>
        <div className="flex gap-5 flex-wrap justify-center">
          {productLoading ? (
            <Loading />
          ) : (
            productData.map((product) => {
              if (product.featured)
                return <ProductCard key={product.itemID} product={product} />;
            })
          )}
        </div>
      </Section>
    </Wrapper>
  );
};

export default Home;
