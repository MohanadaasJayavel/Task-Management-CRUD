import React, { useState, useEffect } from "react";
import taskService from "../services/taskService";

const TaskModal = ({ task, onClose, onTaskCreated, onTaskUpdated }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [column, setColumn] = useState(task ? task.column : "todo");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setColumn(task.column);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, column };
    if (task) {
      // Update existing task
      await onTaskUpdated(updatedTask);
    } else {
      // Create new task
      await onTaskCreated({ title, description, column });
    }
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{task ? "Edit Task" : "Create Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Task Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            required
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button type="submit">{task ? "Update Task" : "Create Task"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
