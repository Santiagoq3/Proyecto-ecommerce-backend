import express from "express";
import cors from "cors"
import {engine} from "express-handlebars";
// const path = require("path")
import { createServer } from "http";
import {Server} from "socket.io";
import {socketsController}  from "../sockets/socketsController.js";
import {router} from '../routes/productos.js'

import faker from 'faker'
faker.locale = 'es'

export default class ServerExpress{
    constructor(){
        this.app  = express();
        this.PORT = 8080;


        this.middlewares()

        this.app.engine('handlebars',engine({
            defaultLayout: false,
            layoutsDir: "views/layouts",
            partialsDir: "views/partials"
        }))
        this.app.set('views','./views/layouts')
        this.app.set('view engine','handlebars')
        
        
        this.productosPath= "/api/productos"
        
        this.httpServer = createServer(this.app);
        this.io = new Server(this.httpServer, {
        // ...
        }); 

        this.routes()

        this.app.get("/", (req,res)=>{
            res.render("RegisterAndLogin.handlebars")
          
        })
        this.app.get("/main", (req,res)=>{
            res.render("Formulario.handlebars")
          
        })

 

    this.app.get('/api/productos-test', (req, res) => {
        const productosMax = 5
        const productos = []
        for (let i = 1; i <= productosMax; i++) {
            const prod = {
                id: i,
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: `${faker.image.imageUrl()}?${i}`
            }
            
            productos.push(prod)
        }
        res.json(productos)
})

        this.sockets()
    }

    middlewares(){

        this.app.use(express.json())

        this.app.use(express.static("public"))

        this.app.use(cors())

    }

    routes(){

        this.app.use(this.productosPath, router);
    
    }

    sockets(){

        this.io.on("connection", socketsController )
    }

    listen(){

        this.httpServer.listen(this.PORT, ()=>{
            console.log(`servidor conectado en el puerto ${this.PORT}`)
        })
        
    }
}



