import { Routes, Route } from 'react-router-dom';
import {RequireAuth} from './auth/RequireAuth';
import {RequireRole} from './auth/RequireRole';
import DashboardLayout from './Layout/DashboardLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Users from './pages/Users';
import CreateProject from './pages/CreateProject';
import UpdateProject from './pages/UpdateProject'
import AssignMembers from './pages/AssignMembers';

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
        <Route path="/projects/create-project" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/projects/update-project/:id" element={<UpdateProject />} />
        <Route path="/projects/:id/members" element={<AssignMembers />} />
        

        {/* Admin only */}
        <Route
          path="/users"
          element={
            <RequireRole role="admin">
              <Users />
            </RequireRole>
          }
        />
      </Route>

      {/* Fallback */}
      {/* <Route path="/not-authorized" element={<NotAuthorized />} /> */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
