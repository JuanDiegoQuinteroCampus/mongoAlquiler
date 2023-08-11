import { Router } from "express";
import con from '../db/atlas.js'
import { ObjectId } from "bson";
import { configGET } from "../middleware/limit.js";

const appSucursal = Router();

appSucursal.get("/get", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let sucursal = db.collection("sucursal");
    let result = await sucursal.find().toArray();
    res.send(result);
    
});


appSucursal.post("/post", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let sucursal = db.collection("sucursal");
    try {
        let result = await sucursal.insertOne(req.body);
        res.send({message:"La sucursal ingresada a sidoingresada correctamente",result});
    } catch (error) {
        console.log(error);
        res.send({message:"La sucursal no a sido ingresada correctamente"})
    }
    
    
});
/* {
    "_id": 7,
    "sucursal_id": 7,
    "Nombre": "Polo",
    "Direccion": "ALlamar",
    "Telefono": [35938502]
  } */



  appSucursal.put("/put/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    const updateData = req.body;

    let db =await con();
    let sucursal = db.collection("sucursal");     
    try {
        let result = await sucursal.updateOne({ _id: id }, { $set: updateData }); 
        console.log(result); 
        if (result.matchedCount === 1) {
            res.send({ message: "sucursal actualizado correctamente" });
        } else {
            res.send({ message: "No se encontró el sucursal para actualizar" });
           
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible actualizar los datos del sucursal" });
    }
    
});



appSucursal.delete("/delete/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let sucursal = db.collection("sucursal");     
    try {
        let result = await sucursal.deleteOne({ _id: id }); 
        res.send({ message: "Los datos del sucursal fueron eliminados correctamente correctamente", result});
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible eliminar los datos del sucursal" });
    }
    
});




// Consultas

// Mostrar la cantidad total de automóviles disponibles en cada
// sucursal. 
appSucursal.get("/get/automoviles/disponibles", configGET(), async (req, res) => {
    try {
        if (!req.rateLimit) {
            return;
        }

        console.log(req.rateLimit);

        let db = await con();
        let collection = db.collection("sucursal");
        let result = await collection.aggregate([
            {
                $lookup: {
                  from: 'sucursal_automovil', 
                  localField: 'sucursal_id', 
                  foreignField: 'ID_Sucursal_id', 
                  as: 'automoviles' 
                }
              },
              {
                $addFields: {
                  cantidad_total_automoviles: { $sum: "$automoviles.Cantidad_Disponible" }
                }
              },
              {
                $project: {
                  _id: 0,
                  sucursal_id: 1,
                  Nombre: 1,
                  Direccion: 1,
                  Telefono: 1,
                  cantidad_total_automoviles: 1
                }
              }
        ]).toArray();

        res.send(result);
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).send("Error en el servidor");
    }
});


// Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.
appSucursal.get("/get/automoviles/total/direccion", configGET(), async (req, res) => {
    try {
        if (!req.rateLimit) {
            return;
        }

        console.log(req.rateLimit);

        let db = await con();
        let collection = db.collection("sucursal");
        let result = await collection.aggregate([
            {
                $lookup: {
                  from: 'sucursal_automovil', 
                  localField: 'sucursal_id', 
                  foreignField: 'ID_Sucursal_id', 
                  as: 'automoviles'
                }
              },
              {
                $project: {
                  _id: 0,
                  Nombre: 1, 
                  Direccion: 1, 
                  Cantidad_Automoviles: { $size: '$automoviles' } 
                }
              }
        ]).toArray();

        res.send(result);
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).send("Error en el servidor");
    }
});

export default appSucursal;
