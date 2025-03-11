import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { register } = useContext(AuthContext);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
