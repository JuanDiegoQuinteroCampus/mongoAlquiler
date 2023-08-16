import { Router } from "express";
import con from '../db/atlas.js'
import { ObjectId } from "bson";
import { configGET } from "../limit/limit.js";
import { middlewareVerify, proxySucursalAuto } from "../middleware/proxySucursalAuto.js";


const appSucursalAutomovil = Router();


appSucursalAutomovil.get("/get", configGET(),middlewareVerify,async(req, res) => {
    if (!req.rateLimit) return; 
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let sucursal_automovil = db.collection("sucursal_automovil");      
    let result = await sucursal_automovil.find().toArray(); 
    res.send(result);
    
});

appSucursalAutomovil.post("/post", configGET(),proxySucursalAuto,middlewareVerify,async(req, res) => {
    if (!req.rateLimit) return; 
    // res.send("hola");
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let sucursal_automovil = db.collection("sucursal_automovil");     
    try {
        let result = await sucursal_automovil.insertOne(req.body); 
        res.send({ message: "sucursal_automovil ingresado correctamente", result });
    
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible ingresar el sucursal_automovil" });
    }
    
});
/* {
    "_id": 6,
    "ID_Sucursal_id": 3,
    "ID_Automovil_id": 4,
    "Cantidad_Disponible": 1
  } */


  appSucursalAutomovil.put("/put/:id", configGET(),proxySucursalAuto,middlewareVerify,async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    const updateData = req.body;

    let db =await con();
    let sucursal_automovil = db.collection("sucursal_automovil");     
    try {
        let result = await sucursal_automovil.updateOne({ _id: id }, { $set: updateData }); 
        console.log(result); 
        if (result.matchedCount === 1) {
            res.send({ message: "sucursal_automovil actualizado correctamente" });
        } else {
            res.send({ message: "No se encontró el sucursal_automovil para actualizar" });
           
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible actualizar los datos del sucursal_automovil" });
    }
    
});


appSucursalAutomovil.delete("/delete/:id", configGET(),middlewareVerify,async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let sucursal_automovil = db.collection("sucursal_automovil");     
    try {
        let result = await sucursal_automovil.deleteOne({ _id: id }); 
        res.send({ message: "Los datos del sucursal_automovil fueron eliminados correctamente correctamente", result});
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible eliminar los datos del sucursal_automovil" });
    }
    
});





export default appSucursalAutomovil