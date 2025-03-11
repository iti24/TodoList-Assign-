import { useState } from "react";
import { addTask } from "../api/api";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";


const AddTask = () => {
  const navigate = useNavigate();

  const { fetchTasks } = useContext(TaskContext);
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await addTask(task);
  //   navigate("/")
  //   fetchTasks();
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await addTask(task); // Assuming addTask returns a response
  
      if (response?.message==="Task created") { // Adjust based on actual response structure
        alert("Task successfully added!");
        navigate("/");
        fetchTasks(); // Fetch updated tasks after navigating
      } else {
        alert("Task addition failed!");
      }
    } catch (error) {
      alert("An error occurred while adding the task!");
      console.error("Error adding task:", error);
    }
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
