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
  static async buscarPorId(id) {
    const { rows } = await pool.query(
      "SELECT * FROM categorias WHERE id = $1",
      [id]
    )
    return rows[0]
  }
  static async atualizar(id, nome) {
    const { rowCount } = await pool.query(
      "UPDATE categorias SET nome = $1 id = $2",
      [id, nome]
    )
    return rowCount > 0
  }
  static async deletar(id) {
    const { rowCount } = await pool.query(
      "DELETE FROM categorias WHERE id = $1",
      [id]
    )
    return rowCount > 0 
  }
}
export default Categoria