import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);  // New loading state
  const navigate = useNavigate();

  useEffect(() => {
const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
      setIsAuthenticated(true);
    }
    setLoading(false);  // Ensure loading is set to false after checking
  }, []);

  const login = async (userData) => {
    const data = await signin(userData);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser({ token: data.token });
      setIsAuthenticated(true);
      navigate("/");
    }
    return data;
  };const register = async (userData) => await signup(userData);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};