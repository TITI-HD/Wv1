import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Wallet, TrendingDown, Star, Lock } from "lucide-react";
import { playSound } from "@/lib/audio";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user/dashboard")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-8 text-center animate-pulse">DÃ©chiffrement AES-256 en cours...</div>;

  const chartData = [
    { name: 'J-6', balance: data.user.currentBalance + 300 },
    { name: 'J-5', balance: data.user.currentBalance + 250 },
    { name: 'J-4', balance: data.user.currentBalance + 100 },
    { name: 'J-3', balance: data.user.currentBalance - 50 },
    { name: 'J-2', balance: data.user.currentBalance - 100 },
    { name: 'J-1', balance: data.user.currentBalance + 50 },
    { name: 'Auj', balance: data.user.currentBalance },
  ];

  return (
    <div className="p-6">
      <header className="mb-8 pt-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent mb-1">
          WealthPilot
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Bonjour, {data.user.name}</p>
      </header>

      {/* Main Card */}
      <div className="bg-sky-500 text-white p-6 rounded-3xl shadow-lg shadow-sky-500/30 mb-6 relative overflow-hidden" onClick={() => playSound('click')}>
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <ShieldIcon />
        </div>
        <p className="text-sky-100 mb-1 flex items-center font-medium">
          <Wallet size={16} className="mr-2" /> Solde SÃ©curisÃ© (AES)
        </p>
        <h2 className="text-4xl font-extrabold">${data.user.currentBalance.toFixed(2)}</h2>
        <div className="mt-4 flex items-center text-sm font-medium bg-white/20 p-2 rounded-xl backdrop-blur-sm w-max">
          <Star size={16} className="mr-1 text-yellow-300 fill-current" />
          <span>Statut Premium Actif</span>
        </div>
      </div>

      {/* AI Prediction */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl mb-6 shadow-sm">
        <p className="flex items-center text-slate-700 dark:text-slate-300 font-semibold mb-2">
          <TrendingDown size={18} className="mr-2 text-rose-500" />
          PrÃ©diction IA (7 jours)
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Selon votre algorithme de dÃ©pense actuel, votre solde estimÃ© sera de:
        </p>
        <h3 className={`text-xl font-bold ${data.financialHealth.prediction7Days < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
          ${data.financialHealth.prediction7Days.toFixed(2)}
        </h3>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Historique RÃ©cent</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              {/* <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /> */}
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#0ea5e9', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="balance" stroke="#0ea5e9" strokeWidth={3} fill="#0ea5e9" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
          Transactions ChiffrÃ©es <Lock size={14} className="ml-2 text-slate-400" />
        </h3>
        <div className="space-y-3">
          {data.transactions.map((tx: any) => (
            <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl" onClick={() => playSound('click')}>
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${tx.amount > 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                   {tx.amount > 0 ? '+' : '-'}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{tx.category}</p>
                  <p className="text-xs text-slate-400">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
              <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-500' : 'text-slate-800 dark:text-slate-200'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    </svg>
  );
}
