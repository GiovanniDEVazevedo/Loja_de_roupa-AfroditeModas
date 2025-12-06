import { Router } from "express";
import CategoriasController from "../controllers/CategoriasController.js";
import admin from "../middlewares/admin.js";

const router = Router();

// Listar todas categorias
router.get("/", admin,CategoriasController.ListarCategorias);

// Buscar uma categoria pelo ID
router.get("/:id", CategoriasController.buscarIdCategoria);

// Criar nova categoria
router.post("/",admin, CategoriasController.criarCategoria);

// Atualizar categoria
router.put("/:id",admin, CategoriasController.atualizarCategorias);

// Deletar categoria
router.delete("/:id",admin, CategoriasController.deletarCategoria);

export default router;