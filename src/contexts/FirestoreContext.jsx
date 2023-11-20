import { useState, useEffect, useContext, createContext } from "react";
import { db, storage } from "/src/firebase.jsx";
import {
  collection,
  doc,
  or,
  orderBy,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  addDoc,
  query,
  where,
  startAt,
  limit,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import Loading from "/src/components/Loading";

const firestoreContext = createContext();
export const useFirestore = () => useContext(firestoreContext);

const FirestoreContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);

  useEffect(() => {
    console.log("[FirestoreContext] Product Data Updated", productData);
  }, [productData]);

  useEffect(() => {
    if (!categoryData.length) {
      fetchData(query(collection(db, "categories"))).then((data) => {
        setCategoryData(data);
      });
    }
  }, []);

  const fetchData = async (query) => {
    console.log("[FirestoreContext] fetchData called");
    let data = [];
    const response = await getDocs(query);
    response.forEach((item) => {
      data.push({ itemID: item.id, ...item.data() });
    });
    return data;
  };

  const productLoaded = (itemID) => {
    console.log("[FirestoreContext] productLoaded called");
    console.log("[FirestoreContext] [productLoaded] productData", productData);
    if (productData.some((product) => product.itemID === itemID)) {
      console.log("[FirestoreContext] [productLoaded] TRUE", itemID);
      return true;
    } else {
      console.log("[FirestoreContext] [productLoaded] FALSE", itemID);
      return false;
    }
  };

  const updateProductData = (data) => {
    console.log("[FirestoreContext] updateProductData Called");
    setProductData((prev) => {
      const updatedData = [...prev];
      data.forEach((item) => {
        const existingItem = updatedData.find(
          (prevItem) => prevItem.itemID === item.itemID,
        );
        if (!existingItem) {
          updatedData.push(item);
        }
      });
      data = updatedData;
      return updatedData;
    });
    return data;
  };

  const getProduct = async (itemID) => {
    console.log("[FirestoreContext] getProduct Called");
    if (productLoaded(itemID)) {
      return productData.find((item) => item.itemID === itemID);
    }

    console.log("[FirestoreContext] [getProduct] Fetching Product", itemID);
    const response = await getDoc(doc(db, "product", itemID));
    if (response.exists()) {
      const product = { itemID: itemID, ...response.data() };
      updateProductData([product]);
      return product;
    } else throw new Error("Product not found");
  };

  const getAllProducts = async (showDisabled = false) => {
    console.log("[FirestoreContext] getAllProducts Called");
    let data, q;

    if (allProductsLoaded) {
      data = productData;
      console.log(
        "[FirestoreContext] [getAllProducts] productData",
        productData,
      );
    } else {
      if (productData.length > 0) {
        console.log(
          "[FirestoreContext] [getAllProducts] ONE OR MORE PRODUCTS EXIST",
        );
        const existingItemIDs = productData.map((item) => item.itemID);
        q = showDisabled
          ? query(
              collection(db, "product"),
              orderBy("__name__"),
              where("__name__", "not-in", existingItemIDs),
            )
          : query(
              collection(db, "product"),
              orderBy("__name__"),
              where("__name__", "not-in", existingItemIDs),
              where("enabled", "==", true),
            );
      } else {
        q = showDisabled
          ? query(collection(db, "product"), orderBy("__name__"))
          : query(
              collection(db, "product"),
              orderBy("__name__"),
              where("enabled", "==", true),
            );
      }
      data = await fetchData(q);
      data = updateProductData([...data]);
      setAllProductsLoaded(true);
    }
    return data;
  };

  const filterByCategory = async (categoryID) => {
    const data = await getAllProducts();
    return data.filter((item) => item.categoryID === categoryID);
  };

  const searchProduct = async (searchQuery, includeDisabled = false) => {
    console.log("[FirestoreContext] searchProduct Called");
    const data = await getAllProducts(includeDisabled);
    if (!searchQuery) return data;
    return data.filter(
      (item) =>
        item.tags.some((subItem) =>
          subItem.toLowerCase().includes(searchQuery.toLowerCase()),
        ) || item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const getProductVariations = async (mainProduct) => {
    console.log("[FirestoreContext] getProductVariations Called");
    return await fetchData(
      query(
        collection(db, "product"),
        orderBy("__name__"),
        where("__name__", "in", mainProduct.variations.products),
        where("enabled", "==", true),
      ),
    );
  };

  const uploadFiles = async (directory, files) => {
    let fileLinks = [];
    for (const file of files) {
      try {
        const fileSnapshot = await uploadBytes(
          ref(storage, `${directory}/${file.name}`),
          file,
        );
        const fileURL = await getDownloadURL(fileSnapshot.ref);
        fileLinks.push(fileURL);
      } catch (err) {
        alert(err);
      }
    }
    return fileLinks;
  };

  return (
    <firestoreContext.Provider
      value={{
        deleteObject,
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
        storage,
        ref,
        addDoc,
        deleteDoc,
      }}>
      {children}
    </firestoreContext.Provider>
  );
};

export default FirestoreContextProvider;
