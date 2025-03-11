import { useState, useEffect } from "react";
import { updateTask } from "../api/api";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const EditTask = ({ task, closeModal }) => {
  const { fetchTasks } = useContext(TaskContext);
  const [updatedTask, setUpdatedTask] = useState({ 
    title: task.title, 
    description: task.description, 
    dueDate: task.dueDate 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task._id, updatedTask);
    fetchTasks();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
    <input type="text" value={updatedTask.title} onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })} />
    <input type="text" value={updatedTask.description} onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })} />
    <input type="date" value={updatedTask.dueDate} onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })} />
    <button type="submit">Update Task</button>
  </form>
  );
};

export default EditTask;
