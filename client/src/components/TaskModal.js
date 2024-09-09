import React, { useState, useEffect } from "react";
import taskService from "../services/taskService";
import close_icon from "../icons/close_icon.svg";
import { toast } from "react-toastify";
const TaskModal = ({
  task,
  onClose,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
}) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [startDate, setstartDate] = useState(task ? task.startDate : "");
  const [endDate, setendDate] = useState(task ? task.endDate : "");
  const [column, setColumn] = useState(task ? task.column : "todo");
  const [assignee, setAssignee] = useState(task ? task.assignee : "");
  const [status, setStatus] = useState(task ? task.status : "");

  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setColumn(task.column);
      setstartDate(task.startDate);
      setendDate(task.endDate);
      setAssignee(task.assignee);
      setStatus(task.status);
    }
  }, [task]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      column,
      startDate,
      endDate,
      assignee,
      status,
    };
    if (task) {
      await onTaskUpdated(updatedTask);
      toast.success("Task updated successfully!");
    } else {
      await onTaskCreated({
        title,
        description,
        column,
        startDate,
        endDate,
        assignee,
        status,
      });
      toast.success("Task created successfully!");
    }
    onClose();
  };
  const handleDelete = async () => {
    if (task) {
      await onTaskDeleted(task._id);
      toast.success("Task deleted successfully!");
    }
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal_card_header_container">
            <h2 className="h2_font">{task ? "Edit Task" : "Create Task"}</h2>
            <div className="modal_card_close_icon_div" onClick={onClose}>
              <img
                src={close_icon}
                alt="Close Icon"
                className="modal_close_icon_image"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal_main_container">
              <div className="modal_left_main_container">
                <div className="modal_title_container">
                  <label className="modal_label">Title</label>
                  <input
                    type="text"
                    className="modal_text_input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="modal_description_container">
                  <label className="modal_label">Description</label>

                  <textarea
                    value={description}
                    className="modal_input_description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal_right_main_container">
                <div className="modal_status_container">
                  <label className="modal_label">Status</label>
                  <select
                    value={status}
                    className="modal_status_dropdown_container"
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="blocked">Blocked</option>
                    <option value="code-review">Code Review</option>
                  </select>
                </div>
                <div className="modal_dates_container">
                  <div className="modal_dates_start">
                    <label className="modal_label">Start Date</label>
                    <input
                      type="date"
                      className="modal_date_picker"
                      value={startDate}
                      onChange={(e) => setstartDate(e.target.value)}
                    />
                  </div>
                  <div className="modal_dates_end">
                    <label className="modal_label">End Date</label>
                    <input
                      type="date"
                      className="modal_date_picker"
                      value={endDate}
                      onChange={(e) => setendDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal_assignee_container">
                  <label className="modal_label">Assignee</label>
                  <select
                    value={assignee}
                    className="modal_assignee_dropdown_container"
                    onChange={(e) => setAssignee(e.target.value)}
                    required
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="blocked">Blocked</option>
                    <option value="code-review">Code Review</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal_button_container">
              <button type="submit" className="rich_button">
                {task ? "Update Task" : "Create Task"}
              </button>
              {task && (
                <button
                  type="button"
                  className="modal_delete_button rich_button_delete"
                  onClick={handleDelete}
                >
                  Delete Task
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TaskModal;
