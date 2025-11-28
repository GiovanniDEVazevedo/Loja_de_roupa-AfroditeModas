import { Router } from "express";
import CategoriasController from "../controllers/CategoriasController.js";

const router = Router();

// Listar todas categorias
router.get("/", CategoriasController.ListarCategorias);

// Buscar uma categoria pelo ID
router.get("/:id", CategoriasController.buscarIdCategoria);

// Criar nova categoria
router.post("/", CategoriasController.criarCategoria);

// Atualizar categoria
router.put("/:id", CategoriasController.atualizarCategorias);

// Deletar categoria
router.delete("/:id", CategoriasController.deletarCategoria);

export default router;