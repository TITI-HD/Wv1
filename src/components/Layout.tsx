import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Home, Settings, ShieldAlert, LifeBuoy } from "lucide-react";
import { playSound } from "@/lib/audio";

export function MobileLayout() {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    playSound('click');
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex justify-center text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Simulation d'un Ã©cran de tÃ©lÃ©phone */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl relative flex flex-col h-screen overflow-hidden sm:rounded-3xl sm:h-[90vh] sm:my-auto sm:border sm:border-slate-200 dark:sm:border-slate-800">
        
        {/* Contenu principal dÃ©filant */}
        <div className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </div>

        {/* Barre de navigation bas */}
        <nav className="absolute bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around p-3 pb-safe">
          <button onClick={() => handleNav("/")} className="flex flex-col items-center text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 focus:text-sky-500 transition-colors">
            <Home size={24} />
            <span className="text-xs mt-1">Accueil</span>
          </button>
          <button onClick={() => handleNav("/support")} className="flex flex-col items-center text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 focus:text-sky-500 transition-colors">
            <LifeBuoy size={24} />
            <span className="text-xs mt-1">Support</span>
          </button>
          <button onClick={() => handleNav("/settings")} className="flex flex-col items-center text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 focus:text-sky-500 transition-colors">
            <Settings size={24} />
            <span className="text-xs mt-1">RÃ©glages</span>
          </button>
          <button onClick={() => handleNav("/admin")} className="flex flex-col items-center text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 focus:text-rose-500 transition-colors">
            <ShieldAlert size={24} />
            <span className="text-xs mt-1">Admin</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
