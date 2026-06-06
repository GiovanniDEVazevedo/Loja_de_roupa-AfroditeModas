import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import pool from "./src/database/connection.js";

// Import das rotas
import usuarioRoutes from "./src/routes/usuariosRoutes.js";
import categoriaRoutes from "./src/routes/categoriasRoutes.js";
import produtoRoutes from "./src/routes/produtosRoutes.js";
import erroHandler from "./src/middlewares/errorHandler.js";
import PedidosRoutes from "./src/routes/PedidosRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

dotenv.config();

const app = express();

// Seguranca
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Rate limit global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, data: null, error: "Muitas requisições, tente novamente mais tarde" }
});
app.use(globalLimiter);


// Teste da API
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// Rate limit especifico para login (prevenir bruteforce)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, data: null, error: "Muitas tentativas de login. Tente novamente em 15 minutos." }
});

// Rotas principais

app.use("/usuarios/login", loginLimiter);
app.use("/usuarios", usuarioRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);
app.use("/pedidos", PedidosRoutes)
app.use("/dashboard", dashboardRoutes)
//Middleware de erros 
app.use(erroHandler)
// Verificar conexão MySQL
pool.connect()
  .then(() => console.log("PostgreSQL conectado com sucesso"))
  .catch(err => console.error("Erro ao conectar ao Banco de dados:", err));

// Start do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));