import JsonWebToken from "jsonwebtoken";
import Dotenv from "dotenv";
import {usuarios} from "../controlador/Aunthentication.controler.js";
Dotenv.config();

function soloAdmin(req,res,next){
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect("/login")
  }
  
  function soloPublico(req,res,next){
    const logueado = revisarCookie(req);
    if(!logueado) return next();
    return res.redirect("/admin")
  }
  
  function revisarCookie(req){
    try{
      const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
      const decodificada = JsonWebToken.verify(cookieJWT,process.env.JWT_SECRET);
      console.log(decodificada)
      const usuarioAResvisar = usuarios.find(usuario => usuario.user === decodificada.user);
      console.log(usuarioAResvisar)
      if(!usuarioAResvisar){
        return false
      }
      return true;
    }
    catch{
      return false;
    }
  }
  
  
  export const methods = {
    soloAdmin,
    soloPublico,
  }