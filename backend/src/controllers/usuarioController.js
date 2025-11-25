const Usuarios = require("../database/models/Usuario");

module.exports = {
    async verificarEmail(req, res) {
        try {
            // 1. Pega o email enviado pelo front
            const { email } = req.body;

            // 2. Validação básica
            if (!email) {
                return res.status(400).json({ erro: "Email não enviado." });
            }

            // 3. Consulta no banco
            const usuario = await Usuarios.buscarPorEmail(email);

            // 4. Caso não exista
            if (!usuario) {
                return res.status(404).json({ existe: false });
            }

            // 5. Caso exista
            return res.status(200).json({
                existe: true,
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            });

        } catch (error) {
            console.error("Erro no controller verificarEmail:", error);
            return res.status(500).json({ erro: "Erro interno no servidor" });
        }
    }
}