import { useAuth } from "/src/contexts/AuthContext";
import Button from "/src/components/Button";
import NumberCard from "/src/components/NumberCard";
import AdminNav from "/src/shared/AdminNav";

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <main className="w-full h-[80vh] mt-5 bg-secondary p-5 flex flex-col md:flex-row gap-5">
      <AdminNav />
      <section>
        <NumberCard title="Orders Today" value="50" />
        <NumberCard title="Sales Today" value="$300" />
        <NumberCard title="Sales This Week" value="$1000" />
      </section>
    </main>
  );
};

export default AdminDashboard;
