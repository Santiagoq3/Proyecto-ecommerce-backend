import Contenedor from "./models/Contenedor.js";
import ServerExpress from "./models/server.js";
import cluster from "cluster"
import core from "os"

const cpusLength = core.cpus().length;

import dotenv from "dotenv"

dotenv.config()

const server = new ServerExpress();
const path = "./db/productos.json"
export const contenedor = new Contenedor(path, [] );

// if(cluster.isPrimary){

//     console.log(`estamos en modo cluster con el procesoid: ${process.pid} corriendo`)

//     for( let i = 0; i < cpusLength ; i++){

//         cluster.fork()
//     }
//     cluster.on("exit", (worker,code,signal)=>{
//         cluster.fork()
//     })
// }else{
//     console.log(`soy un worker con el procesoid: ${process.pid}`);
// }

server.listen()

export  let serverIo = server.io;



