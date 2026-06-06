import Dashboard from "../database/models/Dashboard.js";
import { ok } from "../utils/response.js";

export default {
  async index(req, res) {
    const [
      resumo,
      ultimosPedidos,
      produtosEstoqueBaixo,
      produtosSemEstoque,
      produtosPorCategoria,
    ] = await Promise.all([
      Dashboard.resumo(),
      Dashboard.ultimosPedidos(),
      Dashboard.produtosEstoqueBaixo(),
      Dashboard.produtosSemEstoque(),
      Dashboard.produtosPorCategoria(),
    ])

    return ok(res, {
      resumo,
      ultimosPedidos,
      produtosEstoqueBaixo,
      produtosSemEstoque,
      produtosPorCategoria,
    })
  },
}
