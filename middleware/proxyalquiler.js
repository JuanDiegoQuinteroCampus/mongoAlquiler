import 'reflect-metadata';
import {plainToClass, classToPlain} from 'class-transformer';
import {validate} from 'class-validator';
import { DTO } from "../limit/token.js";
import { Router } from "express";
const middlewareVerify = Router();
const DTOData = Router();


middlewareVerify.use((req, res, next) => {
    if (!req.rateLimit) return; 

    let { payload } = req.data;
    const { iat, exp, ...newPayload } = payload;
    payload = newPayload;

    // Convertir las fechas en objetos Date
    const payloadDateObjects = {
        ...payload,
        Fecha_Inicio: new Date(payload.Fecha_Inicio),
        Fecha_Fin: new Date(payload.Fecha_Fin)
    };

    // Crear un clon del DTO original con las fechas convertidas
    const Clone = {
        ...payload,
        Fecha_Inicio: new Date(payload.Fecha_Inicio),
        Fecha_Fin: new Date(payload.Fecha_Fin)
    };

    // Comparar los objetos sin espacios en blanco
    const Verify = JSON.stringify(Clone).replace(/\s+/g, '') === JSON.stringify(payloadDateObjects).replace(/\s+/g, '');

    req.data = undefined;

    if (!Verify) {
        console.log("No Autorizado");
        res.status(406).send({ status: 406, message: "No Autorizado" });
    } else {
        console.log("Autorizado");
        next();
    }
});



DTOData.use( async(req,res,next) => {
    try {
        let data = plainToClass(DTO("alquiler").class, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err)
    }
});

export {
    middlewareVerify,
    DTOData
};