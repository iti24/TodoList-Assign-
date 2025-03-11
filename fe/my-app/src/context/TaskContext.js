// src/context/TaskContext.js
import { createContext, useState, useEffect } from "react";
import { getTasks } from "../api/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (query = "") => {
    setLoading(true);
    const data = await getTasks(query);
    setTasks(data.tasks);
    setLoading(false);
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
};
