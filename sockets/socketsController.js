import Contenedor from "../models/Contenedor.js";
import Mensajes from "../models/Mensajes.js";

const path = "./db/productos.json"
const contenedor = new Contenedor(path, [], "productos" );

const mensajesService = new Mensajes("db/mensajes.json");

import { normalize, schema, } from 'normalizr'

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })

const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensajes)





export  const socketsController = async (client) =>{
    
    let mensajes = await  mensajesService.getAll()
    const  productos =   await contenedor.getAll()

    client.emit("productosAlBrowser", productos)
    client.emit("MensajesAlBrowser", mensajes)
    client.on("sendProducts", async (dataProducts, callback) =>{
        const  productos =   await contenedor.getAll()

        client.broadcast.emit("productosAlBrowser", productos)

        callback()
    })

    client.on("sendMensaje",async (data, callback) =>{
        
        console.log(data)
         const result = await mensajesService.insert(data);
        mensajes = await  mensajesService.getAll()
        console.log(mensajes)
         const normalizados = await listarMensajesNormalizados()
         console.log("normal", normalizados)
        client.broadcast.emit("MensajesAlBrowser", normalizados)

        callback()
    })

}

async function listarMensajesNormalizados() {
    const mensajes = await mensajesService.getAll();


    const normalizados = normalizarMensajes({ id: 'mensajes', mensajes })
    return normalizados
    
}




