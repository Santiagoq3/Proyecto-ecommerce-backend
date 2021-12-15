import {database} from "../db/dbConfig.js"

export default class Mensajes{
    constructor(tabla){


        this.database = database,
        this.tabla = tabla

        this.database.schema.hasTable(this.tabla)
        .then((result) =>{
            if(!result){
                this.database.schema.createTable(this.tabla, table =>{
                    table.increments();
                    table.string("email").notNullable();
                    table.string("mensaje").notNullable();
                    table.timestamps(true,true);

                })
                .then((result)=> console.log("tabla creada!"))
            }
        } )
    }

   async obtenerMensajes(){
        const mensajes = await this.database.select().table(this.tabla);

        return mensajes
    }

    async guardarMensajes(data){
        
      const mensajes = await this.database.table(this.tabla).insert(data);

      return mensajes
    }

}