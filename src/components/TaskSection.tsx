import React, { useState } from "react";
import TaskRow from "./TaskRow";
import { Task } from "./TaskContext";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  selected: string[];
  onSelectAll: () => void;
  onDeselectAll: () => void;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  onEditTask: (task: Task) => void;
}

function TaskSection({
  title,
  tasks,
  selected,
  onSelectAll,
  onDeselectAll,
  setSelected,
  onEditTask,
}: TaskSectionProps) {
  const [collapsed, setCollapsed] = useState(false);
  const allSelected =
    tasks.length > 0 && tasks.every((t) => selected.includes(t.id));
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <button
          className="flex items-center gap-2 text-lg font-bold focus:outline-none"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
        >
          <i
            className={`bx ${
              collapsed ? "bx-chevron-right" : "bx-chevron-down"
            } text-xl`}
          ></i>
          {title}
        </button>
        <div className="flex gap-2">
          <button
            className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-blue-100"
            onClick={allSelected ? onDeselectAll : onSelectAll}
          >
            {allSelected ? "Deselect All" : "Select All"}
          </button>
        </div>
      </div>
      {!collapsed && (
        <div className="overflow-x-auto">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="text-gray-500 text-xs">
                <th className="w-8"></th>
                <th className="w-48">Task Name</th>
                <th className="w-64">Description</th>
                <th className="w-40">Milestone</th>
                <th className="w-56">Estimation</th>
                <th className="w-40">Members</th>
                <th className="w-24">Priority</th>
                <th className="w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  selected={selected.includes(task.id)}
                  setSelected={setSelected}
                  onEditTask={onEditTask}
                />
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-400 py-8">
                    No tasks in this section.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TaskSection;
