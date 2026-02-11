import { useEffect, useState } from "react";
import type { Project } from "../../helper/interfaces";
import { api } from "../../api/axios";
import { useAlert } from "../../helper/AlertContext/AlertContext";


export function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const {showAlert} =useAlert()

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProjects() {
      setLoading(true);

      const params: any = {};

      if (search) params.search = search;
      if (status !== "ALL") params.status = status;
      if (fromDate) params.deadlineFrom = fromDate;
      if (toDate) params.deadlineTo = toDate;

      try {
        const res = await api.get("/projects", {
          params,
          signal: controller.signal,
        });
        setProjects(res.data);
      } catch (err:any) {
        showAlert('error','Something bad happened')
        if (err.name !== "CanceledError") {
          console.log(err)
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();

    return () => controller.abort();
  }, [search, status, fromDate, toDate]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 space-y-3">
        <h3 className="font-semibold">Projects</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          />

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="ALL">All statuses</option>
            <option value="active">Active</option>
            <option value="on hold">Pending</option>
            <option value="completed">Completed</option>
          </select>

         <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">To</label>
            <input
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow p-4">
        {loading ? (
          <p className="text-sm text-gray-500">Loading projects…</p>
        ) : projects.length > 0 ? (
          <ul className="divide-y">
            {projects.map(p => (
              <li
                key={p.id}
                className="py-2 flex justify-between items-center"
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-xs px-2 py-1 rounded bg-gray-100">
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No projects found
          </p>
        )}
      </div>
    </div>
  );
}
