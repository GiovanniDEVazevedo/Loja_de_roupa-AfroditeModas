import pool from "../connection";

class Pedidos {
    static async criar({ usuario_id, total }) {
        const { rows } = await pool.query(
            `INSERT INTO pedidos (usuario_id, total)
            VALUES ($1, $2)
            RETURNING`, [usuario_id,total]
        )
        return rows[0]
    }
    static async adicionarItem({ pedido_id, produto_id, quatidade, preco }) {
        await pool.query(
            `INSERT INTO pedidos_itens (pedido_id, produto_id, quatidade, preco_unitario )
            VALUES($1,$2,$3,$4)`, 
            [pedido_id, produto_id, quatidade, preco]
        )
    }
}

export default Pedidos