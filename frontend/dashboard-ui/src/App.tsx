import { Routes, Route } from 'react-router-dom';
import {RequireAuth} from './auth/RequireAuth';
import {RequireRole} from './auth/RequireRole';
import DashboardLayout from './Layout/DashboardLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Users from './pages/Users';
import NotAuthorized from './pages/NotAuthorized';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        {/* Admin only */}
        <Route
          path="/users"
          element={
            <RequireRole role="ADMIN">
              <Users />
            </RequireRole>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
