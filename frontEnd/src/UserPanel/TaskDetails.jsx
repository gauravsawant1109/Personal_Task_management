import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsToggles } from "react-icons/bs";
import { FaToggleOn } from "react-icons/fa6";
import { FaToggleOff } from "react-icons/fa6";
const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getTaskId = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const response = await fetch(`http://localhost:5000/task/getTaskById/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setTask(data);
      } else {
        setError(data.message || "Failed to get task.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while getting task details.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async () => {
    if (!task) return;
    let newStatus;
    if (task.status === "Pending"||"In Progress") newStatus =  "Completed";
    else newStatus = "Pending";

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/task/updateTask/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        setTask((prev) => ({ ...prev, status: newStatus }));
      } else {
        alert(data.message || "Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (id) getTaskId();
  }, [id]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;
  if (!task) return <div className="text-center mt-4">No task found.</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title">{task.title}</h3>
          <p className="card-text">
            {task.description || "No description provided."}
          </p>
          <p><strong>Category:</strong> {task.category}</p>
          <p>
            <strong>Priority:</strong>{" "}
            <span className={`badge bg-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}`}>
              {task.priority}
            </span>
          </p>
          <p>
            <strong>Status:</strong> {task.status}
            <button
              onClick={toggleStatus}
              className="btn btn-sm btn-outline-primary ms-3"
              disabled={updating}   
            >
              {/* {updating ? "Updating..." :(<BsToggles />) } */}
              {task.status !== "Completed" ? <FaToggleOff /> : <FaToggleOn />}

            </button>
          </p>
          <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
          <p className="text-muted">Created At: {new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
