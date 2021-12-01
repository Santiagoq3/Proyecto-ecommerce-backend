import express from "express";
import cors from "cors"
import {engine} from "express-handlebars";
// const path = require("path")
import { createServer } from "http";
import {Server} from "socket.io";
import {socketsController}  from "../sockets/socketsController.js";
import {router} from '../routes/productos.js'

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
            res.render("Formulario.handlebars")
          
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



