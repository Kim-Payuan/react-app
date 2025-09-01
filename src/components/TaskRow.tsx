import React from "react";
import { Task, useTaskContext } from "./TaskContext";
import AvatarGroup from "./AvatarGroup";
import Tag from "./Tag";

interface TaskRowProps {
  task: Task;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  onEditTask: (task: Task) => void;
}

function TaskRow({ task, selected, setSelected, onEditTask }: TaskRowProps) {
  const { deleteTask, toggleTaskStatus } = useTaskContext();
  function handleSelect() {
    setSelected((prev) =>
      prev.includes(task.id)
        ? prev.filter((id) => id !== task.id)
        : [...prev, task.id]
    );
  }
  return (
    <tr className="hover:bg-gray-50">
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={handleSelect}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-0"
        />
      </td>
      <td className="font-semibold text-sm">{task.name}</td>
      <td className="text-sm text-gray-500">{task.description}</td>
      <td className="text-sm">{task.milestone}</td>
      <td className="text-sm">
        {task.estimation.start} - {task.estimation.end}
      </td>
      <td>
        <AvatarGroup members={task.members} />
      </td>
      <td>
        <Tag priority={task.priority} />
      </td>
      <td>
        <button
          className="text-blue-600 hover:text-blue-800 mr-2"
          onClick={() => toggleTaskStatus(task.id)}
          aria-label="Toggle Status"
        >
          <i className="bx bx-check"></i>
        </button>
        <button
          className="text-yellow-500 hover:text-yellow-700 mr-2"
          onClick={() => onEditTask(task)}
          aria-label="Edit Task"
        >
          <i className="bx bx-edit"></i>
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => deleteTask(task.id)}
          aria-label="Delete Task"
        >
          <i className="bx bx-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default TaskRow;
