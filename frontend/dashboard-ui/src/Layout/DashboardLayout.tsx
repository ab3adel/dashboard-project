import { Outlet } from 'react-router-dom';
import {Sidebar} from '../components/Sidebar';
import {Topbar} from '../components/Topbar';
import  {useAuth}  from '../helper/AuthContext/AuthProvider';

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen">
      {/* <Sidebar role={user?.role} open={true} onClose={()=>{}}/> */}

      <div className="flex flex-col flex-1">
        <Topbar user={user} onMenuClick={()=>{}} />
        <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
