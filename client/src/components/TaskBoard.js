import React from "react";
import TaskCard from "./Task";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const TaskBoard = ({ columns, onDragEnd, onTaskEdit, onTaskDelete }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columns.map((column) => (
        <Droppable key={column.id} droppableId={column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              // style={{
              //   margin: "8px",
              //   border: "1px solid lightgrey",
              //   borderRadius: "4px",
              //   padding: "8px",
              //   width: "220px",
              // }}
              className="taskcard"
            >
              <h2>{column.title}</h2>
              {column.tasks.map((task, index) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  index={index}
                  onEdit={() => onTaskEdit(task)}
                  onDelete={() => onTaskDelete(task._id)}
                />
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
