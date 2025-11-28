
import Categorias from "../database/models/categoria.js" 

export default  {
    async ListarCategorias(req, res) {
        try {
            const categorias = await Categorias.listar()
            return res.status(200).json(categorias)
        } catch (error) {
            console.error("Erro ao listar categorias:", error)    
            return res.status(500).json({erro:"Erro ao listar categorias"})
        }
    },
    async buscarIdCategoria(req, res) {
        try {
            const { id } = req.params
            const categoria = await Categorias.buscarPorId(id)

            if (!categoria) {
                return res.status(404).json({ erro: "categoria não encontrada." })
                
            }
            return res.status(200).json(categoria)
        } catch (error) {
            console.error("Erro ao buscar categoria:", error)
            return res.status(500).json({erro:"Erro ao buscar categorias"})
        }
    },
    async criarCategoria(req, res) {
        try {
            const { nome } = req.body
            if (!nome) {
                return res.status(400).json({erro: "Erro Nome da categoria e obrigatorio"})
            }
            const nova = await Categoria.criar(nome)
            return res.status(201).json(nova)

            
        } catch (error) {
            console.error("Erro ao criar categoria:", error)
            return res.status(500).json({erro:"erro interno no servidor"})
        }
    },
    async atualizarCategorias(req, res) {
        try {
            const { nome } = req.body
            const { id } = req.params
            if (!nome || nome.trim() === "") {
                return res.status(400).json({ erro: "O nome é Obrigatorio" })
                
            }
            const sucesso = await Categoria.atualizar(id, nome)
            if (!sucesso) {
                return res.status(404).json({erro:"Erro categoria nao encontrada"})
            }
            return res.status(200).json({mensagem: "Categoria atualizada com sucesso ;)"})
        } catch (error) {
            console.error("Erro ao atualizar")
            return res.status(500).json({erro: "erro interno no servidor "})
            
        }
    },
    async deletarCategoria(req, res) {
        try {
            const { id } = req.params 
            
            const sucesso = await Categorias.deletar(id)
            if (!sucesso) {
                return res.status(404).json({ erro: "Erro categoria não encontrada" })
                
            }
            return res.status(200).json({mensagem:"categoria Deletada com sucesso"})
        } catch (error) {
            console.error("erro ao deletar categoria", error)
            return res.status(500).json({erro: "Erro interno do servidor"})
            
      } 
    }
}