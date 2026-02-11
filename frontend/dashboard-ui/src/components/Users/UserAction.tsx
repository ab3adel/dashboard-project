import type { User } from "../helper/interfaces";



export function UserActions({
  user,
  fullWidth = false,
}: {
  user: User;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`flex gap-2 ${
        fullWidth ? 'flex-col' : 'justify-end'
      }`}
    >
      <button className="px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-900">
        Change Role
      </button>

      <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
        Remove
      </button>
    </div>
  );
}
