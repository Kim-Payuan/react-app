import React, { useState } from "react";

function Tabs() {
  const [tab, setTab] = useState("Table");
  return (
    <div className="flex gap-4 mb-6">
      <button
        className={`px-4 py-2 rounded-xl font-semibold ${
          tab === "Table"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        onClick={() => setTab("Table")}
      >
        Table
      </button>
      <button
        className={`px-4 py-2 rounded-xl font-semibold ${
          tab === "Calendar"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        onClick={() => setTab("Calendar")}
      >
        Calendar
      </button>
      {tab === "Calendar" && (
        <div className="ml-4 text-gray-400 text-lg">
          (Calendar view placeholder)
        </div>
      )}
    </div>
  );
}

export default Tabs;
