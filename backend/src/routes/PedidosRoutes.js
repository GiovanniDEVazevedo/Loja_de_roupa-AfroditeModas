import PedidosControllers from "../controllers/PedidosControllers.js";
import auth from "../middlewares/auth.js";
import router from "./usuariosRoutes.js";



router.post("/pedidos", auth, PedidosControllers.criarPedido)

export default router