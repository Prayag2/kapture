import { Routes, Route } from "react-router-dom";
import AdminDashboard from "/src/pages/AdminDashboard";
import AdminListings from "/src/pages/AdminListings";
import AdminOrders from "/src/pages/AdminOrders";
import AdminNav from "/src/shared/AdminNav";

const AdminRoutes = () => {
  return (
    <main className="w-full mt-5 bg-secondary p-5 flex flex-col md:flex-row gap-5">
      <AdminNav />
      <Routes>
        <Route path="" element={<AdminDashboard />} />
        <Route path="listings" element={<AdminListings />} />
        <Route path="orders" element={<AdminOrders />} />
      </Routes>
    </main>
  );
};

export default AdminRoutes;
