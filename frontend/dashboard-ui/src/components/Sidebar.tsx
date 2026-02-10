import type { role } from "../helper/interfaces";



interface iProps {
    role?:role,
    open:boolean,
    onClose:(e:React.MouseEvent)=>void
}

export function Sidebar({ role, open, onClose }:iProps) {
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
          <NavItem label="Dashboard" />
          <NavItem label="Projects" />

          {role === 'admin' && (
            <>
              <NavItem label="Users" />
              <NavItem label="Assignments" />
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <div className="px-4 py-2 rounded hover:bg-gray-800 cursor-pointer">
      {label}
    </div>
  );
}
