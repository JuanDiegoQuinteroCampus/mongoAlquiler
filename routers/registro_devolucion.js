import { Router } from "express";
import con from '../db/atlas.js'
import { configGET } from "../limit/limit.js";

const appResgistroDevol = Router();

appResgistroDevol.get("/get", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let registro_devolucion = db.collection("registro_devolucion");
    let result = await registro_devolucion.find().toArray();
    res.send(result);
    
});
//! Ojo el dato a insertar Combustible_Devuelto debe ser decimal
appResgistroDevol.post("/post", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let registro_devolucion = db.collection("registro_devolucion");
    try {
        const transformedData = {
            ...req.body,
            Fecha_Devolucion: new Date(req.body.Fecha_Devolucion),
            
        };
        let result = await registro_devolucion.insertOne(transformedData);
        res.send({message: "El dato fue insertado correctamente",result});
    
    } catch (error) {
        console.log(error);
        res.send({message:"El dato no fue posible insertarlo"})
    }
    
});
/* {
    "_id": 6,
    "ID_Registro": 6,
    "ID_Alquiler_id": 3,
    "ID_Empleado_id": 2,
    "Fecha_Devolucion": "2023-25-16",
    "Combustible_Devuelto": 22.4,
    "Kilometraje_Devuelto": 3454353,
    "Monto_Adicional": 15000
  } */


  appResgistroDevol.put("/put/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 

    let db =await con();
    let registro_devolucion = db.collection("registro_devolucion");
    try {
        const updateData = {
            ...req.body,
            Fecha_Devolucion: new Date(req.body.Fecha_Devolucion),
            
        };
        let result = await registro_devolucion.updateOne({_id: id},{ $set: updateData});
        if (result.matchedCount === 1) {
            res.send({message: "El dato fue insertado correctamente"});
        } else {
            res.send({ message: "No se encontró el registro_devolucion para actualizar" });
           
        }
        
    
    } catch (error) {
        console.log(error);
        res.send({message:"El dato no fue posible insertarlo"})
        if (error.name === 'MongoServerError') {
            console.error('Error:', error.message);
        
            if (error.errInfo && error.errInfo.details) {
              const { operatorName, schemaRulesNotSatisfied } = error.errInfo.details;
              console.error('Operator:', operatorName);
              console.error('Schema rules not satisfied:', schemaRulesNotSatisfied);
            }
          } else {
            console.error('Error:', error);
          }
    }
    
});

appResgistroDevol.delete("/delete/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let registro_devolucion = db.collection("registro_devolucion");     
    try {
        let result = await registro_devolucion.deleteOne({ _id: id }); 
        
        if (result.matchedCount === 1) {
            res.send({ message: "Los datos  fueron eliminados correctamente correctamente", result});
        } else {
            res.send({ message: "No se encontró datos para eliminar" });
           
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible eliminar los datos" });
    }
    
});
export default appResgistroDevol
