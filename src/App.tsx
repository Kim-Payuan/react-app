import React, { useState } from "react";
import { Task } from "./components/TaskContext";
import { TaskProvider } from "./components/TaskContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Tabs from "./components/Tabs";
import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);

  function handleNewTask() {
    setEditTask(undefined);
    setModalOpen(true);
  }
  function handleEditTask(task: Task) {
    setEditTask(task);
    setModalOpen(true);
  }
  function handleCloseModal() {
    setModalOpen(false);
    setEditTask(undefined);
  }

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Topbar onNewTask={handleNewTask} />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6">
            <Tabs />
            <TaskTable onEditTask={handleEditTask} />
          </main>
        </div>
        <TaskModal
          open={modalOpen}
          onClose={handleCloseModal}
          initialTask={editTask}
        />
      </div>
    </TaskProvider>
  );
}

export default App;
