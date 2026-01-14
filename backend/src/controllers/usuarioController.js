import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import Usuarios from "../database/models/Usuario.js";
import dotenv from "dotenv"
import AppError from "../errors/AppError.js";

dotenv.config()
// chave secreta do JWT (ideal colocar no .env)
const JWT_SECRET = process.env.JWT_SECRET

export default {
    
    // ================================
    //     CADASTRO DE USUÁRIO
    // ================================
    async registrar(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || nome.trim().length < 3) {
    return badRequest(res, "Nome inválido");
  }

  if (!email || !email.includes("@")) {
    return badRequest(res, "Email inválido");
  }

  if (!senha || senha.length < 6) {
    return badRequest(res, "Senha fraca");
  }

  const usuarioExistente = await Usuarios.buscarPorEmail(email);
  if (usuarioExistente) {
    return badRequest(res, "Email já cadastrado");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = await Usuarios.criar({
    nome: nome.trim(),
    email: email.toLowerCase(),
    senhaHash,
    cargo: "user"
  });

  return created(res, novoUsuario);
},


    // ================================
    //            LOGIN
    // ================================
    async login(req, res) {
        
            const { email, senha } = req.body;

            const usuario = await Usuarios.buscarPorEmail(email);
            if (!usuario) {
                throw new AppError("Email ou senha incorretos", 400);
            }

            const senhaOk = await bcrypt.compare(senha, usuario.senha);
            if (!senhaOk) {
                throw new AppError("Email ou senha incorretos", 400)
            }

            // gerar token
            const token = jwt.sign(
                {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    cargo: usuario.cargo   // <- importante
                },
                JWT_SECRET,
                { expiresIn: "1d" }
            );

            return res.json({
                mensagem: "Login realizado com sucesso",
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    cargo: usuario.cargo
                },
                token
            });

        
    },
    

}