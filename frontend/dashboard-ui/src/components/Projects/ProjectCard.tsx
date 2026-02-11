
export function ProjectCard({
  name,
  status,
  deadline,
}: {
  name: string;
  status: string;
  deadline: string;
}) {
  return (
    <div className="border rounded p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">
          Deadline: {deadline}
        </div>
      </div>

      <span className="mt-2 sm:mt-0 text-sm font-medium">
        {status}
      </span>
    </div>
  );
}
