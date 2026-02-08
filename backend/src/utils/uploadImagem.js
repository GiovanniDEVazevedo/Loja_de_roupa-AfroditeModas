import cloudinary from "../config/cloudinary.js";
import AppError from "../errors/AppError.js";


export default async function uploadImagem(file, folder ="geral" ) {
    if (!folder) {
        throw new AppError("Arquivo de imagem não enviado", 400)
    }
      try {
          const result = await new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                  { folder },
                  (error, result) => {
                      if (error) reject(error)
                      else resolve(result)
                  }
              ).end(file.buffer)
          })
          return {
              imagem_url: result.secure_url,
              public_id: result.public_id
          }
      } catch (err) {
        throw new AppError("Erro ao enviar imagem", 500)
      }  
    


}
export async function deletarImagem(publicId) {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
}