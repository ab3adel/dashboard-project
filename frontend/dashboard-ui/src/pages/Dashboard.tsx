import { useAuth } from '../auth/useAuth';
import { AdminDashboard } from '../components/AdminDashboard';
import { StatsGrid } from '../components/StatCard';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Welcome back, {user?.email}
        </p>
      </div>

      {/* Stats */}
      <StatsGrid role={user?.role} />

      {/* Main content */}
      {user?.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <MemberDashboard />
      )}
    </div>
  );
}
