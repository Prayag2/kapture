import { Routes, Route } from "react-router-dom";
import { useFirestore } from "/src/contexts/FirestoreContext";
import Product from "/src/pages/Product";

const ProductRoutes = () => {
  const { productData } = useFirestore();

  return (
    <Routes>
      {productData.map((product, id) => (
        <Route
          key={id}
          path={product.productID.toString()}
          element={<Product product={product} />}
        ></Route>
      ))}
    </Routes>
  );
};

export default ProductRoutes;
