import {database_mysql} from "../db/dbConfig.js"

import fs from "fs"

export default class Mensajes{
    constructor(nombreArchivo){


       this.nombreArchivo = nombreArchivo

      
    }

    async insert(objeto,codigoData= "") {

        const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");

        this.productos = JSON.parse(data);

        objeto.id = this.productos.length + 1
        this.productos.push(objeto)
        try {

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos))

        } catch (error) {
         console.log("no se pudo guardar", error)
        }

    }

    async getAll() {

        try {

            const data = await fs.promises.readFile(this.nombreArchivo, {encoding: "utf-8"});
            const mensajes = JSON.parse(data);

            return mensajes

        } catch (error) {
            console.log(error)
        }
    }

//    async obtenerMensajes(){
//         const mensajes = await this.database.select().table(this.tabla);

//         return mensajes
//     }

//     async guardarMensajes(data){

//         try {
            
//             const mensajes = await this.database.table(this.tabla).insert(data);

//             return mensajes
//         } catch (error) {
//             console.log(error)
//         }
        

//     }

}