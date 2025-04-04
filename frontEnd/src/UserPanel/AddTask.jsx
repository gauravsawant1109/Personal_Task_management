import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import authService from "../Servises/authService";

const AddTask = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    category: "",
    status: "Pending",
    deadline: "",
  });

  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Pending", "In Progress", "Completed"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.priority || !formData.deadline) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:5000/task/createTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ ...formData, userId: user }), 
      });

      const data = await response.json();

      if (response.ok) {
        alert("Task created successfully!");
        setFormData({
          title: "",
          description: "",
          priority: "",
          category: "",
          status: "Pending",
          deadline: "",
        });
      } else {
        alert(data.message || "Error creating task.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  const getUserInfo = async () => {
    try {
      const userInfo = await authService.getUser();
      setUser(userInfo._id);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Task Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category*</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Priority*</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="form-select" required>
                <option value="">Select Priority</option>
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="form-select">
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Deadline*</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="form-control" required />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
