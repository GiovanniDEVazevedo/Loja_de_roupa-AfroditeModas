import pool from "../connection.js";

class Dashboard {
  static async resumo() {
    const queries = await Promise.all([
      pool.query("SELECT COUNT(*)::int AS total FROM produtos"),
      pool.query("SELECT COUNT(*)::int AS total FROM categorias"),
      pool.query("SELECT COUNT(*)::int AS total FROM usuario"),
      pool.query("SELECT COUNT(*)::int AS total FROM pedidos"),
      pool.query("SELECT COALESCE(SUM(total), 0) AS total FROM pedidos"),
    ])

    const [produtos, categorias, usuarios, pedidos, receita] = queries.map(r => r.rows[0])

    return {
      produtos: produtos.total,
      categorias: categorias.total,
      usuarios: usuarios.total,
      pedidos: pedidos.total,
      receita: Number(receita.total),
    }
  }

  static async ultimosPedidos(limite = 5) {
    const { rows } = await pool.query(
      `SELECT p.id, p.total, p.status, p.criado_em,
              u.nome AS usuario_nome
       FROM pedidos p
       LEFT JOIN usuario u ON u.id = p.usuario_id
       ORDER BY p.criado_em DESC
       LIMIT $1`,
      [limite]
    )
    return rows
  }

  static async produtosEstoqueBaixo(limite = 10) {
    const { rows } = await pool.query(
      `SELECT id, nome, estoque, preco
       FROM produtos
       WHERE estoque > 0 AND estoque <= 5
       ORDER BY estoque ASC
       LIMIT $1`,
      [limite]
    )
    return rows
  }

  static async produtosSemEstoque() {
    const { rows } = await pool.query(
      `SELECT COUNT(*)::int AS total FROM produtos WHERE estoque = 0`
    )
    return rows[0].total
  }

  static async produtosPorCategoria() {
    const { rows } = await pool.query(
      `SELECT c.nome AS categoria, COUNT(p.id)::int AS quantidade
       FROM categorias c
       LEFT JOIN produtos p ON p.categoria_id = c.id
       GROUP BY c.id, c.nome
       ORDER BY quantidade DESC`
    )
    return rows
  }
}

export default Dashboard
