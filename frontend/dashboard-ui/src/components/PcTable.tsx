import type { User } from "../helper/interfaces";
import { RoleBadge } from "./RoleBadge";
import { UserActions } from "./UserAction";

export function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-4 py-3 text-right">
                <UserActions user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
