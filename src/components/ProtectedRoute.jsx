import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ condition, redirect }) => {
  return condition ? <Outlet /> : <Navigate to={redirect} />;
};

export default ProtectedRoute;
