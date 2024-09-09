import React from "react";
import Task from "./Task";
import { Draggable } from "react-beautiful-dnd";

const Column = ({ column }) => (
  <div className="column">
    <h2>{column.title}</h2>
    {column.tasks.map((task, index) => (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Task task={task} />
          </div>
        )}
      </Draggable>
    ))}
  </div>
);
export default Column;
