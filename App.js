import Contenedor from "./models/Contenedor.js";
import ServerExpress from "./models/server.js";

const server = new ServerExpress();
const path = "./db/productos.json"
export const contenedor = new Contenedor(path, [] );


server.listen()


export  let serverIo = server.io;


