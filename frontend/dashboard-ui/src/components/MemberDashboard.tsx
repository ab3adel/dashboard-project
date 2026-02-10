
export function MemberDashboard() {
  return (
    <div className="space-y-6">
      {/* My projects */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">
          My Projects
        </h3>

        <div className="space-y-3">
          <ProjectCard
            name="Bridge Construction"
            status="Active"
            deadline="2026-03-01"
          />
          <ProjectCard
            name="AI Dashboard"
            status="Completed"
            deadline="2025-11-10"
          />
        </div>
      </div>
    </div>
  );
}
