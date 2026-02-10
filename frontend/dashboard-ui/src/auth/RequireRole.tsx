import { Navigate } from 'react-router-dom';
import { useAuth } from '../helper/AuthContext/AuthProvider';
import type { JSX } from 'react';
import type { role } from '../helper/interfaces';

export  function RequireRole({
  role,
  children,
}: {
  role: role;
  children: JSX.Element;
}) {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
