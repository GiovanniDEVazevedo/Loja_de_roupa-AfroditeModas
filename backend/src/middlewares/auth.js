import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1️⃣ Token existe?
  if (!authHeader) {
    throw new AppError("Token não fornecido", 401);
  }

  // formato: Bearer TOKEN
  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Token inválido", 401);
  }

  try {
    // 2️⃣ Validar token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3️⃣ Salvar dados do usuário na request
    req.usuario = {
      id: decoded.id,
      nome: decoded.nome,
      email: decoded.email,
      cargo: decoded.cargo
    };

    // 4️⃣ Seguir
    next();

  } catch (err) {
    throw new AppError("Token expirado ou inválido", 401);
  }
}