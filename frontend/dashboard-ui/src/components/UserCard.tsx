import type { User } from "../helper/interfaces";
import { RoleBadge } from "./RoleBadge";
import { UserActions } from "./UserAction";



export function UsersCards({ users }: { users: User[] }) {
  return (
    <div className="grid gap-4 md:hidden">
      {users.map(user => (
        <div
          key={user.id}
          className="bg-white rounded-lg shadow p-4 space-y-3"
        >
          <div className="text-sm font-medium">
            {user.email}
          </div>

          <RoleBadge role={user.role} />

          <UserActions user={user} fullWidth />
        </div>
      ))}
    </div>
  );
}
