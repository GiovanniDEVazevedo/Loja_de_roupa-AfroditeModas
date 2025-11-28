import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController.js";

const router = Router();

// Listar todos os produtos
router.get("/", ProdutoController.listarProdutos);

// Buscar 1 produto pelo ID
router.get("/:id", ProdutoController.buscarID);

// Criar produto (ADM)
router.post("/", ProdutoController.criarProduto);

// Atualizar produto (ADM)
router.put("/:id", ProdutoController.atualizarProduto);

// Deletar produto (ADM)
router.delete("/:id", ProdutoController.deletar);

export default router;