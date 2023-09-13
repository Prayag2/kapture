import NavItem from "/src/components/Nav/NavItem";

const AdminNav = () => {
  return (
    <aside className="w-full max-w-[20rem] bg-primary h-full p-5 rounded-md space-y-5 shadow">
      <NavItem
        className="px-5 py-2 bg-secondary text-lg rounded-md w-full inline-block text-center"
        to="/dashboard">
        Main Dashboard
      </NavItem>
      <NavItem
        className="px-5 py-2 bg-secondary text-lg rounded-md w-full inline-block text-center"
        to="/dashboard/orders">
        Orders
      </NavItem>
      <NavItem
        className="px-5 py-2 bg-secondary text-lg rounded-md w-full inline-block text-center"
        to="/dashboard/listings">
        Listings
      </NavItem>
    </aside>
  );
};

export default AdminNav;
