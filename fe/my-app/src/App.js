import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;  // Prevents redirect before authentication is loaded
  }

  return user?.token ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <Router>  
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/add-task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
