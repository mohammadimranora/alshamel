import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState("To Do");
    const navigate = useNavigate();

    const saveTask = (e) => {
        e.preventDefault();
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const newTask = {
            id: Date.now(),
            title,
            description,
            createdOn: Date.now(),
            dueDate,
            assignee,
            status,
        };
        storedTasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
        navigate("/");
    };

    return (
        <div className="container py-5">
            <div className="d-flex">
                <div>
                    <h1>Task Manager | Add Task</h1>
                </div>
                <div className="ms-auto pt-2">
                    <Link to="/" className="btn btn-primary"><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
                </div>
            </div>
            <div>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="w-100 d-flex justify-content-center">
                        <form className="row border p-4 rounded shadow" onSubmit={saveTask}>
                            <div className="col-md-6">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-control"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    id="description"
                                    className="form-control"
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dueDate" className="form-label">Due Date</label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    className="form-control"
                                    required
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="assignee" className="form-label">Assignee</label>
                                <input
                                    type="text"
                                    id="assignee"
                                    className="form-control"
                                    required
                                    value={assignee}
                                    onChange={(e) => setAssignee(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    id="status"
                                    className="form-select"
                                    required
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Work">In Work</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="col-12 pt-3">
                                <button type="submit" className="btn btn-primary">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
