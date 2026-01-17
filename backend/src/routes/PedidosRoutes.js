import PedidosControllers from "../controllers/PedidosControllers";
import auth from "../middlewares/auth";
import router from "./usuariosRoutes";



router.post("/pedidos", auth, PedidosControllers.criarPedido)