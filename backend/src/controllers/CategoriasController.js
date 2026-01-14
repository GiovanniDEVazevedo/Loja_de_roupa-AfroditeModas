
import Categorias from "../database/models/categoria.js" 
import AppError from "../errors/AppError.js"
import { ok, created, notFound, serverError,badRequest } from "../utils/response.js"
export default  {
    async ListarCategorias(req, res) {
        
            const categorias = await Categorias.listar()
            return ok(res, categorias)
      
    },
    async buscarIdCategoria(req, res) {
        
            const { id } = req.params
            const categoria = await Categorias.buscarPorId(id)

            if (!categoria) {
                throw new AppError("Categoria não encontrada", 404)
                
            }
            return ok(res, categoria)
        
    },
    async criarCategoria(req, res) {
        
            const { nome } = req.body
            if (!nome || nome.trim().length < 3) {
                throw new AppError( "Erro Nome da categoria e obrigatorio", 400) 
            }
            const nova = await Categorias.criar(nome.trim())
            return created(res, nova)

            
       
    },
    async atualizarCategorias(req, res) {
        
            const { nome } = req.body
            const { id } = req.params
            if (!nome || nome.trim().length < 3) {
               throw new AppError( "O nome é invalido", 400 )
                
            }
            const sucesso = await Categorias.atualizar(id, nome.trim())
            if (!sucesso) {
                throw new AppError("categoria nao encontrada", 404)
            }
            return ok(res, { message:"categoria atualizada com Sucesso!!!"})
        
        
    },
    async deletarCategoria(req, res) {
        
            const { id } = req.params 
            
            const sucesso = await Categorias.deletar(id)
            if (!sucesso) {
                throw new AppError("categoria nao encontrada", 404)
                
            }
            return ok(res, {message: "categoria deletado com sucesso"})
       
    }
}