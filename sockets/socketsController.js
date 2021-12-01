import fs, { fstat } from "fs"
import Contenedor from "../models/Contenedor.js";
const path = "./db/productos.json"
const contenedor = new Contenedor(path, [] );

export  const socketsController = async (client) =>{
    
    let mensajes = JSON.parse(fs.readFileSync("./db/mensajes.json")) 
    const  productos =   await contenedor.getAll()
    client.emit("sendProducts", productos)

    client.on("sendMensaje", data =>{
        mensajes.push(data)
        fs.writeFileSync("./db/mensajes.json", JSON.stringify(mensajes))
        client.broadcast.emit("MensajesAlBrowser", mensajes)
    })

   
        
    
}




