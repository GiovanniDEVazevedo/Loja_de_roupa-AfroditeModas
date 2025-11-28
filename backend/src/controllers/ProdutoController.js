
import Produto from"../database/models/produto.js"

  export default {
  listarProdutos: async (req, res) => {
    try {
      const produtos = await Produto.buscarTodos();

      // Aqui criamos a lógica de disponibilidade NO BACK
      const produtosComStatus = produtos.map(produto => {
        return {
          ...produto,
          disponivel: produto.estoque > 0 // true ou false
        };
      });

      return res.status(200).json(produtosComStatus);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
  

    },
    async buscarID(req, res) {
        try {
            const { id } = req.params
            const produto = await Produto.buscarPorId(id)

            if (!produto) {
                return res.status(404).json({erro: "produto nao encontrado"})
            }
            return res.json(produto)
        }
        catch (erro) {
            console.error("Erro ao buscar produto:", erro)
             return res.status(500).json({ erro: "Erro ao buscar produto" });
    
            
        }
    },
    async criarProduto(req, res) {
        try {
            const { nome, preco, descricao, categoria, imagem_url } = req.body
        if (!nome || !preco) {
             return res.status(400).json({erro: "Nome e preço são obrigatorios"})
        }
        const novoproduto = await Produto.criar({
            nome,
            preco,
            descricao,
            categoria,
            imagem_url,
        })
        return res.status(201).json(novoproduto)
        } catch (erro) {
            console.error("Erro ao criar produto:", erro)
            return res.status(500).json({ erro: "erro ao criar produto" })

    }   
    },
    async atualizarProduto(req,res) {
        try {
            const { id } = req.params
            const dados = req.body
            const produtoExistente = await Produto.buscarPorId(id)
            if (!produtoExistente) {
                return res.status(404).json({erro: "produto nao encontrado"})
            }
            const produtoAtualizado = await Produto.atualizar(id, dados)
            return res.json(produtoAtualizado)
        } catch (erro) {
      console.error("Erro ao atualizar produto:", erro);
      return res.status(500).json({ erro: "Erro ao atualizar produto" });
        }
    },
     async deletar(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.buscarPorId(id);

      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }

      await Produto.deletar(id);

      return res.json({ mensagem: "Produto removido com sucesso" });

    } catch (erro) {
      console.error("Erro ao deletar produto:", erro);
      return res.status(500).json({ erro: "Erro ao deletar produto" });
    }
  },
}