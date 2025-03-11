import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signin = () => {
  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState({ emailuserId: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(userData);
    if (data.token) alert("Logged in successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={(e) => setUserData({ ...userData, emailuserId: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Signin;
