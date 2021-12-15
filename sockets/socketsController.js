import Contenedor from "../models/Contenedor.js";
import Mensajes from "../models/Mensajes.js";

const path = "./db/productos.json"
const contenedor = new Contenedor(path, [], "productos" );

const mensajesService = new Mensajes("mensajes");

export  const socketsController = async (client) =>{
    
    let mensajes = await  mensajesService.obtenerMensajes()
    const  productos =   await contenedor.getAll()

    client.emit("productosAlBrowser", productos)
    client.emit("MensajesAlBrowser", mensajes)
    client.on("sendProducts", async (dataProducts, callback) =>{
        const  productos =   await contenedor.getAll()

        client.broadcast.emit("productosAlBrowser", productos)

        callback()
    })

    client.on("sendMensaje",async (data, callback) =>{
        
         const result = await mensajesService.guardarMensajes(data);
        mensajes = await  mensajesService.obtenerMensajes()
        client.broadcast.emit("MensajesAlBrowser", mensajes)

        callback()
    })

}




