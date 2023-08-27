import { useRef, useEffect } from "react";
import { useAuth } from "/src/contexts/AuthContext";

import Input from "/src/components/Input";
import Button from "/src/components/Button";

const AdminLogin = () => {
  const { login, logout, currentUser } = useAuth();
  const formEl = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formEl.current);
    const dataEmail = formData.get("email");
    const dataPassword = formData.get("password");

    try {
      const user = await login(dataEmail, dataPassword);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        ref={formEl}
        className="flex flex-col w-1/2 mx-auto gap-4 mt-10"
      >
        <Input placeholder="Enter email" type="email" name="email" />
        <Input placeholder="Enter password" type="password" name="password" />
        <Button>Login</Button>
      </form>
      {currentUser ? <Button onClick={logout}>Log Out</Button> : null}
    </div>
  );
};

export default AdminLogin;
