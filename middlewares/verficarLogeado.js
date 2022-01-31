import { request } from "express"



export function verificarLogeado(req = request, res, next) {
    if (req.session?.user == undefined) {
        res.redirect('/')
    } else {
        next()
    }
}

export function webAuth(req, res, next) {
    if (req.session?.name) {
      next();
    } else {
      res.redirect("/login");
    }
  }
export function verificarPassport(req = request, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}