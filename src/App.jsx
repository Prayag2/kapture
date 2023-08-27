import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "/src/contexts/AuthContext";
import Home from "/src/pages/Home";
import Login from "/src/pages/Login";
import AdminDashboard from "/src/pages/AdminDashboard";
import ProtectedRoute from "/src/components/ProtectedRoute";

function App() {
  const { isAdmin, currentUser } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
