const db = require("../connection")

module.exports = {
    async listar() {
        const [rows] = await db.query("SELECT * FROM categorias")
        return rows
    },
    async buscarPorId(id) {
        const [rows] = await db.query("SELECT * FROM categorias WHERE is = ?", [id])
        return rows[0]
    },async criar(nome) {
    const [result] = await db.query(
      "INSERT INTO categorias (nome) VALUES (?)",
      [nome]
    );

    return result.insertId;
  }

}