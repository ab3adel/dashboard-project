import { formatDate } from "../../helper/date_formater";
import type { Project } from "../../helper/interfaces";
import { ProjectCard } from "../Projects/ProjectCard";

interface iProps {projects?:Project[]}
export function MemberDashboard({projects}:iProps) {
  return (
    <div className="space-y-6">
      {/* My projects */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">
          My Projects
        </h3>
  <div className="space-y-3">
{
 projects&&  projects?.length>0? 
          projects?.map(ele=> 
          <ProjectCard
            name={ele.name}
            status={ele.status}
            deadline={formatDate(ele.deadline)}
            
          />):null
          // <ProjectCard
          //   name="AI Dashboard"
          //   status="Completed"
          //   deadline="2025-11-10"
          // />
}
        </div>
      </div>
    </div>
  );
}
