import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import Usuarios from "../database/models/Usuario.js";
import dotenv from "dotenv"

dotenv.config()
// chave secreta do JWT (ideal colocar no .env)
const JWT_SECRET = process.env.JWT_SECRET

export default {
    
    // ================================
    //     CADASTRO DE USUÁRIO
    // ================================
    async registrar(req, res) {
        
        try {
            const { nome, email, senha, cargo } = req.body;
            

            // cargo padrão = user
            const cargoFinal = cargo === "admin" ? "admin" : "user";

            // verificar email existente
            const usuarioExistente = await Usuarios.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(400).json({
                    erro: "Email já cadastrado",
                    Email: usuarioExistente
                 });
            }

            // gerar hash da senha
            const senhaHash = await bcrypt.hash(senha, 10);
            
            // criar usuário
            const novoUsuario = await Usuarios.criar({
                nome,
                email,
                senhaHash,
                cargo: cargoFinal
            });

            return res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso",
                novoUsuario: {
                    nome,
                    email,
                    cargo: cargoFinal
                }
            });

        } catch (error) {
        
            return res.status(500).json({
                erro: "Erro interno no serv0000idor"
                
             });
        }
    },


    // ================================
    //            LOGIN
    // ================================
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const usuario = await Usuarios.buscarPorEmail(email);
            if (!usuario) {
                return res.status(400).json({ erro: "Email ou senha incorretos" });
            }

            const senhaOk = await bcrypt.compare(senha, usuario.senha);
            if (!senhaOk) {
                return res.status(400).json({ erro: "Email ou senha incorretos" });
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
                { expiresIn: "7d" }
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

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ erro: "Erro interno no servidor login" });
        }
    }
}