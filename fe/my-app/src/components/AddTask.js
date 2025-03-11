import { useState } from "react";
import { addTask } from "../api/api";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const AddTask = () => {
  const { fetchTasks } = useContext(TaskContext);
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(task);
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Task Title" onChange={(e) => setTask({ ...task, title: e.target.value })} />
    <input type="text" placeholder="Task Description" onChange={(e) => setTask({ ...task, description: e.target.value })} />
    <input type="date" onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
    <button type="submit">Add Task</button>
  </form>
  );
};

export default AddTask;
