import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import admin from "../middlewares/admin.js";

const router = Router();

// Listar todos os produtos
router.get("/", ProdutoController.listarProdutos);

// Buscar 1 produto pelo ID
router.get("/:id", ProdutoController.buscarID);

// Criar produto (ADM)
router.post("/criar",admin, ProdutoController.criarProduto);

// Atualizar produto (ADM)
router.put("/:id",admin, ProdutoController.atualizarProduto);

// Deletar produto (ADM)
router.delete("/:id",admin, ProdutoController.deletar);

export default router;