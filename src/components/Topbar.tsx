import React, { useState } from "react";
import { useTaskContext } from "./TaskContext";

interface TopbarProps {
  onNewTask: () => void;
}

function Topbar({ onNewTask }: TopbarProps) {
  const { filters, setFilters } = useTaskContext();
  const [search, setSearch] = useState(filters.search);
  // Debounce search
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search }));
    }, 400);
    return () => clearTimeout(handler);
  }, [search, setFilters]);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">Taskgedrfgwer</h2>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="rounded-xl border px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <i className="bx bx-search absolute right-3 top-2 text-gray-400 text-xl"></i>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="bg-blue-600 text-white rounded-xl px-4 py-2 font-bold flex items-center gap-2 hover:bg-blue-700"
          onClick={onNewTask}
        >
          <i className="bx bx-plus"></i> New Task
        </button>
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold">Washim Chowdhury</span>
          <i className="bx bx-chevron-down text-xl"></i>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
