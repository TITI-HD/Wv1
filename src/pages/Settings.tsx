import { Moon, Sun, Type } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { playSound } from "@/lib/audio";

export default function Settings() {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  return (
    <div className="p-6">
      <header className="mb-8 pt-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">RÃ©glages</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Personnalisez votre expÃ©rience</p>
      </header>

      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-sky-100 dark:bg-sky-500/20 text-sky-500 rounded-xl mr-3">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <h2 className="font-semibold text-slate-800 dark:text-slate-200">Apparence</h2>
            </div>
          </div>
          
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl">
            <button
              onClick={() => { playSound('click'); setTheme("light"); }}
              className={`flex-1 flex justify-center py-2 rounded-xl text-sm font-medium transition-all ${
                theme === "light" 
                ? "bg-white text-sky-500 shadow-sm" 
                : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Clair
            </button>
            <button
              onClick={() => { playSound('click'); setTheme("dark"); }}
              className={`flex-1 flex justify-center py-2 rounded-xl text-sm font-medium transition-all ${
                theme === "dark" 
                ? "bg-slate-800 text-sky-400 shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
              }`}
            >
              Sombre
            </button>
          </div>
        </div>

        {/* Font Size Toggle */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-500 rounded-xl mr-3">
                <Type size={20} />
              </div>
              <h2 className="font-semibold text-slate-800 dark:text-slate-200">Taille du texte</h2>
            </div>
          </div>
          
          <div className="flex gap-2">
            {(["small", "medium", "large"] as const).map(size => (
              <button
                key={size}
                onClick={() => { playSound('click'); setFontSize(size); }}
                className={`flex-1 py-3 border rounded-2xl transition-all ${
                  fontSize === size 
                  ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-1 ring-sky-500" 
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900"
                }`}
              >
                <span className={size === 'small' ? 'text-xs' : size === 'medium' ? 'text-base' : 'text-lg'}>Aa</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
