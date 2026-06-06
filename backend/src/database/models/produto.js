import pool from "../connection.js"

class Produto {
  static async listar() {
    const { rows } = await pool.query(
      `SELECT
       p.*,
       c.nome AS categoria_nome
       FROM produtos p
      LEFT JOIN categorias c ON c.id = p.categoria_id
      ORDER BY p.id DESC`
    )
    return rows
  }
  static async buscarPorId(id) {
    const { rows } = await pool.query(
      "SELECT * FROM produtos WHERE id = $1",
      [id]
    )
    return rows[0]
  } 
  static async criar(produto) {
    const {
      nome,
      descricao,
      preco,
      estoque,
      imagem_url,
      imagem_public_id,
      categoria_id
    } = produto
      
    const { rows } = await pool.query(
      `
      INSERT INTO produtos
      (nome, descricao, preco, estoque, imagem_url,imagem_public_id, categoria_id)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING * 
      `
      ,[nome, descricao, preco, estoque, imagem_url,imagem_public_id, categoria_id]
    )
    return rows[0]
  }
  static async atualizar(id, dados) {
    const colunas = ['nome', 'descricao', 'preco', 'estoque', 'imagem_url', 'imagem_public_id', 'categoria_id']
    const sets = []
    const valores = []
    let idx = 1

    for (const col of colunas) {
      if (dados[col] !== undefined) {
        sets.push(`${col} = $${idx++}`)
        valores.push(dados[col])
      }
    }

    if (sets.length === 0) return null

    valores.push(id)
    const { rows } = await pool.query(
      `UPDATE produtos SET ${sets.join(', ')} WHERE id = $${idx} RETURNING *`,
      valores
    )
    return rows[0]
  }
  static async deletar(id) {
    await pool.query(
      "DELETE FROM produtos WHERE id = $1",
      [id]
    )
    return true
  }
  static async diminuirEstoque(id , quantidade ) {
    const { rowCount } = await pool.query(
      `UPDATE produtos
      SET estoque = estoque - $1
      WHERE id = $2 AND estoque >= $1`, 
      [quantidade, id]
    )
    if (rowCount === 0) {
      throw new Error("Estoque insuficiente");
    }
  }
}
 export default Produto