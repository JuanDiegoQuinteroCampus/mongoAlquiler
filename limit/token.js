import 'reflect-metadata';
import {plainToClass, classToPlain } from 'class-transformer';
import dotenv from 'dotenv';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import  AlquilerDto from "../routers/storage/alquiler.js" ;
import AutomovilDto from "../routers/storage/automovil.js"
import { Error } from "../routers/storage/mongo.js";
import ClienteDTO from '../routers/storage/cliente.js';
import EmpleadoDTO from '../routers/storage/empleado.js';
import RegistroDevolucionDTO from '../routers/storage/registro_devolucion.js';
import RegistroEntregaDTO from '../routers/storage/registro_entrega.js';
import ReservaDTO from '../routers/storage/reserva.js';
import SucursalAutoDTO from '../routers/storage/sucursal_automovil.js';
import SucursalDTO from '../routers/storage/sucursal.js';



dotenv.config("../");
const appToken = Router();
const appVerify = Router();


const DTO = (p1) => {
    const match = {
      'alquiler': AlquilerDto,
      'automovil': AutomovilDto,
      'cliente': ClienteDTO,
      'empleado': EmpleadoDTO,
      'registrodevolucion': RegistroDevolucionDTO,
      'registroentrega': RegistroEntregaDTO,
      'reserva': ReservaDTO,
      'sucursalautomovil': SucursalAutoDTO,
      'sucursal': SucursalDTO, 
      'mongo': Error
    };
    const inst = match[p1];
    if(!inst) throw {status: 404, message: "Token solicitado no valido"}
    return { atributos: plainToClass(inst, {}, { ignoreDecorators: true }), class: inst}
};

appToken.use("/:collecion", async(req,res)=>{
    try {
        let inst = DTO(req.params.collecion).atributos;
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(Object.assign({}, classToPlain(inst)), process.env.JWT_SECRET_KEY);
        const jwt = await jwtconstructor
        .setProtectedHeader({alg:"HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        res.status(201).send({status: 201, message: jwt});
    } catch (error) {
        res.status(error.status).send(error);
    }
})

appVerify.use("/", async(req,res,next)=>{
    const {authorization} = req.headers;
    if (!authorization) return res.status(400).send({status: 400, token: "Token no enviado"});
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        req.data = jwtData;
        next();
    } catch (error) {
        res.status(498).send({status: 498, token: "Token caducado"});
    }
})

export {
    appToken,
    appVerify,
    DTO
};


