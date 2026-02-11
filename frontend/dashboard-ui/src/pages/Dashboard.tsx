import { useAuth } from '../helper/AuthContext/AuthProvider';
import { AdminDashboard } from '../components/Dashboard/AdminDashboard';
import { MemberDashboard } from '../components/Dashboard/MemberDashboard';
import { StatsGrid } from '../components/MiniComponents/StatCard';
import { api } from '../api/axios';
import { useEffect, useState } from 'react';
import { useAlert } from '../helper/AlertContext/AlertContext';
import type { Project } from '../helper/interfaces';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats,setStats]=useState()
  const [projects,setProjects]=useState<Project[]>([])
  const { showAlert } = useAlert();
  
   const fetchStat =()=>{
     api('projects/stats')
    .then(res=>{
      if (res.data){
        console.log(res.data)
        setStats(res.data)
      }

    })
    .catch(err=>{
      showAlert('error',err)
    })

  }
 
  useEffect(()=>{
    fetchStat()
  
  },[])
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Stats */}
      <StatsGrid role={user?.role}  stats={stats} projects={stats}/>

      {/* Main content */}
      {user?.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <MemberDashboard  projects={stats}/>
      )}
    </div>
  );
}
