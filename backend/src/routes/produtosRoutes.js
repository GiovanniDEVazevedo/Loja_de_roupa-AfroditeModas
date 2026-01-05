import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import admin from "../middlewares/admin.js";
import upload from "../config/multer.js"

const router = Router();

// Listar todos os produtos
router.get("/listar", ProdutoController.listarProdutos);

// Buscar 1 produto pelo ID
router.get("/buscar/:id", ProdutoController.buscarID);

// Criar produto (ADM)
router.post("/criar",admin,upload.single("imagem_url") , ProdutoController.criarProduto);

// Atualizar produto (ADM)
router.put("/:id",admin, ProdutoController.atualizarProduto);

// Deletar produto (ADM)
router.delete("/:id",admin, ProdutoController.deletar);

export default router;