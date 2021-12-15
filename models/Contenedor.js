import { database_mysql } from "../db/dbConfig.js";

export default class Contenedor {

    constructor(nombreArchivo, productos = [], tabla) {

        this.nombreArchivo = nombreArchivo;
        this.productos = productos;

        this.database = database_mysql,
        this.tabla = tabla

    
    }

    async save(objeto) {

        try {
            
            let result = await this.database.table(this.tabla).insert(objeto)
           
            return result
        } catch (error) {
         console.log("no se pudo guardar", error)
        }
    }

    async actualizar(id, ...resto) {

        try {

             await this.database(this.tabla).update(...resto).where("id", id);

        } catch (error) {
         console.log("no se pudo guardar", error)
        }
    }
    
    async getById(id) {
        try {

            const data = await this.database.select().table(this.tabla).where("id", id).first()

            return data

        } catch (error) {
            console.log(error)
        }
    }
    
    async getAll() {

        try {

            const productos = await this.database.select().table(this.tabla)
            return productos

        } catch (error) {
            console.log(error)
        }
    }
   async deleteById(id) {

        try {

          await this.database(this.tabla).del().where("id", id)

        } catch (error) {

            console.log("no se pudo guardar", error)
        }
    }

   async deleteAll() {

        await this.database(this.tabla).del()
    }

}
