

import {Router, request, response} from "express";
import { verificarLogeado, webAuth } from "../middlewares/verficarLogeado.js";
import path from "path"




export  const routerHome = Router();

routerHome.get("/home",webAuth,async(req,res)=>{

    res.render(path.join(process.cwd(), "/views/layouts/Formulario.handlebars"),{
        name: req.session.name
    })

   
})