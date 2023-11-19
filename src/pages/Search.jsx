import { useRef, useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import { useFirestore } from "/src/contexts/FirestoreContext";
import { useParams } from "react-router-dom";
import Wrapper from "/src/components/Wrapper";
import Title from "/src/components/Title";
import Input from "/src/components/Input";
import ProductCard from "/src/components/ProductCard";
import Loading from "/src/components/Loading";

const Search = () => {
  const { productData, searchProduct, filterByCategory } = useFirestore();
  const { categoryID } = useParams();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const formEl = useRef();
  const inputEl = useRef();

  useEffect(() => {
    if (categoryID) {
      filterByCategory(categoryID).then((data) => {
	console.log("Category ID", categoryID);
	setProductList(data);
	setLoading(false);
      })
    } else {
      searchProduct().then((data) => {
        setProductList(data);
        setLoading(false);
      });
    }
  }, [location.pathname]);

  useEffect(() => inputEl.current.focus(), []);

  const handleChange = (e) => {
    e.preventDefault();
    let formData = new FormData(formEl.current);
    let searchTerm = formData.get("query");

    searchProduct(formData.get("query")).then((data) => {
      setProductList(data);
    });
  };

  return (
    <Wrapper className="my-4 mt-8">
      <Title className="text-center">Browse Our Products</Title>
      <div className="w-full order-1 lg:order-2">
        <form onSubmit={handleChange} ref={formEl}>
          <Input
            type="search"
            name="query"
            icon={<img alt="" src="/images/icons/search.svg" />}
            placeholder="Search products"
            otherProps={{ onChange: handleChange, ref: inputEl }}
          />
        </form>
        <ul className="flex flex-wrap gap-5 mt-5">
          {loading ? (
            <Loading />
          ) : (
            <>
              <p>
                {productList.length} Result{productList.length != 1 && "s"}
              </p>
              {productList.map((product) => (
                <li key={product.itemID} className="w-full">
                  <ProductCard
                    className="mx-auto"
                    key={`product-${product.itemID}`}
                    product={product}
                    horizontal
                  />
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Search;
