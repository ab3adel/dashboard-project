import type { status } from "../helper/interfaces";



export function StatusBadge({ status }: { status: status }) {
  const styles =
    status === 'active'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-200 text-gray-700';

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles}`}>
      {status}
    </span>
  );
}
