import db from"../connection.js";

export default  {
  async listar() {
    const [rows] = await db.query("SELECT * FROM categorias");
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query("SELECT * FROM categorias WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async criar(nome) {
    const [result] = await db.query("INSERT INTO categorias (nome) VALUES (?)", [nome]);
    return { id: result.insertId, nome };
  },

  async atualizar(id, nome) {
    const [result] = await db.query(
      "UPDATE categorias SET nome = ? WHERE id = ?",
      [nome, id]
    );

    return result.affectedRows > 0;
  },

  async deletar(id) {
    const [result] = await db.query("DELETE FROM categorias WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}