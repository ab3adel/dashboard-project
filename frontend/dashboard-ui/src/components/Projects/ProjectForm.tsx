import { useState, useEffect } from "react";
import type { Project, status } from "../../helper/interfaces";

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export function ProjectForm({
  initialData,
  onSubmit,
  loading,
}: ProjectFormProps) {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<status>('active');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDeadline(initialData.deadline.split("T")[0]);
      setBudget(String(initialData.budget));
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let obj = initialData ? {name,deadline,budget:Number(budget),status}:{name,deadline,budget:Number(budget)}
    await onSubmit(obj);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-4 max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold">
        {initialData ? "Update Project" : "Create Project"}
      </h2>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Project Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      {/* Deadline */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Budget</label>
        <input
          type="number"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      {
        initialData &&
      (<div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Status</label>
        <select
          value={status}
          onChange={e =>
            setStatus(e.target.value as "active" | "completed")
          }
          className="border rounded px-3 py-2"
        >
          <option value="active">Active</option>
          <option value="on hold">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div> )}

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Project"
            : "Create Project"}
        </button>
      </div>
    </form>
  );
}
