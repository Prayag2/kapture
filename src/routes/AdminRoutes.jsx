import { Routes, Route } from "react-router-dom";
import AdminDashboard from "/src/pages/AdminDashboard";
import AdminListings from "/src/pages/AdminListings";
import AdminListing from "/src/pages/AdminListing";
import AdminOrders from "/src/pages/AdminOrders";
import AdminNav from "/src/shared/AdminNav";
import Wrapper from "/src/components/Wrapper";

const AdminRoutes = () => {
  return (
    <Wrapper className="mt-5 p-5 min-h-[80vh] flex flex-col items-center justify-center md:flex-row md:items-stretch md:justify-start gap-5">
      <AdminNav />
      <Routes>
        <Route path="" element={<AdminDashboard />} />
        <Route path="listings" element={<AdminListings />} />
        <Route path="listing/:itemID" element={<AdminListing />} />
        <Route path="orders" element={<AdminOrders />} />
      </Routes>
    </Wrapper>
  );
};

export default AdminRoutes;
