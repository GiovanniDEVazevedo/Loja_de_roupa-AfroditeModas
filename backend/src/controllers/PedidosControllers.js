import Pedidos from "../database/models/pedidos.js"
import Produto from "../database/models/produto.js"
import AppError from "../errors/AppError.js"
import { created } from "../utils/response.js"

export default {
    async criar(req, res) {
        const { itens } = req.body
        const usuario_id = req.usuario_id

        if (!itens || itens.length === 0) {
            throw new AppError("Pedido vazio", 400)
        }
        let total = 0
        const produtos = []

        for (const item of itens) {
            const produto = await Produto.buscarPorId(item.produto_id)
            if (!produto) {
                throw new AppError("Produto inválido", 400)
            }
            if (produto.estoque < item.quantidade) {
                throw new AppError(`Estoque insuficiente: ${produto.nome}`, 400)
            }
            total += produto.preco * item.quantidade
            produtos.push({produto, quantidade: item.quantidade})
        }
        const pedido = await Pedidos.criar({ usuario_id, total })
        for (const item of produtos) {
            await Pedidos.adicionarItem({
                pedido_id: pedido.id,
                produto_id: item.produto.id,
                quatidade: item.quantidade,
                preco: item.produto.preco
            })
            await Produto.diminuirEstoque(item.produto.id, item.quantidade)
        }
        return created(res, pedido)
    }
}