import AppError from "../errors/AppError.js";

export default function erroHandler(err, req, res, next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            data: null,
            error: err.message
        })
    }
    console.error(err)
    return res.status(500).json({
        success: false,
        data: null,
        error: "Erro interno do servidor"
    })
}
