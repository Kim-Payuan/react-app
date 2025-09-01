import React from "react";
import { Priority } from "./TaskContext";

interface TagProps {
  priority: Priority;
}

function Tag({ priority }: TagProps) {
  let color = "";
  if (priority === "Low") color = "bg-green-100 text-green-700";
  else if (priority === "Medium") color = "bg-yellow-100 text-yellow-700";
  else if (priority === "High") color = "bg-red-100 text-red-700";
  return (
    <span className={`px-2 py-1 rounded-xl text-xs font-bold ${color}`}>
      {priority}
    </span>
  );
}

export default Tag;
