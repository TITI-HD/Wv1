import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import crypto from "crypto";

const PORT = 3000;

// --- SIMULATION DU MODULE C++ (Haute Performance & Chiffrement) ---
// Dans un environnement Python/Django, ceci serait un module C++ via ctypes ou pybind11
const CppEngine = {
  encryptData: (data: string): string => {
    // Simulation AES-256-CBC
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32); // In reality, managed by KMS
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  },
  predictOverdraft: (balance: number, averageBurnRate: number): number => {
    // Algo prÃ©dictif complexe
    return balance - (averageBurnRate * 7); // Projection sur 7 jours
  }
};

// --- BASE DE DONNÃES (Simulation en mÃ©moire pour remplacer PostgreSQL) ---
const DB = {
  users: [{ id: 1, name: "Pilote Alpha", balance: 4520.50, burnRate: 120 }],
  transactions: [
    { id: 101, userId: 1, amount: -45.99, category: "Alimentation", date: new Date().toISOString(), encrypted_data: CppEngine.encryptData("SupermarchÃ© Local") },
    { id: 102, userId: 1, amount: 2500, category: "Salaire", date: new Date(Date.now() - 86400000 * 2).toISOString(), encrypted_data: CppEngine.encryptData("Tech Corp") },
    { id: 103, userId: 1, amount: -12.50, category: "Abonnement", date: new Date(Date.now() - 86400000 * 4).toISOString(), encrypted_data: CppEngine.encryptData("Streaming Service") }
  ],
  supportTickets: [] as any[],
  systemLogs: [] as any[]
};

async function startServer() {
  const app = express();
  app.use(express.json());

  // --- API REST (RemplaÃ§ant Django REST Framework) ---
  
  // RÃ©cupÃ©ration des donnÃ©es de l'espace Utilisateur
  app.get("/api/user/dashboard", (req, res) => {
    const user = DB.users[0];
    const userTxs = DB.transactions.filter(t => t.userId === user.id);
    const overdraftPrediction = CppEngine.predictOverdraft(user.balance, user.burnRate);
    
    // Log sÃ©curisÃ© invisible par l'admin final
    DB.systemLogs.push({ date: new Date(), action: "User Dashboard Accessed", level: "INFO" });

    res.json({
      status: "success",
      user: { name: user.name, currentBalance: user.balance },
      financialHealth: { prediction7Days: overdraftPrediction },
      transactions: userTxs.map(t => ({
          id: t.id,
          amount: t.amount, // En vrai, ceci serait aussi dÃ©chiffrÃ© cÃ´tÃ© client
          category: t.category,
          date: t.date,
          // La charge utile chiffrÃ©e reste chiffrÃ©e
          isEncrypted: true
      }))
    });
  });

  // Module de support client (Super-Administrateur)
  app.post("/api/support/ticket", (req, res) => {
    const { message, urgency } = req.body;
    
    const ticket = {
      id: "TKT-" + Math.floor(Math.random() * 10000),
      message,
      urgency,
      date: new Date(),
      status: "OPEN"
    };
    
    DB.supportTickets.push(ticket);
    DB.systemLogs.push({ date: new Date(), action: "New Support Ticket Created", level: "WARN" });

    // Envoi "Email" simulÃ©
    console.log(`\n================= EMAIL ENVOYÃ =================`);
    console.log(`Ã : danieltititi882@gmail.com (Super-Administrateur)`);
    console.log(`Sujet : Nouvelle requÃªte de support WealthPilot [IMPORTANT]`);
    console.log(`Nouveau ticket reÃ§u. Urgence: ${urgency}`);
    console.log(`Message: "${message}"`);
    console.log(`=================================================\n`);

    res.json({ success: true, ticketId: ticket.id });
  });

  // API Super-Administrateur
  app.get("/api/admin/stats", (req, res) => {
    // L'admin ne voit que des stats globales, JAMAIS les montants persos ou donnÃ©es chiffrÃ©es
    res.json({
      activeUsers: DB.users.length,
      totalTransactionsProcessed: DB.transactions.length,
      openTickets: DB.supportTickets.filter(t => t.status === "OPEN").length,
      systemLogs: DB.systemLogs.slice(-10) // 10 derniers logs
    });
  });

  app.get("/api/admin/tickets", (req, res) => {
    res.json(DB.supportTickets);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
