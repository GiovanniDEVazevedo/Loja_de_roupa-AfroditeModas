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
        const [result] = await db.query("INSERT INTO produtos (nome, preco, descricao, imagem_url, estoque,  categoria) VALUES (?, ?, ?, ?, ?, ?)", [nome, preco, descricao,   imagem_url, estoque, categoria])
        return result.insertId
    },
    async atualizar(id, produto) {
    const { nome, descricao, preco, estoque, imagem_url, categoria } = produto;

    await db.query(
      `UPDATE produtos 
       SET nome=?, descricao=?, preco=?, imagem_url=? ,estoque=? , categoria=? 
       WHERE id=?`,
      [nome, descricao, preco,  imagem_url, estoque, categoria, id]
    );

    return true;
    },
    async deletar(id) {
    await db.query("DELETE FROM produtos WHERE id=?", [id]);
    return true;
  }
};

    