import { useState, useEffect, useContext, createContext } from "react";
import { useLocalStorage } from "/src/hooks/LocalStorage";
import { db } from "/src/firebase.jsx";
import {
  collection,
  doc,
  or,
  orderBy,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  startAt,
  limit,
} from "firebase/firestore";
import Loading from "/src/components/Loading";

const firestoreContext = createContext();
export const useFirestore = () => useContext(firestoreContext);

const FirestoreContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [localProductData, setLocalProductData, removeLocalProductData] =
    useLocalStorage("products", []);
  const [productData, setProductData] = useState(localProductData);
  const [allProductsLoaded, setAllProductsLoaded] = useState(
    localProductData ? localProductData : false,
  );

  useEffect(() => {
    if (!categoryData.length) {
      fetchData(query(collection(db, "categories"))).then((data) => {
        setCategoryData(data);
      });
    }
  }, []);

  const fetchData = async (query) => {
    let data = [];
    const response = await getDocs(query);
    response.forEach((item) => {
      data.push({ itemID: item.id, ...item.data() });
    });
    console.log("Fetched", data)
    return data;
  };

  const productLoaded = (itemID) => {
    return productData.some((product) => product.itemID === itemID);
  };

  const updateProductData = (data) => {
    data.forEach((item) => {
      if (!productLoaded(item.itemID)) {
        setProductData((prev) => {
          const updatedData = [...prev, item];
          setLocalProductData(updatedData);
          return updatedData;
        });
      }
    });
  };

  const getProduct = async (itemID) => {
    if (productLoaded(itemID))
      return productData.find((item) => item.itemID === itemID);

    const response = await getDoc(doc(db, "product", itemID));
    if (response.exists()) {
      const product = { itemID: itemID, ...response.data() };
      updateProductData([product]);
      return product;
    } else throw new Error("Product not found");
  };

  const getAllProducts = async () => {
    let data;
    if (allProductsLoaded) {
      data = productData;
    } else {
      data = await fetchData(query(collection(db, "product"), orderBy("name")));
      setAllProductsLoaded(true);
      setProductData(data);
      setLocalProductData(data);
    }
    return data;
  };

  const filterByCategory = async (categoryID) => {
    const data = await getAllProducts();
    return data.filter((item) => item.categoryID === categoryID);
  };

  const searchProduct = async (searchQuery) => {
    const data = await getAllProducts();
    if (!searchQuery) return data;
    return data.filter((item) => {
      return (
        item.tags.some((subItem) =>
          subItem.toLowerCase().includes(searchQuery.toLowerCase()),
        ) || item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const getProductVariations = async (mainProduct) => {
    const variations = await fetchData(
      query(
        collection(db, "product"),
        orderBy("__name__"),
        where("__name__", "in", mainProduct.variations.products),
      ),
    );
    return variations;
  };

  return (
    <firestoreContext.Provider
      value={{
        productData,
        setProductData,
        updateProductData,
        categoryData,
        setCategoryData,
        getProduct,
        getProductVariations,
        searchProduct,
        filterByCategory,
        fetchData,
        collection,
        doc,
        db,
        query,
        where,
        orderBy,
        startAt,
        limit,
      }}
    >
      {children}
    </firestoreContext.Provider>
  );
};

export default FirestoreContextProvider;
