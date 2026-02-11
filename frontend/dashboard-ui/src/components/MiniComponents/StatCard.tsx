import type { Project, role } from "../../helper/interfaces";

interface iProps {
  role?:role,
  stats?:{
     totalProjects:number
      activeProjects:number
      totalUsers:number
  } ,
  projects?:Project[]
}
export function StatsGrid({ role ,stats,projects}: iProps) {
  const stats_data =
    role === 'admin'
      ? [
          { label: 'Total Projects', value:stats?.totalProjects  },
          { label: 'Active Projects', value: stats?.activeProjects},
          { label: 'Users', value: stats?.totalUsers},
        ]
      : [
          { label: 'My Projects', value: projects?.length},
          { label: 'Active', value: projects?.filter(ele=>ele.status === 'active').length },
          { label: 'Completed', value: projects?.filter(ele=>ele.status === 'completed').length },
        ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats_data.map((stat) => (
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
