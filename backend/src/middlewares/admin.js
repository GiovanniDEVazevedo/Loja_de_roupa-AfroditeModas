import jwt from "jsonwebtoken"

export default function admin(req, res, next) {
    const authHeader = req.headers.authorization
    
    if (!authHeader||!authHeader.startsWith("Bearer")) {
        return res.status(401).json({erro: "token não enviado"})
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.cargo !== "admin") {
            return res.status(403).json({erro: "acesso negado. apenas Admin"})
            
        }
        req.usuario = decoded
        next()

    } catch (error) {
        return res.status(401).json({erro: "Token invalido"})
    }
}