import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { playSound } from "@/lib/audio";

export default function Support() {
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState("ModÃ©rÃ©e");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    playSound('success');
    
    await fetch("/api/support/ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, urgency })
    });

    setSent(true);
    setTimeout(() => {
        setSent(false);
        setMessage("");
    }, 3000);
  };

  return (
    <div className="p-6">
      <header className="mb-8 pt-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">Support Client</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Un problÃ¨me ? L'Ã©quipe est alertÃ©e instantanÃ©ment par email.
        </p>
      </header>

      {sent ? (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-8 rounded-3xl text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          <CheckCircle size={48} className="text-emerald-500 mb-4" />
          <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-2">Message EnvoyÃ©</h2>
          <p className="text-slate-600 dark:text-emerald-200/70 text-sm">
            Notre Super-Administrateur a reÃ§u une notification directe.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Niveau d'urgence
            </label>
            <div className="flex gap-2">
              {['Basse', 'ModÃ©rÃ©e', 'Haute'].map(u => (
                <button
                  key={u}
                  type="button"
                  onClick={() => { playSound('click'); setUrgency(u); }}
                  className={`flex-1 py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${
                    urgency === u 
                      ? 'bg-sky-500 border-sky-500 text-white' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Comment pouvons-nous vous aider ?
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 h-32 resize-none transition-all"
              placeholder="DÃ©crivez votre demande..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 dark:bg-sky-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center mt-6 hover:bg-slate-800 dark:hover:bg-sky-400 active:scale-95 transition-all"
          >
            <Send size={18} className="mr-2" />
            Envoyer le ticket
          </button>
        </form>
      )}
    </div>
  );
}
