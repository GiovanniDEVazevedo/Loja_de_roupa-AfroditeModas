import express from"express"
const router = express.Router()

import usuarioController from"../controllers/usuarioController.js"
import auth from "../middlewares/auth.js"

router.post("/registrar", usuarioController.registrar)
router.post("/login", usuarioController.login)
router.put("/atualizar", auth, usuarioController.atualizar)
router.delete("/excluir", auth, usuarioController.excluir)

export default router