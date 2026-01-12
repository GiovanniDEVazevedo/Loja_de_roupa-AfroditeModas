import pool from"../connection.js";

class Categoria{
  static async listar() {
    const { rows } = await pool.query(
      "SELECT * FROM categorias ORDER BY nome"
    )
    return rows
  }
  static async criar(nome) {
    const { rows } = await pool.query(
      "INSERT INTO categorias (nome) VALUES ($1) RETURNING *",
      [nome]  
    )
    return rows[0]
  }
  static async buscarPorid(id) {
    const { rows } = await pool.query(
      "SELECT * FROM categorias WHERE id = $1",
      [id]
    )
    return rows[0]
  }
}
export default Categoria