import pool from "../connection.js";

class Usuario {
  static async criar(Usuario) {
    const { nome, email, senha, cargo } = Usuario
    const { rows } = await pool.query(
      `
      INSERT INTO usuario(nome, email, senha, cargo)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `, 
      [nome, email, senha, cargo]
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
  static async atualizar(id, dados) {
    const { nome, email } = dados
    const { rows } = await pool.query(
      `UPDATE usuario SET nome = $1, email = $2 WHERE id = $3 RETURNING id, nome, email, cargo`,
      [nome, email, id]
    )
    return rows[0]
  }
  static async excluir(id) {
    const { rows } = await pool.query(
      `DELETE FROM usuario WHERE id = $1 RETURNING id`,
      [id]
    )
    return rows[0]
  }
}
export default Usuario