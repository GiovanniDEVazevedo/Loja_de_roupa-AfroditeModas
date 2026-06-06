import { Router } from "express";
import PedidosControllers from "../controllers/PedidosControllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/carrinho", auth, PedidosControllers.criarPedido);
router.get("/meus", auth, PedidosControllers.listarMeusPedidos);
router.get("/:id", auth, PedidosControllers.buscarPedido);

export default router