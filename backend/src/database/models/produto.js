import db from "../connection.js"

 export default {
    async buscarTodos() {
        const [rows] = await db.query("SELECT * FROM produtos")
        return rows;
    },
    async buscarPorId(id){
        const [rows] = await db.query("SELECT * FROM produtos WHERE id = ?", [id])
        return rows[0]
    },
    async criar(produto) {
        const { nome, descricao, preco, estoque, imagem_url, categoria } = produto
        const [result] = await db.query("INSERT INTO produtos (nome, descricao, preco, estoque, imagem_url, categoria) VALUES (?, ?, ?, ?, ?, ?)", [nome, descricao, preco, estoque, imagem_url, categoria])
        return result.insertId
    },
    async atualizar(id, produto) {
    const { nome, descricao, preco, estoque, imagem_url, categoria } = produto;

    await db.query(
      `UPDATE produtos 
       SET nome=?, descricao=?, preco=?, estoque=?, imagem=?, categoria_id=? 
       WHERE id=?`,
      [nome, descricao, preco, estoque, imagem_url, categoria, id]
    );

    return true;
    },
    async deletar(id) {
    await db.query("DELETE FROM produtos WHERE id=?", [id]);
    return true;
  }
};

    