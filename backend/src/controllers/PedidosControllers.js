import Pedidos from "../database/models/pedidos.js";
import Produto from "../database/models/produto.js";
import AppError from "../errors/AppError.js";
import { created, ok } from "../utils/response.js";

export default {

  async criarPedido(req, res) {
    const usuario_id = req.usuario.id;
    const { itens } = req.body;
    const adminWhatsApp = process.env.ADMIN_WHATSAPP;

    if (!itens || itens.length === 0) {
      throw new AppError("Pedido precisa ter itens", 400);
    }

    let total = 0;
    const produtosInfo = [];

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

      total += Number(produto.preco) * item.quantidade;
      produtosInfo.push({ nome: produto.nome, quantidade: item.quantidade, preco: produto.preco });
    }

    const pedido = await Pedidos.criar({ usuario_id, total });

    for (const item of itens) {
      const produto = await Produto.buscarPorId(item.produto_id);

      await Pedidos.adicionarItem({
        pedido_id: pedido.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco: produto.preco
      });

      await Produto.diminuirEstoque(produto.id, item.quantidade);
    }

    let whatsapp_link = null;
    if (adminWhatsApp) {
      const linhaPedido = produtosInfo
        .map(i => `• ${i.nome} x${i.quantidade} = R$ ${(Number(i.preco) * i.quantidade).toFixed(2)}`)
        .join("\n");

      const mensagem = [
        `🛍️ *Novo Pedido #${pedido.id}*`,
        `👤 *Cliente:* ${req.usuario.nome}`,
        ``,
        `${linhaPedido}`,
        ``,
        `💰 *Total: R$ ${total.toFixed(2)}*`
      ].join("\n");

      whatsapp_link = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    }

    return created(res, { pedido, whatsapp_link });
  },

  async listarTodosPedidos(req, res) {
    const pedidos = await Pedidos.buscarTodos();
    return ok(res, pedidos);
  },

  async listarMeusPedidos(req, res) {
    const usuario_id = req.usuario.id;
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
  },

  async atualizarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const statusValidos = ["pendente", "confirmado", "preparando", "enviado", "entregue", "cancelado"];

    if (!statusValidos.includes(status)) {
      throw new AppError(`Status inválido. Valores aceitos: ${statusValidos.join(", ")}`, 400);
    }

    const pedido = await Pedidos.atualizarStatus(id, status);
    if (!pedido) {
      throw new AppError("Pedido não encontrado", 404);
    }

    return ok(res, pedido);
  }

};