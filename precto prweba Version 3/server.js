import express from "express";
import cookieParser from 'cookie-parser';
//Arreglo para dirname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { methods as authentication } from "./vistas/controlador/Aunthentication.controler.js";
import { methods as authorization } from "./vistas/middlewares/authorizacion.js";

//Server
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Configuración
app.use(express.static(__dirname + "/vistas"));
app.use(express.json());
app.use(cookieParser())

//Rutas
app.get("/",authorization.soloPublico, (req,res)=> res.sendFile(__dirname + "/vistas/login.html"));
app.get("/registro",authorization.soloPublico,(req,res)=> res.sendFile(__dirname + "/vistas/registro.html"));
app.get("/admin",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/vistas/pages/admin.html"));
app.post("/api/login",authentication.login);
app.post("/api/register",authentication.register);