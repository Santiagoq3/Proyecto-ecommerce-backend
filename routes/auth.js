import {Router, request, response} from "express";
import Usuario from "../models/usuario.js";


export  const routerAuth = Router();

routerAuth.post("/register", async(req,res)=>{

   const data = req.body
    console.log(data)
    const usuario = await  Usuario.create(data)

    res.status(200).json({
        msg: "usuario creado",
        usuario
    })
   
})
routerAuth.post("/login", async(req,res)=>{

   const {correo,password} = req.body
   if(!correo||!password) return res.status(400).json({msg:"datos incorrectos"})
    const usuario = await  Usuario.find({correo: correo})
    if(!usuario) return res.status(404).send({msg:"usuario no encontrado"});
    if(usuario.password !== password) return res.status(400).json({msg:"contraseña incorrecta"});

    req.session.user={
        nombre:usuario.nombre,
        correo:usuario.correo
    }
    res.send({status:"logeado"})
   
})