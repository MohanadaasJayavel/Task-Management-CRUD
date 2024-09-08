import React, { useEffect, useState } from "react";
import TaskBoard from "../components/TaskBoard";
import TaskModal from "../components/TaskModal"; // Import the TaskModal
import taskService from "../services/taskService";
import { toast } from "react-toastify";
const Home = () => {
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [editTask, setEditTask] = useState(null); // State to store the task being edited

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await taskService.getTasks();
      console.log("tasks--->", tasks);
      const formattedColumns = [
        {
          id: "todo",
          title: "To Do",
          tasks: tasks.filter((task) => task.column === "todo"),
        },
        {
          id: "in-progress",
          title: "In Progress",
          tasks: tasks.filter((task) => task.column === "in-progress"),
        },
        {
          id: "done",
          title: "Done",
          tasks: tasks.filter((task) => task.column === "done"),
        },
      ];
      setColumns(formattedColumns);
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = async (taskData) => {
    const newTask = await taskService.createTask(taskData);
    const updatedColumns = [...columns];
    updatedColumns[0].tasks.push(newTask); // Add new task to the "To Do" column
    setColumns(updatedColumns);
  };

  const handleTaskEdit = async (task) => {
    // Open the modal with task details for editing
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleTaskUpdated = async (updatedTask) => {
    try {
      // Update the task in the backend
      await taskService.updateTask(updatedTask._id, updatedTask);

      // Update the columns in the state
      const updatedColumns = columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        ),
      }));
      setColumns(updatedColumns);
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      // Remove the deleted task from the state
      const updatedColumns = columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task._id !== taskId),
      }));
      setColumns(updatedColumns);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    const updatedColumns = [...columns];
    const [removed] = updatedColumns[source.droppableId].tasks.splice(
      source.index,
      1
    );
    updatedColumns[destination.droppableId].tasks.splice(
      destination.index,
      0,
      removed
    );

    setColumns(updatedColumns);
    await taskService.updateTask(draggableId, {
      column: destination.droppableId,
    });
  };

  return (
    <div>
      <h1>Task Management</h1>
      {/* Create Task Button */}
      <button onClick={() => setIsModalOpen(true)}>Create Task</button>
      <div className="Parentdiv">
        <TaskBoard
          columns={columns}
          onDragEnd={handleDragEnd}
          onTaskEdit={handleTaskEdit}
          onTaskDelete={handleTaskDelete}
        />
      </div>
      {/* Task Creation Modal */}
      {isModalOpen && (
        <TaskModal
          task={editTask} // Pass the task being edited to the modal
          onClose={() => {
            setIsModalOpen(false);
            setEditTask(null); // Clear the task being edited
          }}
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default Home;
