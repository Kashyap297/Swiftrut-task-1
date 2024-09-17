import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Header";
import Header from "./Header";
import axios from "axios";

const Layout = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  // Fetch tasks from API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you're using JWT token
        const res = await axios.get("http://localhost:8000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data); // Set the tasks
      } catch (err) {
        setError("Error fetching tasks.");
      }
    };

    fetchTasks();
  }, []);
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Header />
        <div className="layout-page">
          {/* <Navbar /> */}
          <div className="class">
            <p className="ghare">
              <h1 className="text-center big-text">Welcome to the Home Page</h1>
            </p>

            <div className="container mt-5">
              <h2 className="text-center mb-4">Task List</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              {tasks.length > 0 ? (
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={task._id}>
                        <td>{index + 1}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.category}</td>
                        <td>{task.completed ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="alert alert-info text-center">
                  No tasks found.
                </div>
              )}
            </div>
          </div>
          <Outlet />
        </div>

        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </div>
  );
};

export default Layout;
