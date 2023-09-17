import { useAuth } from "/src/contexts/AuthContext";
import NumberCard from "/src/components/NumberCard";

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <section>
      <NumberCard title="Orders Today" value="50" />
      <NumberCard title="Sales Today" value="$300" />
      <NumberCard title="Sales This Week" value="$1000" />
    </section>
  );
};

export default AdminDashboard;
