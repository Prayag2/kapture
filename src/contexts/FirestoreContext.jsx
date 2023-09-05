import { useState, useEffect, useContext, createContext } from "react";

const firestoreContext = createContext();
export const useFirestore = () => useContext(firestoreContext);

const FirestoreContextProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);

  const fetchData = async (url, from, to) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.slice(from, to);
  };

  const getProduct = async (productID) => {
    const allProducts = await fetchData("/data/products.json");
    return allProducts.find((item) => item.productID === productID);
  };

  const getProductVariations = async (productID) => {
    const allProducts = await fetchData("/data/products.json");
    const mainProduct = await getProduct(productID);
    const variations = allProducts.filter((item) =>
      mainProduct.variations.products.includes(item.productID),
    );
    return variations;
  };

  useEffect(() => {
    fetchData("/data/products.json", 0).then((data) => setProductData(data));
  }, []);

  return (
    <firestoreContext.Provider
      value={{ productData, getProduct, getProductVariations }}
    >
      {children}
    </firestoreContext.Provider>
  );
};

export default FirestoreContextProvider;
