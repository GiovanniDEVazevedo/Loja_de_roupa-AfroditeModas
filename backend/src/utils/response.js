export function ok(res, data) {
    return res.status(200).json({
        success: true,
        data,
        error: null
    })
}
export function created(res, data) {
    return res.status(201).json({
       success: true,
        data,
        error: null 
    })
}
export function badRequest(res, message) {
    return res.status(400).json({
        success: false,
        data: null,
        error: message
    })
}
export function notFound(res, message) {
    return res.status(404).json({
        success: false,
        data: null,
        error: message
    })
}
export function serverError(res, message = "Erro interno do servidor") {
    return res.status(500).json({
        success: false,
        data: null,
        error: message
    })
}