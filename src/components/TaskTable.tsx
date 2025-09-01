import React, { useState } from "react";
import { useTaskContext, Task, Priority, Status } from "./TaskContext";
import TaskSection from "./TaskSection";

interface TaskTableProps {
  onEditTask: (task: Task) => void;
}

function TaskTable({ onEditTask }: TaskTableProps) {
  const { tasks, filters } = useTaskContext();
  const [sortBy, setSortBy] = useState<string>("estimation");
  const [selected, setSelected] = useState<string[]>([]);

  // Filter and sort logic
  let filtered = tasks.filter((task) => {
    const matchesSearch =
      filters.search === "" ||
      task.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesPriority =
      filters.priority === "All" || task.priority === filters.priority;
    const matchesStatus =
      filters.status === "All" || task.status === filters.status;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  if (sortBy === "priority") {
    filtered = filtered.sort((a, b) => {
      const order = { High: 3, Medium: 2, Low: 1 };
      return order[b.priority] - order[a.priority];
    });
  } else if (sortBy === "estimation") {
    filtered = filtered.sort((a, b) =>
      a.estimation.start.localeCompare(b.estimation.start)
    );
  } else if (sortBy === "name") {
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Bulk select
  function handleSelectAll(sectionTasks: Task[]) {
    setSelected(sectionTasks.map((t) => t.id));
  }
  function handleDeselectAll() {
    setSelected([]);
  }

  // Split by status
  const ongoing = filtered.filter((t) => t.status === "Ongoing");
  const completed = filtered.filter((t) => t.status === "Completed");

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-xl text-sm font-semibold ${
              sortBy === "priority"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSortBy("priority")}
          >
            Priority
          </button>
          <button
            className={`px-3 py-1 rounded-xl text-sm font-semibold ${
              sortBy === "estimation"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSortBy("estimation")}
          >
            Estimation
          </button>
          <button
            className={`px-3 py-1 rounded-xl text-sm font-semibold ${
              sortBy === "name"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSortBy("name")}
          >
            Name
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold"
            onClick={handleDeselectAll}
          >
            Deselect All
          </button>
        </div>
      </div>
      <TaskSection
        title="Ongoing Task"
        tasks={ongoing}
        selected={selected}
        onSelectAll={() => handleSelectAll(ongoing)}
        onDeselectAll={handleDeselectAll}
        setSelected={setSelected}
        onEditTask={onEditTask}
      />
      <TaskSection
        title="Completed Task"
        tasks={completed}
        selected={selected}
        onSelectAll={() => handleSelectAll(completed)}
        onDeselectAll={handleDeselectAll}
        setSelected={setSelected}
        onEditTask={onEditTask}
      />
    </div>
  );
}

export default TaskTable;
