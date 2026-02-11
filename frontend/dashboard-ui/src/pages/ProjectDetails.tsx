


import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/axios';
import { useAuth } from '../helper/AuthContext/AuthProvider';
import type { Project } from '../helper/interfaces';
import { Info, UsersInfo } from '../components/MiniComponents/Info';
import { useAlert } from '../helper/AlertContext/AlertContext';
import { BackButton } from '../components/MiniComponents/BackButton';
import { ConfirmDialog } from '../components/MiniComponents/ConfirmDialog';

export default function ProjectDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const {showAlert}=useAlert()
  const [project, setProject] = useState<Project|null>(null);
  const navigate = useNavigate()
  const [openConfirm, setOpenConfirm] = useState({open:false,id:-1});
  const [loading, setLoading] = useState(false);  

  const handleDelete=()=>{
    setLoading(true)
    api.delete(`/projects/${openConfirm.id}`)
    .then(res=>{
      showAlert('info','Project was deletetd Successfully')
      setOpenConfirm(pre=>({...pre,open:false}))
      navigate('/projects')
    })
    .catch(err=>{
      if (err.message && Array.isArray(err.message)){
        err.message.map((ele:any)=>showAlert('error',ele))
      }
      else{
        showAlert('error',err.message||'something bad happpened')
      }

    })
    .finally(()=>{
      setLoading(false)
     
    })
    
  }

  useEffect(() => {
    api.get(`/projects/${id}`).then(res => {
      setProject(res.data);
    }) .catch(err=>{
      if (err.message && Array.isArray(err.message)){
        err.message.map((ele:any)=>showAlert('error',ele))
      }
      else{
        showAlert('error',err.message||'something bad happpened')
      }

    })
  }, [id]);

  if (!project) return <div>Loading project…</div>;

  return (
    <div className="space-y-6">
       <BackButton />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-2xl font-semibold">
          {project.name}
        </h2>
        <div className="grid grid-cols-3 gap-1">

            {user?.role === 'admin' && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded mx-2 cursor-pointer"
              onClick={()=>navigate(`/projects/${project.id}/members`)}
              >
                Assign Users
              </button>
            )}
            {user?.role === 'admin' && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded mx-2 cursor-pointer"
              onClick={()=>navigate(`/projects/update-project/${project.id}`)}
              >
                Update Project
              </button>
            )}
            {
              user?.role ==='admin' && (
                        <button
                  onClick={()=>setOpenConfirm(pre=>({id:project.id,open:true}))}
                  className="bg-red-600 text-white text-sm cursor-pointer rounded "
                >
                  Delete
                </button>
              )
            }
        </div>
        
      </div>

      {/* Project info */}
      <div className="bg-white rounded-lg shadow p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Status" value={project.status} />
        <Info label="Deadline" value={project.deadline} />
        <Info label="Budget" value={`$${project.budget}`} />
        <UsersInfo  info={project.users} />
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

      <ConfirmDialog
              open={openConfirm.open}
              title="Delete Project"
              message="Are you sure you want to delete this project? This action cannot be undone."
              confirmText="Delete"
              loading={loading}
              onConfirm={handleDelete}
              onCancel={() => setOpenConfirm(pre=>({...pre,open:false}))}
            />
    </div>
  );
}
