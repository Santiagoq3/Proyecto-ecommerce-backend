import {Router, request, response} from "express";
import passport from "passport";
import Usuario from "../models/usuario.js";


export  const routerAuth = Router();

routerAuth.post("/register", async(req,res)=>{

   const data = req.body
    const usuario = await  Usuario.create(data)

    res.status(200).json({
        msg: "usuario creado",
        usuario
    })
   
})
routerAuth.post("/login", async(req = request,res)=>{

   const {correo,password} = req.body
   if(!correo||!password) return res.status(400).json({msg:"datos incorrectos"})
    const usuario = await  Usuario.find({correo: correo})
    if(!usuario) return res.status(404).send({msg:"usuario no encontrado"});
    // if(usuario.password !== password) return res.status(400).json({msg:"contraseña incorrecta", usuario,password});
    const [data] = usuario
    req.session.user={
        nombre: data.nombre,
        correo: data.correo
    }
    res.json({status:"logeado"})
   
})

routerAuth.get('/logout', (req, res) => {
    if(req.session?.user.nombre){


        req.session.destroy((err)=>{

            if(err){

            }
            res.redirect('/')
        })

    }

       
})

routerAuth.get('/currentUser',(req,res)=>{

    if (req.isAuthenticated()) return res.status(200).send(req.user)
    if (req.session) return res.status(200).send(req.session.user)
    return res.status(400).send({ status: 'Error', message: 'No hay usuario logeado.' })
    
})


routerAuth.get('/facebook',passport.authenticate("facebook",{scope:["email"]}),(req,res)=>{
})


routerAuth.get('/facebook/callback',passport.authenticate("facebook", {
    failureRedirect: "/paginadefail"
}), (req,res)=>{
    console.log(req.session)
    res.render("Formulario.handlebars")
})

