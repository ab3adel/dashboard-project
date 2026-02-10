import type { User } from "../helper/interfaces";

interface iProps {
    user:User | null,
    onMenuClick:(e:React.MouseEvent)=>void
}


export function Topbar({ user, onMenuClick }:iProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>

        <h1 className="text-base md:text-lg font-semibold">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-gray-600">
          {user?.role}
        </span>
        <button className="text-red-600 text-sm hover:underline">
          Logout
        </button>
      </div>
    </header>
  );
}
