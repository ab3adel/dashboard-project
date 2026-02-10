import { Link } from "react-router";
import type { Project } from "../helper/interfaces";
import { StatusBadge } from "./StatusBadge";


export function ProjectsCards({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 md:hidden">
      {projects.map(project => (
        <div
          key={project.id}
          className="bg-white rounded-lg shadow p-4 space-y-2"
        >
          <div className="font-semibold">
            {project.name}
          </div>

          <StatusBadge status={project.status} />

          <div className="text-sm text-gray-500">
            Deadline: {project.deadline}
          </div>

          <div className="text-sm text-gray-500">
            Budget: ${project.budget}
          </div>

          <Link
            to={`/projects/${project.id}`}
            className="block text-center text-blue-600 font-medium mt-2"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
