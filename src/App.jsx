import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "/src/contexts/AuthContext";
import Home from "/src/pages/Home";
import Header from "/src/shared/Header";
import Cart from "/src/shared/Cart";
import Login from "/src/pages/Login";
import Search from "/src/pages/Search";
import NotFound from "/src/pages/NotFound";
import AdminDashboard from "/src/pages/AdminDashboard";
import ProtectedRoute from "/src/components/ProtectedRoute";
import ProductRoutes from "/src/routes/ProductRoutes";
import AdminRoutes from "/src/routes/AdminRoutes";

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
          <Route path="/search/" element={<Search />} />
          <Route path="/category/:categoryID" element={<Search />} />
          <Route
            element={<ProtectedRoute condition={isAdmin} redirect="/404" />}>
            <Route path="/dashboard/*" element={<AdminRoutes />}></Route>
          </Route>
          <Route
            element={<ProtectedRoute condition={!currentUser} redirect="/" />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
