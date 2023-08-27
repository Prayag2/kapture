import Header from "/src/shared/Header";
import Button from "/src/components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "/src/contexts/AuthContext";

const Home = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  return (
    <div>
      <Header />
      {currentUser ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Link to="/login">Login</Link>
      )}
      {isAdmin && <Link to="/dashboard">Admin Dashboard</Link>}
    </div>
  );
};

export default Home;
