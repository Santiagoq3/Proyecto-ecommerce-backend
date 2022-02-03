import { fork } from "child_process";
import {Router, request, response} from "express";


export  const routerRandom = Router();

routerRandom.get("/random", (req, res) => {

    const cant = parseInt(req.query.cant || 100000000);
  if (isNaN(cant)) {
    res.status(400).send({
      msg: "debe ingresar un numero",
    });
    return;
  }
  const random = fork("./utils/random.js", [cant]);
  random.on("message", (data) => {
    res.json({ iterations: cant, numbers: data });
  });
   
  });