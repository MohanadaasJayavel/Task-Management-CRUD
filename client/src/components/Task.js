import React from "react";

const Task = ({ task, onEdit, onDelete }) => (
  <div className="taskcard_inner">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <button onClick={onEdit}>Edit</button>
    <button onClick={onDelete}>Delete</button>
  </div>
);

export default Task;
