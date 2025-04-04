import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskCount, setTaskCount] = useState();
  const [filterData, setFilterData] = useState({
    category: "",
    priority: "",
    status: "",
    title: "",
  });

  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Pending", "In Progress", "Completed"];

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not authenticated.");
      const response = await fetch(
        "http://localhost:5000/task/getTasksByUserId",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
        setTaskCount(data.length);
      } else alert(data.message || "Error fetching tasks.");
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/task/deleteTask/${taskId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Task deleted successfully.");
        fetchTasks();
      } else {
        alert(data.message || "Delete failed.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const openEditModal = (task) => {
    setEditingTask({ ...task });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditingTask({ ...editingTask, [e.target.name]: e.target.value });
  };

  const updateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/task/updateTask/${editingTask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingTask),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Task updated successfully.");
        setShowEditModal(false);
        fetchTasks();
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const applyFilter = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not authenticated.");
      const query = new URLSearchParams(filterData).toString();
      const response = await fetch(
        `http://localhost:5000/task/filter?${query}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
        setShowModal(false);
      } else {
        alert(data.message || "Error filtering tasks.");
      }
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>All Tasks</h2>
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowModal(true)}
        >
          <FaFilter />
        </button>
      </div>
      <div className="text-end mb-4 fw-bold">Total Task : {taskCount}</div>
      {loading ? (
        <p className="text-center">Loading tasks...</p>
      ) : tasks?.length === 0 ? (
        <p className="text-center">No tasks found.</p>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div key={task._id} className="col-md-4">
              <div>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/UserHome/TaskDetails/${task._id}`}
                >
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{task.title}</h5>
                      <p className="card-text">
                        {task.description || "No description"}
                      </p>
                      <p>
                        <strong>Category:</strong> {task.category}
                      </p>
                      <strong>Priority:</strong>{" "}
                      <span
                        className={`badge bg-${
                          task.priority === "High"
                            ? "danger"
                            : task.priority === "Medium"
                            ? "warning"
                            : "success"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <p>
                        <strong>Status:</strong> {task.status}
                      </p>
                      <p>
                        <strong>Deadline:</strong>{" "}
                        {new Date(task.deadline).toLocaleDateString()}
                      </p>
                      <p className="text-muted">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="m-0 p-0 mb-4 d-flex justify-content-start">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => deleteTask(task._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => openEditModal(task)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={applyFilter}>
                <div className="modal-header">
                  <h5 className="modal-title">Filter Tasks</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {["title", "category"].map((field) => (
                    <div className="mb-3" key={field}>
                      <label className="form-label">
                        {field[0].toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={field}
                        className="form-control"
                        value={filterData[field]}
                        onChange={handleFilterChange}
                      />
                    </div>
                  ))}
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      name="priority"
                      value={filterData.priority}
                      onChange={handleFilterChange}
                    >
                      <option value="">All</option>
                      {priorities.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={filterData.status}
                      onChange={handleFilterChange}
                    >
                      <option value="">All</option>
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Apply Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingTask && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  name="title"
                  value={editingTask.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                />
                <input
                  className="form-control mb-2"
                  name="description"
                  value={editingTask.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                />
                <input
                  className="form-control mb-2"
                  name="category"
                  value={editingTask.category}
                  onChange={handleEditChange}
                  placeholder="Category"
                />
                <select
                  className="form-select mb-2"
                  name="priority"
                  value={editingTask.priority}
                  onChange={handleEditChange}
                >
                  {priorities.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select mb-2"
                  name="status"
                  value={editingTask.status}
                  onChange={handleEditChange}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  className="form-control"
                  name="deadline"
                  value={editingTask.deadline?.split("T")[0]}
                  onChange={handleEditChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={updateTask}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTask;
