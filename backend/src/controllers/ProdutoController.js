
import Produto from"../database/models/produto.js"
import AppError from "../errors/AppError.js";
import { ok, created } from "../utils/response.js";

  export default {
  listarProdutos: async (req, res) => {
    
      const produtos = await Produto.buscarTodos();

      // Aqui criamos a lógica de disponibilidade NO BACK
      const produtosComStatus = produtos.map(p => ({
        id: p.id,
        nome: p.nome,
        preco: p.preco,
        imagem: p.imagem_url,
        estoque: p.estoque,
        categoria: p.categoria_id,
        disponivel: p.estoque > 0


      })
        
      
      );

      return ok(res, produtosComStatus)

   
  

    },
    async buscarID(req, res) {
        
            const { id } = req.params
            const produto = await Produto.buscarPorId(id)

            if (!produto) {
                throw new AppError("produto nao encontrado", 404)
            }
            return ok(res, produto)
       
    },

async criarProduto(req, res) {
  const { nome, preco, descricao, estoque, categoria } = req.body;

  if (!nome || nome.trim().length < 3) {
    throw new AppError("Nome do produto inválido", 400);
  }

  if (!preco || isNaN(preco) || Number(preco) <= 0) {
    throw new AppError("Preço inválido", 400);
  }

  if (!req.file) {
    throw new AppError("Imagem do produto é obrigatória", 400);
  }

  const imagem = `/uploads/produtos/${req.file.filename}`;

  const novoproduto = await Produto.criar({
    nome: nome.trim(),
    descricao,
    preco,
    estoque,
    imagem_url: imagem,
    categoria
  });

  return created(res, novoproduto);
},
    async atualizarProduto(req,res) {
        const {nome, preco, descricao, estoque, categoria_id}  = req.body
      if (!Number.isInteger(Number(id))) {
              throw new AppError("ID invalido", 400)
            }
      const dados = {
        nome,
        preco,
        descricao,
        estoque,
        categoria_id,
            }
            const produtoExistente = await Produto.buscarPorId(id)
            if (!produtoExistente) {
                throw new AppError("produto nao encontrado", 404)
            }
            const produtoAtualizado = await Produto.atualizar(id, dados)
            return ok(res , produtoAtualizado)
      
    },
     async deletar(req, res) {
    
       if (!Number.isInteger(Number(id))) {
         throw new AppError("ID invalido", 400)
       }

      const produto = await Produto.buscarPorId(id);

      if (!produto) {
        throw new AppError("Produto não encontrado", 404 );
      }

      await Produto.deletar(id);

      return ok(res, {mensagem: "Produto removido com sucesso" });

    
  },
}