import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    fetchTasks();
  };

  return (

    <div className="container py-5">
      <div className="d-flex">
        <div>
          <h1>Task Manager | List</h1>
        </div>
        <div className="ms-auto pt-2">
          <Link to="/add" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Task</Link>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Task#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created On</th>
              <th>Due Date</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.createdOn}</td>
                <td>{task.dueDate}</td>
                <td>{task.assignee}</td>
                <td>{task.status}</td>
                <td>
                  <Link to={`/edit/${task.id}`} className="btn btn-sm btn-warning me-2"><FontAwesomeIcon icon={faEdit} /></Link>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;