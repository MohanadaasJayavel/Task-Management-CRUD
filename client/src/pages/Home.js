import React, { useEffect, useState } from "react";
import TaskBoard from "../components/TaskBoard";
import TaskModal from "../components/TaskModal";
import taskService from "../services/taskService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logout_icon from "../icons/logout_icon.svg";

const Header = ({ onLogout,setIsModalOpen  }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h2>Task Management System</h2>
      <div className="header-buttons">
        <button
          className="create-task-button"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="create-task-icon">+</span>
          <span className="create-task-text">Create Task</span>
        </button>
        <button className="btn-logout" onClick={onLogout}>
          <img
            src={logout_icon}
            alt="Logout Icon"
            className="logout-icon" 
          />
          Logout
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await taskService.getTasks();
        console.log(tasks, "tasks");
        if (tasks.message === "Invalid token") {
          toast.error("Session expired. Please log in again.");
          navigate("/login");
        } else {
          const formattedColumns = [
            {
              id: "todo",
              title: "To Do",
              tasks: tasks.data.filter((task) => task.column === "todo"),
            },
            {
              id: "in-progress",
              title: "In Progress",
              tasks: tasks.data.filter((task) => task.column === "in-progress"),
            },
            {
              id: "done",
              title: "Done",
              tasks: tasks.data.filter((task) => task.column === "done"),
            },
            {
              id: "blocked",
              title: "Blocked",
              tasks: tasks.data.filter((task) => task.column === "blocked"),
            },
            {
              id: "code-review",
              title: "Code Review",
              tasks: tasks.data.filter((task) => task.column === "code-review"),
            },
          ];
          setColumns(formattedColumns);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskCreated = async (taskData) => {
    const newTask = await taskService.createTask(taskData);
    const updatedColumns = columns.map((col) => {
      if (col.id === "todo") {
        return {
          ...col,
          tasks: [...col.tasks, newTask],
        };
      }
      return col;
    });
    setColumns(updatedColumns);
  };
  const handleTaskUpdated = async (updatedTask) => {
    try {
      await taskService.updateTask(updatedTask._id, updatedTask);
      const updatedColumns = columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        ),
      }));
      setColumns(updatedColumns);
    } catch (error) {
      toast.error("Failed to update task");
    }
  };
  const handleTaskEdit = (task) => {
    setEditTask(task); 
    setIsModalOpen(true); 
  };
  const handleOpenEditModal = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleTaskDeleted = async (taskId) => {
    await taskService.deleteTask(taskId);
    const updatedColumns = columns.map((col) => ({
      ...col,
      tasks: col.tasks.filter((task) => task._id !== taskId),
    }));
    setColumns(updatedColumns);
    setIsModalOpen(false);
  };
  return (
    <div>
      <Header onLogout={handleLogout} setIsModalOpen={setIsModalOpen}/>
      <div className="Parentdiv">
        <TaskBoard
          columns={columns}
          setColumns={setColumns}
          onOpenEditModal={handleOpenEditModal}
          onTaskEdit={handleTaskEdit}
          onTaskDelete={async (taskId) => {
            await taskService.deleteTask(taskId);
            const updatedColumns = columns.map((col) => ({
              ...col,
              tasks: col.tasks.filter((task) => task._id !== taskId),
            }));
            setColumns(updatedColumns);
          }}
        />
      </div>
      {isModalOpen && (
        <TaskModal
          task={editTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditTask(null);
          }}
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      )}
    </div>
  );
};

export default Home;
