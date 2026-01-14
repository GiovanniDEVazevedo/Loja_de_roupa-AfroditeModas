import AppError from "../errors/AppError";

export default function erroHandler(err, req, res, next) {
    if (err.isAppError) {
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
