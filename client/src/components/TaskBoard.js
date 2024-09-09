import React from "react";
import TaskCard from "./Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import taskService from "../services/taskService";

const TaskBoard = ({ columns, setColumns,onOpenEditModal, onTaskEdit, onTaskDelete }) => {
  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find(
      (col) => col.id === destination.droppableId
    );
    const draggedTask = sourceColumn.tasks[source.index];
    const updatedSourceTasks = Array.from(sourceColumn.tasks);
    updatedSourceTasks.splice(source.index, 1);
    const updatedDestTasks = Array.from(destColumn.tasks);
    updatedDestTasks.splice(destination.index, 0, draggedTask);
    const updatedColumns = columns.map((column) => {
      if (column.id === source.droppableId) {
        return { ...column, tasks: updatedSourceTasks };
      }
      if (column.id === destination.droppableId) {
        return { ...column, tasks: updatedDestTasks };
      }
      return column;
    });
    setColumns(updatedColumns);
    await taskService.updateTask(draggedTask._id, {
      column: destination.droppableId,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {columns.map((column) => (
        <Droppable key={column.id} droppableId={column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="taskcard"
            >
              <h2>{column.title}</h2>
              {column.tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        task={task}
                        onOpenEditModal={onOpenEditModal} 
                        onEdit={() => onTaskEdit(task)}
                        onDelete={() => onTaskDelete(task._id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default TaskBoard;
