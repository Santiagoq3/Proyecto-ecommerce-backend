

import {Router, request, response} from "express";
import { verificarLogeado } from "../middlewares/verficarLogeado.js";
import path from "path"




export  const routerHome = Router();

routerHome.get("/home",verificarLogeado,async(req,res)=>{

    res.render(path.join(process.cwd(), "/views/layouts/Formulario.handlebars"),{
        name: req.session.name
    })

   
})