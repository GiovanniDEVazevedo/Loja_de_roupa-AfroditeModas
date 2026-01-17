import Pedidos from "../database/models/pedidos.js";
import Produto from "../database/models/produto.js";
import AppError from "../errors/AppError.js";
import { created, ok } from "../utils/response.js";

export default {

  async criarPedido(req, res) {
    const usuario_id = req.user.id;
    const { itens } = req.body;

    if (!itens || itens.length === 0) {
      throw new AppError("Pedido precisa ter itens", 400);
    }

    let total = 0;

    // 1. Validar produtos e estoque
    for (const item of itens) {
      const produto = await Produto.buscarPorId(item.produto_id);

      if (!produto) {
        throw new AppError("Produto não encontrado", 404);
      }

      if (produto.estoque < item.quantidade) {
        throw new AppError(
          `Estoque insuficiente para o produto ${produto.nome}`,
          400
        );
      }

      total += produto.preco * item.quantidade;
    }

    // 2. Criar pedido
    const pedido = await Pedidos.criar({ usuario_id, total });

    // 3. Criar itens e baixar estoque
    for (const item of itens) {
      const produto = await Produto.buscarPorId(item.produto_id);

      await Pedidos.adicionarItem({
        pedido_id: pedido.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco: produto.preco
      });

      await Produto.atualizarEstoque(
        produto.id,
        produto.estoque - item.quantidade
      );
    }

    return created(res, pedido);
  },

  async listarMeusPedidos(req, res) {
    const usuario_id = req.user.id;
    const pedidos = await Pedidos.buscarPorUsuario(usuario_id);
    return ok(res, pedidos);
  },

  async buscarPedido(req, res) {
    const { id } = req.params;

    const pedido = await Pedidos.buscarPedidoPorId(id);
    if (!pedido) {
      throw new AppError("Pedido não encontrado", 404);
    }

    const itens = await Pedidos.buscarItensDoPedido(id);

    return ok(res, { pedido, itens });
  }

};