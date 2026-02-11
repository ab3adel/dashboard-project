import { Outlet } from 'react-router-dom';
import {Sidebar} from '../components/Navigation/Sidebar';
import {Topbar} from '../components/Navigation/Topbar';
import  {useAuth}  from '../helper/AuthContext/AuthProvider';
import { useState } from 'react';

export default function DashboardLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar role={user?.role} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}/> 

      <div className="flex flex-col flex-1">
        <Topbar user={user} onMenuClick={()=>setSidebarOpen(true)} />
        <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
