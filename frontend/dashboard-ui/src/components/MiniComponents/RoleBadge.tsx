import type { User } from "../../helper/interfaces";


export function RoleBadge({ role }: { role: User['role'] }) {
  const styles =
    role === 'admin'
      ? 'bg-purple-100 text-purple-700'
      : 'bg-blue-100 text-blue-700';

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded ${styles}`}
    >
      {role}
    </span>
  );
}
