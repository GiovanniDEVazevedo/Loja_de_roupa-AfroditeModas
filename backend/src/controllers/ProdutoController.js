
import Produto from"../database/models/produto.js"
import AppError from "../errors/AppError.js";
import { ok, created } from "../utils/response.js";
import uploadImagem from "../utils/uploadImagem.js";
import { deletarImagem } from "../utils/uploadImagem.js";

  export default {
  listarProdutos: async (req, res) => {
    
      const produtos = await Produto.buscarTodos();

      //verifica se tem produto no estoque 
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

async criarProduto(req, res, next) {
  try {
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

  
    
    const imagem = await uploadImagem(req.file, "produtos");

    const novoproduto = await Produto.criar({
      nome: nome.trim(),
      descricao,
      preco,
      estoque,
      imagem_url: imagem.imagem_url,
      imagem_public_id: imagem.public_id,
      categoria
    });

    return created(res, novoproduto);
  } catch (error) {
    next(error)
  }
},
async atualizarProduto(req, res, next) {
  try {
    const { id } = req.params;
    const dados = req.body;

    const produto = await Produto.buscarPorId(id);
    if (!produto) {
      throw new AppError("Produto não encontrado", 404);
    }

    //  se veio nova imagem
    if (req.file) {
      // remove imagem antiga
      if (produto.imagem_public_id) {
        await deletarImagem(produto.imagem_public_id);
      }

      // sobe nova imagem
      const upload = await uploadImagem(req.file, "produtos");

      dados.imagem_url = upload.secure_url;
      dados.imagem_public_id = upload.public_id;
    }

    const produtoAtualizado = await Produto.atualizar(id, dados);

    return ok(res, produtoAtualizado);

  } catch (error) {
    next(error);
  }

    },
     async deletar(req, res, next) {
       try {
         const { id } = req.params;

         const produto = await Produto.buscarPorId(id);
         if (!produto) {
           throw new AppError("Produto não encontrado", 404);
         }
if(produto.imagem_public_id){
         //  deleta imagem da cloud
         await deletarImagem(produto.imagem_public_id);
       }
    //  deleta produto do banco
    await Produto.deletar(id);

    return ok(res, { mensagem: "Produto e imagem removidos com sucesso" });

  } catch (error) {
    next(error);
  }
},

     
}