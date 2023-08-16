import { Router } from "express";
import con from '../db/atlas.js'
import { configGET } from "../limit/limit.js";
import { proxyAutomovil, middlewareVerify } from "../middleware/proxyAutomovil.js";

const appAutomovil = Router();

appAutomovil.get("/get", configGET(),  middlewareVerify,async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let alquiler = db.collection("automovil");
    let result = await alquiler.find().toArray();
    res.send(result);
    
});


appAutomovil.post("/post", configGET(),proxyAutomovil, middlewareVerify, async(req, res) => {
    if (!req.rateLimit) return; 
    // res.send("hola");
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let automovil = db.collection("automovil");     
    try {
        let result = await automovil.insertOne(req.body); 
        res.send({ message: "automovil ingresado correctamente", result });
    
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible ingresar el automovil, el id ya existe" });
    }
    
});
/* {
    "_id": 8,
    "ID_Automovil": 8,
    "Marca": "Prueb",
    "Modelo": 2022,
    "Anio": 2021,
    "Tipo": "carro",
    "Capacidad": 5,
    "Precio_Diario": 34453452525
  } */

appAutomovil.put("/put/:id", configGET(),proxyAutomovil, middlewareVerify,async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    const updateData = req.body;

    let db =await con();
    let automovil = db.collection("automovil");     
    try {
        let result = await automovil.updateOne({ _id: id }, { $set: updateData }); 
        console.log(result); 
        if (result.matchedCount === 1) {
            res.send({ message: "automovil actualizado correctamente" });
        } else {
            res.send({ message: "No se encontró el automovil para actualizar" });
           
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible actualizar los datos del automovil" });
    }
    
});



appAutomovil.delete("/delete/:id", configGET(), middlewareVerify,async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let automovil = db.collection("automovil");     
    try {
        let result = await automovil.deleteOne({ _id: id }); 
        res.send({ message: "Los datos del automovil fueron eliminados correctamente correctamente", result});
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible eliminar los datos del automovil" });
    }
    
});




// consultas

// Mostrar todos los automóviles con una capacidad mayor a 5 personas. 
appAutomovil.get("/get/capacidad/mayor", configGET(),middlewareVerify,async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let alquiler = db.collection("automovil");
    let result = await alquiler.find({Capacidad: {$gt:5}}).toArray();
    res.send(result);
    
});


// Listar todos los automóviles ordenados por marca y modelo.
appAutomovil.get("/get/orden/marca/modelo", configGET(),middlewareVerify,async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let alquiler = db.collection("automovil");
    let result = await alquiler.find({}).sort({ Marca: 1, Modelo: 1 }).toArray();
    res.send(result);
    
});


// Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
appAutomovil.get("/get/igual/cantidadPerson", configGET(),middlewareVerify,async(req, res) => {
    try {
        if (!req.rateLimit) {
            return;
        }

        console.log(req.rateLimit);

        let db = await con();
        let collection = db.collection("automovil");
        let result = await collection.aggregate([
            {
                $lookup: {
                  from: 'sucursal_automovil',
                  localField: 'ID_Automovil',
                  foreignField: 'ID_Automovil_id',
                  as: 'disponibilidad'
                }
              },
              {
                $unwind: '$disponibilidad'
              },
              {
                $match: {
                  Capacidad: 5,
                  'disponibilidad.Cantidad_Disponible': { $gt: 0 } 
                }
              },
              {
                $project: {
                  _id: 0,
                  ID_Automovil: 1,
                  Marca: 1,
                  Modelo: 1,
                  Capacidad: 1
                }
              }
        ]).toArray();

        res.send(result);
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).send("Error en el servidor");
    }
});





export default appAutomovil;
