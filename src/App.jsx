import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "/src/contexts/AuthContext";
import Home from "/src/pages/Home";
import Header from "/src/shared/Header";
import Cart from "/src/shared/Cart";
import Login from "/src/pages/Login";
import Product from "/src/pages/Product";
import AdminDashboard from "/src/pages/AdminDashboard";
import ProtectedRoute from "/src/components/ProtectedRoute";
import ProductRoutes from "/src/routes/ProductRoutes";

function App() {
  const { isAdmin, currentUser } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Header />
        <Cart />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/*" element={<ProductRoutes />} />
          <Route
            element={<ProtectedRoute condition={isAdmin} redirect="/login" />}
          >
            <Route path="/dashboard" element={<AdminDashboard />}></Route>
          </Route>
          <Route
            element={<ProtectedRoute condition={!currentUser} redirect="/" />}
          >
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
