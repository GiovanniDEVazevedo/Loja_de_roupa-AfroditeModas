import path from "path"
import multer from "multer"
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "uploads/produtos")
    },
    filename: (req, file, cb) => {
        const extensao = path.extname(file.originalname)
        const nomeArquivo = 
            Date.now() + "_" + Math.round(Math.random() * 1e9) + extensao 
        
        cb(null, nomeArquivo)
    }
})

//filtro
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg"||
        file.mimetype === "image/png" ||
        file.mimetype === "image/webp" ||
        file.mimetype === "image/jpg"
    
    ) {
        cb(null, true)
    } else {
        cb(new Error("tipo de arquivo invalido"), false)
    }
}
export default multer({
    storage,
    fileFilter,
})