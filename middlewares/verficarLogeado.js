import { request } from "express"



export function verificarLogeado(req = request, res, next) {
    if (req.session?.user == undefined) {
        res.redirect('/')
    } else {
        next()
    }
}
export function verificarPassport(req = request, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}