import db from "../connection.js";

export default  {
  async buscarPorEmail(email) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );
      return rows[0] || null; 
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw error;
    }
  },

  async criar({ nome, email, senhaHash, cargo = "user" }) {
    try {
      const [result] = await db.query(
        "INSERT INTO usuarios (nome, email, senha, cargo) VALUES (?, ?, ?, ?)",
        [nome, email, senhaHash, cargo]
      );

      return {
        id: result.insertId,
        nome,
        email,
        cargo
      };
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }
  
};

