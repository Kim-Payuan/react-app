import React, { useState, useEffect, useRef } from "react";
import { Task, Priority, Status, useTaskContext } from "./TaskContext";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  initialTask?: Task;
}

function TaskModal({ open, onClose, initialTask }: TaskModalProps) {
  const { addTask, updateTask } = useTaskContext();
  const [form, setForm] = useState<Task>(
    initialTask || {
      id: "",
      name: "",
      description: "",
      milestone: "",
      estimation: { start: "", end: "" },
      members: [],
      priority: "Low",
      status: "Ongoing",
      createdAt: "",
      updatedAt: "",
    }
  );
  const [error, setError] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Task name is required.");
      return;
    }
    if (!form.estimation.start || !form.estimation.end) {
      setError("Estimation dates are required.");
      return;
    }
    if (form.id) {
      updateTask({ ...form, updatedAt: new Date().toISOString() });
    } else {
      addTask({
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    setError("");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg outline-none"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-xl font-bold mb-4">
          {form.id ? "Edit Task" : "New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Task Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={2}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">
                Milestone
              </label>
              <input
                name="milestone"
                value={form.milestone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">
                Estimation Start
              </label>
              <input
                name="estimation.start"
                type="date"
                value={form.estimation.start}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    estimation: { ...prev.estimation, start: e.target.value },
                  }))
                }
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">
                Estimation End
              </label>
              <input
                name="estimation.end"
                type="date"
                value={form.estimation.end}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    estimation: { ...prev.estimation, end: e.target.value },
                  }))
                }
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {form.id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
