import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { deleteTask, updateTask } from "../api/api";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import "./TaskList.css";



const TaskList = () => {
  const navigate = useNavigate();
  const { tasks, fetchTasks, loading } = useContext(TaskContext);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [editTask, setEditTask] = useState(null);

  const handleSearch = () => {
    const query = status ? `search=${search}&status=${status}&page=${page}` : `search=${search}&page=${page}`;
    fetchTasks(query);
  };
  
  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleToggleStatus = async (task) => {
    await updateTask(task._id, {
      ...task,
      status: task.status === "completed" ? "pending" : "completed",
    });
    fetchTasks();
  };

  useEffect(() => {
    handleSearch();
  }, [page, status]);

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => navigate("/add-task")}>Go to Add Task</button>
      

      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks?.map((task) => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}</p>

            <button onClick={() => handleToggleStatus(task)}>
              {task.status === "completed" ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button onClick={() => setEditTask(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))
      )}

      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>

      {/* Edit Task Modal */}
      {editTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditTask task={editTask} closeModal={() => setEditTask(null)} />
            <button className="close-button" onClick={() => setEditTask(null)}>
              ✖ 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
