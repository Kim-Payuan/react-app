import React, { createContext, useContext, useState, useEffect } from "react";

export type Priority = "Low" | "Medium" | "High";
export type Status = "Ongoing" | "Completed";

export interface Task {
  id: string;
  name: string;
  description: string;
  milestone: string;
  estimation: { start: string; end: string };
  members: Array<{ id: string; name: string; avatarUrl?: string }>;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface Filters {
  search: string;
  priority: Priority | "All";
  status: Status | "All";
}

interface TaskContextType {
  tasks: Task[];
  addTask(task: Task): void;
  updateTask(task: Task): void;
  deleteTask(id: string): void;
  toggleTaskStatus(id: string): void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const sampleTasks: Task[] = [
  {
    id: "1",
    name: "Mobile App Design",
    description: "A food delivery app lets users order...",
    milestone: "FoodPanda",
    estimation: { start: "2025-02-05", end: "2025-02-15" },
    members: [
      { id: "a", name: "A" },
      { id: "j", name: "J" },
    ],
    priority: "Low",
    status: "Ongoing",
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01",
  },
  {
    id: "2",
    name: "Website Design",
    description: "Fast food Company website design...",
    milestone: "KFC",
    estimation: { start: "2025-02-08", end: "2025-02-17" },
    members: [
      { id: "j", name: "J" },
      { id: "m", name: "M" },
      { id: "l", name: "L" },
    ],
    priority: "Low",
    status: "Ongoing",
    createdAt: "2025-02-02",
    updatedAt: "2025-02-02",
  },
  {
    id: "3",
    name: "Website development",
    description: "A clothing brand's company website...",
    milestone: "Artisan Restaurant",
    estimation: { start: "2025-02-10", end: "2025-02-20" },
    members: [{ id: "s", name: "S" }],
    priority: "Medium",
    status: "Ongoing",
    createdAt: "2025-02-03",
    updatedAt: "2025-02-03",
  },
  {
    id: "4",
    name: "App Redesign",
    description: "Coffee shop app redesign with their new...",
    milestone: "Cup story",
    estimation: { start: "2025-02-06", end: "2025-02-20" },
    members: [
      { id: "j", name: "J" },
      { id: "a", name: "A" },
    ],
    priority: "High",
    status: "Ongoing",
    createdAt: "2025-02-04",
    updatedAt: "2025-02-04",
  },
  {
    id: "5",
    name: "Logo Design",
    description: "A clothing brand wants to change their lo...",
    milestone: "Soul dance cloth",
    estimation: { start: "2025-02-12", end: "2025-02-15" },
    members: [
      { id: "j", name: "J" },
      { id: "a", name: "A" },
      { id: "m", name: "M" },
    ],
    priority: "Medium",
    status: "Ongoing",
    createdAt: "2025-02-05",
    updatedAt: "2025-02-05",
  },
  {
    id: "6",
    name: "Website redesign",
    description: "A cycle company wants to update their web...",
    milestone: "Saracen cycle",
    estimation: { start: "2025-02-15", end: "2025-02-28" },
    members: [
      { id: "j", name: "J" },
      { id: "m", name: "M" },
      { id: "l", name: "L" },
    ],
    priority: "Low",
    status: "Ongoing",
    createdAt: "2025-02-06",
    updatedAt: "2025-02-06",
  },
  {
    id: "7",
    name: "Team Annual Tour",
    description: "Every year filllo team arrange a annu...",
    milestone: "Filllo Design Agency",
    estimation: { start: "2025-01-10", end: "2025-01-15" },
    members: [
      { id: "j", name: "J" },
      { id: "a", name: "A" },
      { id: "m", name: "M" },
    ],
    priority: "High",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "8",
    name: "New Website design for Clorio",
    description: "New Website design for Clorio",
    milestone: "Clorio",
    estimation: { start: "2025-01-15", end: "2025-01-20" },
    members: [
      { id: "j", name: "J" },
      { id: "m", name: "M" },
    ],
    priority: "Low",
    status: "Completed",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-02",
  },
  {
    id: "9",
    name: "Office Setup",
    description: "New office place for filllo agency work...",
    milestone: "Filllo Office",
    estimation: { start: "2025-01-12", end: "2025-01-15" },
    members: [
      { id: "j", name: "J" },
      { id: "m", name: "M" },
    ],
    priority: "Medium",
    status: "Completed",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-03",
  },
  {
    id: "10",
    name: "App Redesign",
    description: "Fitness App design for Gym Shark...",
    milestone: "Gym shark",
    estimation: { start: "2025-01-12", end: "2025-01-20" },
    members: [
      { id: "j", name: "J" },
      { id: "a", name: "A" },
    ],
    priority: "Low",
    status: "Completed",
    createdAt: "2025-01-04",
    updatedAt: "2025-01-04",
  },
];

function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return sampleTasks;
      }
    }
    return sampleTasks;
  });
  const [filters, setFilters] = useState<Filters>({
    search: "",
    priority: "All",
    status: "All",
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }
  function updateTask(task: Task) {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }
  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }
  function toggleTaskStatus(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "Ongoing" ? "Completed" : "Ongoing",
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  }

  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    filters,
    setFilters,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
}

export { TaskProvider, useTaskContext };
