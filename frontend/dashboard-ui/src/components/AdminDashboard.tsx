

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">
            Create Project
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded w-full sm:w-auto">
            Manage Users
          </button>
        </div>
      </div>

      {/* Recent projects */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">
          Recent Projects
        </h3>

        <ul className="divide-y">
          <li className="py-2 flex justify-between">
            <span>Bridge Construction</span>
            <span className="text-sm text-gray-500">
              Active
            </span>
          </li>
          <li className="py-2 flex justify-between">
            <span>AI Dashboard</span>
            <span className="text-sm text-gray-500">
              Completed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
