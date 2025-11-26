import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController.js";

const router = Router();

// Listar todos os produtos
router.get("/", ProdutoController.listar);

// Buscar 1 produto pelo ID
router.get("/:id", ProdutoController.buscarPorId);

// Criar produto (ADM)
router.post("/", ProdutoController.criar);

// Atualizar produto (ADM)
router.put("/:id", ProdutoController.atualizar);

// Deletar produto (ADM)
router.delete("/:id", ProdutoController.deletar);

export default router;