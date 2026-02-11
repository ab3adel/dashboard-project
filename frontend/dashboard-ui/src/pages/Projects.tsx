

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { useAuth } from '../helper/AuthContext/AuthProvider';
import type { Project } from '../helper/interfaces';
import { ProjectsTable } from '../components/Projects/ProjectTable';
import { ProjectsCards } from '../components/Projects/ProjectsCards';
import { useAlert } from '../helper/AlertContext/AlertContext';
import { ConfirmDialog } from '../components/MiniComponents/ConfirmDialog';


export default function Projects() {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
 const [debouncedSearch, setDebouncedSearch] = useState("");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const {showAlert} =useAlert()
    const [openConfirm, setOpenConfirm] = useState({open:false,id:-1});


    const handleDelete = async () => {
        try {
          setLoading(true);
          await api.delete(`/projects/${openConfirm.id}`);
          showAlert("success", "Project deleted successfully");
           location.reload()
        } catch (err) {
          showAlert("error", "Failed to delete project");
        } finally {
          setLoading(false);
          setOpenConfirm(pre=>({...pre,open:false}));
        }
      };

    useEffect(() => {
      const controller = new AbortController();
  
      async function fetchProjects() {
        setLoading(true);
  
        const params: any = {};
  
        if (debouncedSearch) params.search = debouncedSearch;
        if (status !== "ALL") params.status = status;
        if (fromDate) params.deadlineFrom = fromDate;
        if (toDate) params.deadlineTo = toDate;
  
        try {
          const res = await api.get("/projects", {
            params,
            signal: controller.signal,
          });
          setProjects(res.data);
        } catch (err:any) {
          showAlert('error','Something bad happened')
          if (err.name !== "CanceledError") {
            if (err.message && Array.isArray(err.message)){
              err.message.map((ele:string)=>showAlert('error',ele))
            }
            else {
              showAlert('error',err.message||'something bad happend')
            }
            console.log(err)
          }
         
        } finally {
          setLoading(false);
        }
      }
  
      fetchProjects();
  
      return () => controller.abort();
    }, [debouncedSearch, status, fromDate, toDate]);

    useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 400)

  return () => clearTimeout(timer);
}, [search]);



  if (loading) return <div>Loading projects…</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-2xl font-semibold">Projects</h2>

        {user?.role === 'admin' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto cursor-pointer"
          onClick={()=>navigate('/projects/create-project')}
          >
            Create Project
          </button>
        )}
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                />
      
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                >
                  <option value="ALL">All statuses</option>
                  <option value="active">Active</option>
                  <option value="on hold">Pending</option>
                  <option value="completed">Completed</option>
                </select>
      
               <div className="flex flex-col gap-1 bg-gray-50">
                  <label className="text-xs text-gray-500">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                    className="border rounded px-3 py-2 text-sm"
                  />
                </div>
      
                <div className="flex flex-col gap-1 bg-gray-50">
                  <label className="text-xs text-gray-500">To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                    className="border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

      {/* Desktop table */}
      <ProjectsTable projects={projects} deleteProjct={(open:boolean,id:number)=>setOpenConfirm(pre=>({open,id}))}  />

      {/* Mobile cards */}
      <ProjectsCards projects={projects}  deleteProjct={(open:boolean,id:number)=>setOpenConfirm(pre=>({open,id}))} />

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
