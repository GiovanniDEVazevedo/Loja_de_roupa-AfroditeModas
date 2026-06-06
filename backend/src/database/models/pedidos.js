import pool from "../connection.js";

class Pedidos {

  static async criar({ usuario_id, total }) {
    const { rows } = await pool.query(
      `
      INSERT INTO pedidos (usuario_id, total)
      VALUES ($1, $2)
      RETURNING *
      `,
      [usuario_id, total]
    );
    return rows[0];
  }

  static async adicionarItem({ pedido_id, produto_id, quantidade, preco }) {
    const { rows } = await pool.query(
      `
      INSERT INTO pedido_itens 
      (pedido_id, produto_id, quantidade, preco_unitario)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [pedido_id, produto_id, quantidade, preco]
    );
    return rows[0];
  }

  static async buscarPorUsuario(usuario_id) {
    const { rows } = await pool.query(
      `SELECT * FROM pedidos WHERE usuario_id = $1 ORDER BY criado_em DESC`,
      [usuario_id]
    );
    return rows;
  }

  static async buscarPedidoPorId(id) {
    const { rows } = await pool.query(
      `SELECT * FROM pedidos WHERE id = $1`,
      [id]
    );
    return rows[0];
  }

  static async buscarItensDoPedido(pedido_id) {
    const { rows } = await pool.query(
      `SELECT * FROM pedido_itens WHERE pedido_id = $1`,
      [pedido_id]
    );
    return rows;
  }

  static async atualizarStatus(id, status) {
    const { rows } = await pool.query(
      `
      UPDATE pedidos
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );
    return rows[0];
  }

}

export default Pedidos