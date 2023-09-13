import { Routes, Route } from "react-router-dom";
import { useFirestore } from "/src/contexts/FirestoreContext";
import Product from "/src/pages/Product";

const ProductRoutes = () => {
  const { productData } = useFirestore();

  return (
    <Routes>
      <Route path=":itemID" element={<Product />} />
    </Routes>
  );
};

export default ProductRoutes;
