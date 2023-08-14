import { Router } from "express";
import con from '../db/atlas.js'
import { configGET } from "../limit/limit.js";

const appResgistroEntre = Router();

appResgistroEntre.get("/get", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let registro_entrega = db.collection("registro_entrega");
    let result = await registro_entrega.find().toArray();
    res.send(result);
    
});
//! Ojo el dato a insertar Combustible_Entregado debe ser decimal
appResgistroEntre.post("/post", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let registro_entrega = db.collection("registro_entrega");
    try {
        const transformedData = {
            ...req.body,
            Fecha_Entrega: new Date(req.body.Fecha_Entrega),
            
        };
        let result = await registro_entrega.insertOne(transformedData);
        res.send({message: "El dato fue insertado correctamente",result});
    
    } catch (error) {
        console.log(error);
        res.send({message:"El dato no fue posible insertarlo"})
    }
    
});
/* {
    "_id": 6,
    "ID_Registro": 6,
    "ID_Alquiler_id": 6,
    "ID_Empleado_id": 4,
    "Fecha_Entrega": "2021-04-05",
    "Combustible_Entregado": 25.2,
    "Kilometraje_Entregado": 18000
  } */


  appResgistroEntre.put("/put/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 

    let db =await con();
    let registro_entrega = db.collection("registro_entrega");
    try {
        const updateData = {
            ...req.body,
            Fecha_Entrega: new Date(req.body.Fecha_Entrega),
            
        };
        let result = await registro_entrega.updateOne({_id: id},{ $set: updateData});
        if (result.matchedCount === 1) {
            res.send({message: "El dato fue actualizado correctamente", result});
        } else {
            res.send({ message: "No se encontró el registro_entrega para actualizar" });
           
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

appResgistroEntre.delete("/delete/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let registro_entrega = db.collection("registro_entrega");     
    try {
        let result = await registro_entrega.deleteOne({ _id: id }); 
        
        res.send({ message: "Los datos  fueron eliminados correctamente correctamente", result});

    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible eliminar los datos" });
    }
    
});
export default appResgistroEntre;
