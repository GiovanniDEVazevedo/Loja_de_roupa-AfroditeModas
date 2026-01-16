import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./src/database/connection.js";

// Import das rotas
import usuarioRoutes from "./src/routes/usuariosRoutes.js";
import categoriaRoutes from "./src/routes/categoriasRoutes.js";
import produtoRoutes from "./src/routes/produtosRoutes.js";
import erroHandler from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Teste da API
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// Rotas principais
app.use("/usuarios", usuarioRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);
//Middleware de erros 
app.use(erroHandler)
// Verificar conexão MySQL
pool.connect()
  .then(() => console.log("PostgreSQL conectado com sucesso"))
  .catch(err => console.error("Erro ao conectar ao Banco de dados:", err));

// Start do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));