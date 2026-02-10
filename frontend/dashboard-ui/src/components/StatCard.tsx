import type { role } from "../helper/interfaces";

export function StatsGrid({ role }: { role?: role}) {
  const stats =
    role === 'admin'
      ? [
          { label: 'Total Projects', value: 12 },
          { label: 'Active Projects', value: 8 },
          { label: 'Users', value: 24 },
        ]
      : [
          { label: 'My Projects', value: 4 },
          { label: 'Active', value: 3 },
          { label: 'Completed', value: 1 },
        ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="text-sm text-gray-500">
            {stat.label}
          </div>
          <div className="text-2xl font-bold">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
