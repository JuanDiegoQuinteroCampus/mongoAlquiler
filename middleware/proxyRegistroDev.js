import 'reflect-metadata';
import {plainToClass, classToPlain} from 'class-transformer';
import {validate} from 'class-validator';
import { DTO } from "../limit/token.js";
import { Router } from "express";
import express from "express";
import RegistroDevolucionDTO from "../routers/storage/registro_devolucion.js"

const middlewareVerify = Router();
const DTOData = Router();
const proxyRegistroDev = express();


// Proxydto alquiler, typescript
proxyRegistroDev.use(async (req, res, next) => {
    try {
      const data = plainToClass(RegistroDevolucionDTO, req.body, { excludeExtraneousValues: true });
      const validationErrors = await validate(data);
      if (validationErrors.length > 0) {
        const errors = validationErrors.map((err) => Object.values(err.constraints));
        res.status(400).json({ message: "Validation error", errors });
      } else {
        req.body = JSON.parse(JSON.stringify(data));
        next();
      }
    } catch (error) {
      console.error("Internal server error:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });



middlewareVerify.use((req, res, next) => {
    if (!req.rateLimit) return; 

    let { payload } = req.data;
    const { iat, exp, ...newPayload } = payload;
    payload = newPayload;

    const payloadDateObjects = {
        ...payload,
        Fecha_Devolucion: new Date(payload.Fecha_Devolucion)
    };

    const Clone = {
        ...payload,
        Fecha_Devolucion: new Date(payload.Fecha_Devolucion)
    };
    console.log(payloadDateObjects);
    console.log(Clone);

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
        let data = plainToClass(DTO("registro_devolucion").class, req.body);
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
    DTOData,
    proxyRegistroDev
};