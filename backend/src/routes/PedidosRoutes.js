import { Router } from "express";
import PedidosControllers from "../controllers/PedidosControllers.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = Router();

router.post("/carrinho", auth, PedidosControllers.criarPedido);
router.get("/", admin, PedidosControllers.listarTodosPedidos);
router.get("/meus", auth, PedidosControllers.listarMeusPedidos);
router.put("/:id/status", admin, PedidosControllers.atualizarStatus);
router.get("/:id", auth, PedidosControllers.buscarPedido);

export default router