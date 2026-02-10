

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/axios';
import { useAuth } from '../auth/useAuth';
import type { Project } from '../helper/interfaces';
import { ProjectsTable } from '../components/ProjectTable';
import { ProjectsCards } from '../components/ProjectsCards';


export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects').then(res => {
      setProjects(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading projects…</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-2xl font-semibold">Projects</h2>

        {user?.role === 'admin' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">
            Create Project
          </button>
        )}
      </div>

      {/* Desktop table */}
      <ProjectsTable projects={projects} />

      {/* Mobile cards */}
      <ProjectsCards projects={projects} />
    </div>
  );
}
