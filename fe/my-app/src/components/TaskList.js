import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { deleteTask,updateTask } from "../api/api";
import EditTask from "./EditTask";

const TaskList = () => {
  const { tasks, fetchTasks, loading } = useContext(TaskContext);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [editTask, setEditTask] = useState(null);

  const handleSearch = () => fetchTasks(`search=${search}&status=${status}&page=${page}`);

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };
  const handleToggleStatus = async (task) => {
    await updateTask(task._id, { ...task, status: task.status === "completed" ? "pending" : "completed" });
    fetchTasks();
  };

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <button onClick={handleSearch}>Search</button>

      {loading ? <p>Loading...</p> : tasks.map((task) => (
        <div key={task._id}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Due: {task.dueDate}</p>
        <button onClick={() => handleToggleStatus(task)}>
          {task.status === "completed" ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        <button onClick={() => setEditTask(task)}>Edit</button>
        <button onClick={() => handleDelete(task._id)}>Delete</button>
      </div>
      ))}

      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>

      {editTask && <EditTask task={editTask} closeModal={() => setEditTask(null)} />}
    </div>
  );
};

export default TaskList;
