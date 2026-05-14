import { useState, useEffect } from "react";
import { Mail, Clock, AlertTriangle } from "lucide-react";
import { playSound } from "@/lib/audio";

export default function Admin() {
  const [stats, setStats] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/stats").then(r => r.json()).then(setStats);
    fetch("/api/admin/tickets").then(r => r.json()).then(setTickets);
  }, []);

  if (!stats) return <div className="p-8 text-center">Connexion sÃ©curisÃ©e au Dashboard...</div>;

  return (
    <div className="p-6 bg-slate-900 min-h-full text-slate-100">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-white mb-1">Super-Admin Console</h1>
        <p className="text-slate-400 text-sm">Espace sÃ©curisÃ© (Aucun accÃ¨s aux donnÃ©es chiffrÃ©es)</p>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Utilisateurs</p>
          <p className="text-2xl font-bold text-sky-400">{stats.activeUsers}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Total Txs</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.totalTransactionsProcessed}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold border-b border-slate-700 pb-2 mb-4 flex items-center">
          <Mail size={16} className="mr-2 text-rose-400" />
          Tickets Support (EnvoyÃ©s Ã  danieltititi882@gmail.com)
        </h3>
        {tickets.length === 0 ? (
          <p className="text-slate-500 italic">Aucun ticket en attente.</p>
        ) : (
          <div className="space-y-3">
            {tickets.map(t => (
              <div key={t.id} className="bg-slate-800 p-4 rounded-xl border border-rose-900/50" onClick={() => playSound('click')}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono bg-rose-500/20 text-rose-300 px-2 py-1 rounded">{t.id}</span>
                  <span className="text-xs text-slate-500 flex items-center"><Clock size={10} className="mr-1"/> {new Date(t.date).toLocaleDateString()}</span>
                </div>
                <p className="font-semibold text-sm mb-1 text-slate-200">Urgence: {t.urgency}</p>
                <p className="text-sm text-slate-400">"{t.message}"</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
         <h3 className="font-bold border-b border-slate-700 pb-2 mb-4">Logs SystÃ¨me RÃ©cents</h3>
         <div className="bg-black/50 p-4 rounded-xl font-mono text-xs overflow-hidden h-32 overflow-y-auto">
            {stats.systemLogs.map((log: any, i: number) => (
                <div key={i} className="mb-1">
                    <span className="text-slate-500">{new Date(log.date).toISOString().split('T')[1].split('.')[0]}</span>
                    <span className={`ml-2 ${log.level === 'WARN' ? 'text-rose-400' : 'text-sky-400'}`}>[{log.level}]</span>
                    <span className="ml-2 text-slate-300">{log.action}</span>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
