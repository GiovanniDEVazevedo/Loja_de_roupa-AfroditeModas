import jwt from "jsonwebtoken"
import AppError from "../errors/AppError.js"

export default function admin(req, res, next) {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new AppError("token não enviado", 403)
    }
    const token = authHeader.split(" ")[1]
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.cargo !== "admin") {
        throw new AppError("acesso negado. apenas Admin", 403)
            
    }
    req.usuario = decoded
    next()
}