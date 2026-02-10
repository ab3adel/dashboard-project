import { useEffect, useState } from 'react';
import { api } from '../api/axios';
import type { role, User } from '../helper/interfaces';
import { UsersTable } from '../components/PcTable';
import { UsersCards } from '../components/UserCard';



export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users').then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading users…</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-semibold">Users</h2>
      </div>

      {/* Desktop table */}
      <UsersTable users={users} />

      {/* Mobile cards */}
      <UsersCards users={users} />
    </div>
  );
}
