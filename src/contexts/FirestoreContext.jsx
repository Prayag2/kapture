import { useState, useEffect, useContext, createContext } from "react";
import { db, storage } from "/src/firebase.jsx";
import {
  collection,
  doc,
  or,
  orderBy,
  getDoc,
  updateDoc,
  getDocs,
  addDoc,
  query,
  where,
  startAt,
  limit,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Loading from "/src/components/Loading";

const firestoreContext = createContext();
export const useFirestore = () => useContext(firestoreContext);

const FirestoreContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);

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
    console.log("Fetched", data);
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
      if (productData.length > 0) {
        data = await fetchData(
          query(
            collection(db, "product"),
            orderBy("__name__"),
            where(
              "__name__",
              "not-in",
              productData.map((item) => item.itemID),
            ),
          ),
        );
        data = [...data, ...productData];
      } else {
        data = await fetchData(
          query(collection(db, "product"), orderBy("name")),
        );
      }
      setAllProductsLoaded(true);
      updateProductData(data);
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
    if (productData.length > 0) {
      return await fetchData(
        query(
          collection(db, "product"),
          orderBy("__name__"),
          where("__name__", "in", mainProduct.variations.products),
          where("enabled", "==", true),
        ),
      );
    } else {
      return await fetchData(
        query(
          collection(db, "product"),
          orderBy("__name__"),
          where("__name__", "in", mainProduct.variations.products),
          where("enabled", "==", true),
        ),
      );
    }
  };

  const uploadFiles = async (directory, files) => {
    let fileLinks = [];
    // await files.forEach(async (file) => {
    //   console.log("Uploading", file.name);
    let file = files[0]
    try {
      const fileSnapshot = await uploadBytes(
        ref(storage, `${directory}/${file.name}`),
        file,
      );
      const fileURL = await getDownloadURL(fileSnapshot.ref);
      console.log("Uploaded", file.name, ":", fileURL);
      fileLinks.push(fileURL);
    } catch (err) {
      alert(err);
    }
    // });
    return fileLinks;
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
        getAllProducts,
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
        updateDoc,
        uploadFiles,
      }}>
      {children}
    </firestoreContext.Provider>
  );
};

export default FirestoreContextProvider;
