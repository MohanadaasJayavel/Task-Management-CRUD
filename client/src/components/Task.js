import React from "react";
const Task = ({ task, onOpenEditModal }) => (
  <div className="taskcard_container" onClick={() => onOpenEditModal(task)}>
    <h3 className="header_title">{task.title}</h3>
    <p>{task.description}</p>
  </div>
);
export default Task;
