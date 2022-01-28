import express from "express";
import cors from "cors"
import {engine} from "express-handlebars";
// const path = require("path")
import { createServer } from "http";
import {Server} from "socket.io";
import {socketsController}  from "../sockets/socketsController.js";
import {router} from '../routes/productos.js'
import { routerAuth } from "../routes/auth.js";

import mongoose from 'mongoose'


import session from "express-session";
import MongoStore from "connect-mongo";


import faker from 'faker'
import { verificarLogeado } from "../middlewares/verficarLogeado.js";
import passport from "passport";
import initializePassportConfig from "../passport.config.js";
faker.locale = 'es'

export default class ServerExpress{
    constructor(){
        this.app  = express();
        this.PORT = 8080;

        this.productosPath= "/api/productos"
        this.authPath= "/api/auth"

        
        this.baseSession = (session({
            store:MongoStore.create({mongoUrl: process.env.MONGODB_SESSIONS}),
            resave:false,
            saveUninitialized:false,
            secret:"CoderChat",
            cookie: {
                maxAge: 120000
            }
        }))

        this.conectarBaseDeDatos()
        this.passport()
        this.middlewares()


        this.app.engine('handlebars',engine({
            defaultLayout: false,
            layoutsDir: "views/layouts",
            partialsDir: "views/partials"
        }))
        this.app.set('views','./views/layouts')
        this.app.set('view engine','handlebars')
        
        
        
        this.httpServer = createServer(this.app);
        this.io = new Server(this.httpServer, {
        // ...
        }); 

        this.routes()

        this.app.get("/", (req,res)=>{
            res.render("RegisterAndLogin.handlebars")
          
        })
        this.app.get("/main", verificarLogeado,(req,res)=>{
            console.log(req.session)
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

        this.app.use(this.baseSession);

        this.app.use(passport.initialize())

        this.app.use(passport.session())

    }

    passport(){
        initializePassportConfig()
    }

    async conectarBaseDeDatos(){

        
        try {
                await mongoose.connect(process.env.MONGODB_CNN, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                console.log("Base de datos conectada a mongodb");
            }catch (error) {
                console.log(error);
                throw new Error('error en la base de datos')
            }
                
           
    }
        
 
        
    

    routes(){

        this.app.use(this.productosPath, router);
        this.app.use(this.authPath, routerAuth);
    
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



