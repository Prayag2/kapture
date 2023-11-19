import NavItem from "/src/components/Nav/NavItem";

const AdminNav = () => {
  const links = [
    {name: "Summary", to: "/dashboard"},
    {name: "Orders", to: "/dashboard/orders"},
    {name: "Listings", to: "/dashboard/listings"},
    {name: "Categories", to: "/dashboard/categories"},
  ]
  return (
    <aside className="w-full md:max-w-[15rem] md:sticky md:top-[10vh] md:h-[70vh] bg-primary p-3 rounded-md space-y-3 shadow">
      {links.map((link, id)=> (
      <NavItem
	key={`adminNavLink-${id}`}
        className="px-5 py-1 bg-secondary text-lg rounded-md w-full inline-block text-center"
        to={link.to}>
	{link.name}
      </NavItem>
      ))}
    </aside>
  );
};

export default AdminNav;
