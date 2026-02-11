import { Link } from "react-router";
import type { Project } from "../../helper/interfaces";
import { StatusBadge } from "../MiniComponents/StatusBadge";


export function ProjectsTable({projects}:{projects:Project[]}) {


  
  return (
    <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
      
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Deadline</th>
            <th className="px-4 py-3">Budget</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {projects.map(project => (
            <tr key={project.id}>
              <td className="px-4 py-3 font-medium">
                {project.name}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={project.status} />
              </td>
              <td className="px-4 py-3">
                {project.deadline}
              </td>
              <td className="px-4 py-3">
                ${project.budget}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
