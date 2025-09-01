import React from "react";
import Checkbox from "./Checkbox";
import Button from "./Button";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center bg-white rounded shadow-sm px-4 py-2 mb-3">
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <span
        className={`ml-3 flex-1 text-lg ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {todo.text}
      </span>
      <Button
        onClick={() => onDelete(todo.id)}
        className="ml-3 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 px-2 py-1 rounded-full"
        ariaLabel="Delete task"
      >
        <i className="bx bx-x text-2xl"></i>
      </Button>
    </div>
  );
}

export default TodoItem;
