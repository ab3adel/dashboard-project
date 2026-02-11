import { Link } from "react-router";
import type { Project } from "../../helper/interfaces";
import { StatusBadge } from "../MiniComponents/StatusBadge";


export function ProjectsCards({projects,deleteProjct}:{projects:Project[],deleteProjct:(open:boolean,id:number)=>void}) {
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
          
          <div className="grid grid-cols-2 gap-2 ">
          <Link
            to={`/projects/${project.id}`}
            className="block text-center text-blue-600 text-sm mt-2"
          >
            View 
          </Link>
      
            <Link
            to={`/projects/update-project/${project.id}`}
            className="block text-center text-blue-600 text-sm mt-2"
          >
            Edit
          </Link>
        
           <Link
            to={`/projects/${project.id}/members`}
            className="block text-center text-blue-600 text-sm mt-2"
          >
            Assign Members
          </Link>
            <button
                  onClick={()=>deleteProjct(true,project.id)}
                  className="text-red-600 text-sm cursor-pointer"
                >
                  Delete
           </button>
           </div>
        </div>
      ))}
    </div>
  );
}
