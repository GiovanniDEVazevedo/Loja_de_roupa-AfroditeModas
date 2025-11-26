const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuarios = require("../database/models/Usuario");

// chave secreta do JWT (ideal colocar no .env)
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    
    // ================================
    //     CADASTRO DE USUÁRIO
    // ================================
    async registrar(req, res) {
        try {
            const { nome, email, senha } = req.body;

            // 1. verificar se o email já existe
            const usuarioExistente = await Usuarios.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(400).json({ erro: "Email já cadastrado" });
            }

            // 2. gerar o hash da senha
            const senhaHash = await bcrypt.hash(senha, 10);

            // 3. criar o usuário
            const novoUsuario = await Usuarios.criar({ nome, email, senhaHash });

            return res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso",
                usuario: novoUsuario
            });

        } catch (error) {
            console.error("Erro no registro:", error);
            return res.status(500).json({ erro: "Erro interno no servidor" });
        }
    },

    // ================================
    //            LOGIN
    // ================================
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            // 1. buscar usuário pelo email
            const usuario = await Usuarios.buscarPorEmail(email);
            if (!usuario) {
                return res.status(400).json({ erro: "Email ou senha incorretos" });
            }

            // 2. comparar senha digitada com senha do banco
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            if (!senhaCorreta) {
                return res.status(400).json({ erro: "Email ou senha incorretos" });
            }

            // 3. gerar token JWT
            const token = jwt.sign(
                {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                },
                JWT_SECRET,
                { expiresIn: "7d" } // expira em 7 dias
            );

            return res.json({
                mensagem: "Login realizado com sucesso",
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                },
                token
            });

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ erro: "Erro interno no servidor" });
        }
    }
};