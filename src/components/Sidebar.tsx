import React from "react";

function Sidebar() {
  return (
    <aside className="w-20 bg-white border-r flex flex-col items-center py-6 min-h-screen">
      <div className="mb-8">
        <div className="bg-blue-600 rounded-xl w-10 h-10 flex items-center justify-center text-white text-2xl font-bold">
          C
        </div>
      </div>
      <nav className="flex flex-col gap-8 flex-1">
        <button className="text-gray-400 hover:text-blue-600" aria-label="Main">
          <i className="bx bx-grid-alt text-2xl"></i>
        </button>
        <button
          className="text-gray-400 hover:text-blue-600"
          aria-label="Tasks"
        >
          <i className="bx bx-task text-2xl"></i>
        </button>
        <button
          className="text-gray-400 hover:text-blue-600"
          aria-label="Others"
        >
          <i className="bx bx-dots-horizontal-rounded text-2xl"></i>
        </button>
      </nav>
      <div className="mt-auto">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </aside>
  );
}

export default Sidebar;
