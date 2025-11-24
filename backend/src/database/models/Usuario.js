const db = require("../connection");

module.exports = {
  async buscarPorEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  async criar({ nome, email, senhaHash }) {
    const [result] = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaHash]
    );

    return result.insertId;
  }
};
