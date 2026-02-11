import { NavLink, useNavigate } from "react-router";
import type { role } from "../../helper/interfaces";



interface iProps {
    role?:role,
    open:boolean,
    onClose:(e:React.MouseEvent)=>void
}

interface NavItemProps {
  label: string;
  to: string;
  onClick?: () => void;
}

export function Sidebar({ role, open, onClose }:iProps) {
  const navigate=useNavigate()
  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden ${
          open ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-gray-900 text-gray-100
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0
        `}
      >
        <div className="p-6 text-xl font-bold">Dashboard</div>

        <nav className="px-4 space-y-2">
          <NavItem label="Dashboard" to= "/" onClick={()=>navigate('/')} />
          

          {role === 'admin' && (
            <>
            <NavItem label="Projects" to= "/projects" onClick={()=>navigate('/projects')} />
              <NavItem label="Users" to= "/users" onClick={()=>navigate('/users')} />
              <NavItem label="Assignments" to= "/assignments" onClick={()=>navigate('/assignments')} />
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
function NavItem({ label, to, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `
        block px-4 py-2 rounded cursor-pointer
        hover:bg-gray-800
        ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300'}
        `
      }
    >
      {label}
    </NavLink>
  );
}