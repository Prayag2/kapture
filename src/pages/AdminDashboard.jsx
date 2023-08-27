import { useAuth } from "/src/contexts/AuthContext";
import Button from "/src/components/Button";

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button onClick={logout}>Sign Out</Button>
    </div>
  );
};

export default AdminDashboard;
