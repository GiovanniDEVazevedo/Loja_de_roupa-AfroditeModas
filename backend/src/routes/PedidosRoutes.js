import PedidosControllers from "../controllers/PedidosControllers.js";
import auth from "../middlewares/auth.js";
import router from "./usuariosRoutes.js";



router.post("/carrinho", auth, PedidosControllers.criarPedido)

export default router