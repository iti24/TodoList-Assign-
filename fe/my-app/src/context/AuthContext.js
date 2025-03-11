import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // Add useNavigate

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  const login = async (userData) => {
    const data = await signin(userData);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data);
      console.log("Login Successful:", data);

      navigate("/");  // Redirect to TaskList page after login
    }
    return data;
  };

  const register = async (userData) => await signup(userData);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");  // Redirect to Signin after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
