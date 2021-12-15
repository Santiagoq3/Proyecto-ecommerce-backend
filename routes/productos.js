import {Router, request, response} from "express";

import Contenedor from "../models/Contenedor.js";

const path = "./db/productos.json"
const contenedor = new Contenedor(path, [], "productos" );

export  const router = Router();

router.get("/", async(req,res)=>{

    const productos = await contenedor.getAll()

    res.render("Productos", {
        style: "productos.css",
        productos: productos
    })

   
})

router.get("/:id", async(req,res)=>{


    let id = req.params.id
    id = Number(id)
    
   const productos = await contenedor.getById(id)

     if(productos.length === 0){
         return res.status(400).json({
             error: "no se encontro el producto"
         })
     }

    res.status(200).json({
        msg: "ok get productos por id",
        productos
    })
})

router.post("/", async(req = request,res)=>{


    let title = req.body.title
    let price = req.body.price
    let thumbnail = req.body.thumbnail
  
    // if(!title || !precio || !stock || !codigo){
    //     return res.status(400).json({
    //         msg: "el titulo, precio, stock y codigo son obligatorios"
    //     })
    // }

    console.log(title)

    const data = {
        title,
        price,
        thumbnail: "null",
        
    }

    await contenedor.save(data)

    res.status(200).json({
        msg: "Creado y guardado correctamente",
        
    })
    
})

router.put("/:id", async(req,res)=>{

    let id = req.params.id
    id = Number(id)

    const {...resto} = req.body
    
    await contenedor.actualizar(id,resto)

    res.status(200).json({
        msg: "actualizado correctamente",
       
    })
    
})

router.delete("/:id", async(req,res)=>{

    let id = req.params.id
    id = Number(id)

     await contenedor.deleteById(id)

    res.status(200).json({
        msg: " producto eliminado correctamente"
    })
    
})
