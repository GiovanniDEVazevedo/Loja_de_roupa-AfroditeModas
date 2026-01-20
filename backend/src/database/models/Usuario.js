import pool from "../connection.js";

class Usuario {
  static async criar(Usuario) {
    const { nome, email, senha_hash, cargo } = Usuario
    const { rows } = await pool.query(
      `
      INSERT INTO usuario(nome, email, senha, cargo)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `, 
      [nome, email, senha_hash, cargo]
    )
    return rows[0]
  }
  static async buscarPorEmail(email) {
    const { rows } = await pool.query(
      "SELECT * FROM usuario WHERE email = $1", 
      [email]
    )
    return rows[0]
  }
  static async buscarPorID(id) {
    const { rows } = await pool.query(
      "SELECT id, nome, email, cargo FROM usuario WHERE id = $1",
      [id]
    )
    return rows[0]
  }
}
export default Usuario