import 'reflect-metadata';
import {plainToClass, classToPlain} from 'class-transformer';
import {validate} from 'class-validator';
import { DTO } from "../limit/token.js";
import { Router } from "express";
import express from "express";
import EmpleadoDTO from '../routers/storage/empleado.js';

const middlewareVerify = Router();
const DTOData = Router();

const proxyEmpleado = express();


proxyEmpleado.use(async (req, res, next) => {
    try {
      const data = plainToClass(EmpleadoDTO, req.body, { excludeExtraneousValues: true });
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



middlewareVerify.use((req,res,next) => {
    if(!req.rateLimit) return; 
    if (req.data && req.data.payload) {
    let {payload} = req.data;
    const { iat, exp, ...newPayload } = payload;
    payload = newPayload;
    console.log(payload);
    let Clone = JSON.stringify(classToPlain(plainToClass(DTO("empleado").class, {}, { ignoreDecorators: true })));
    console.log(Clone);
    let Verify = Clone === JSON.stringify(payload);
    
    if (!Verify) {
        return res.status(406).send({ status: 406, message: "No Autorizado" });
    }
}

next();
});

DTOData.use( async(req,res,next) => {
    try {
        let data = plainToClass(DTO("empleado").class, req.body);
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
    proxyEmpleado
};