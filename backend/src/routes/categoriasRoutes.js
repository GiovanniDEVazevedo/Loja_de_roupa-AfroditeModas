import { Router } from "express";
import CategoriasController from "../controllers/CategoriasController.js";

const router = Router();

// Listar todas categorias
router.get("/", CategoriasController.listarTodas);

// Buscar uma categoria pelo ID
router.get("/:id", CategoriasController.buscarPorId);

// Criar nova categoria
router.post("/", CategoriasController.criar);

// Atualizar categoria
router.put("/:id", CategoriasController.atualizar);

// Deletar categoria
router.delete("/:id", CategoriasController.deletar);

export default router;