


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/axios';
import { useAuth } from '../helper/AuthContext/AuthProvider';
import type { Project } from '../helper/interfaces';
import { Info } from '../components/MiniComponents/Info';

export default function ProjectDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState<Project|null>(null);

  useEffect(() => {
    api.get(`/projects/${id}`).then(res => {
      setProject(res.data);
    });
  }, [id]);

  if (!project) return <div>Loading project…</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-2xl font-semibold">
          {project.name}
        </h2>

        {user?.role === 'admin' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Assign Users
          </button>
        )}
      </div>

      {/* Project info */}
      <div className="bg-white rounded-lg shadow p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Status" value={project.status} />
        <Info label="Deadline" value={project.deadline} />
        <Info label="Budget" value={`$${project.budget}`} />
      </div>

      {/* Users */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">
          Assigned Users
        </h3>

        {project.users.length === 0 ? (
          <p className="text-sm text-gray-500">
            No users assigned.
          </p>
        ) : (
          <ul className="divide-y">
            {project.users.map(user => (
              <li
                key={user.id}
                className="py-2 flex justify-between items-center"
              >
                <span>{user.email}</span>

                {user.role === 'admin' && (
                  <span className="text-xs text-gray-500">
                    Admin
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
