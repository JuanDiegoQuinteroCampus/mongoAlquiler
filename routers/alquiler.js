import { Router } from "express";
import con from '../db/atlas.js'
import { ObjectId } from "bson";
import { configGET } from "../middleware/limit.js";

const appAlquiler = Router();

appAlquiler.get("/get", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.find().toArray();
    res.send(result);
    
});

appAlquiler.post("/post", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    // res.send("hola");
    console.log(req.rateLimit);
    
   
    let db =await con();
    let alquiler = db.collection("alquiler");     
    try {
        const transformedData = {
            ...req.body,
            Fecha_Inicio: new Date(req.body.Fecha_Inicio),
            Fecha_Fin: new Date(req.body.Fecha_Fin)
        };
        
        let result = await alquiler.insertOne(transformedData); 
        res.send({ message: "alquiler ingresado correctamente", result });
    
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied);
        const propertiesNotSatisfied = error.errInfo.details.schemaRulesNotSatisfied;
        propertiesNotSatisfied.forEach(property => {
            console.log(`Property: ${property.operatorName}`);
            console.log(`Unsatisfied property: ${property.propertyName}`);
            console.log(`Description: ${property.description}`);
            console.log("Details:", property.details);
        });
        
        res.send({ message: "No fue posible ingresar el alquiler" });
    }
});

/* {
    "_id": 7,
    "ID_Alquiler": 7,
    "ID_Cliente_id": 8,
    "ID_Automovil_id": 8,
    "Fecha_Inicio": "2023-07-15",
    "Fecha_Fin":  "2023-07-20",
    "Costo_Total": 250.5,
    "Estado": "Retenido"
  }
 */


appAlquiler.put("/put/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let alquiler = db.collection("alquiler");     
    try {
        const updateData = {
            ...req.body,
            Fecha_Inicio: new Date(req.body.Fecha_Inicio),
            Fecha_Fin: new Date(req.body.Fecha_Fin)
        };
        let result = await alquiler.updateOne({ _id: id }, { $set: updateData }); 
        console.log(result); 
        if (result.matchedCount === 1) {
            res.send({ message: "alquiler actualizado correctamente" });
        } else {
            res.send({ message: "No se encontró el alquiler para actualizar" });
           
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible actualizar los datos del alquiler" });
    }
    
});

appAlquiler.delete("/delete/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let alquiler = db.collection("alquiler");     
    try {
        let result = await alquiler.deleteOne({ _id: id }); 
        res.send({ message: "Los datos del alquiler fueron eliminados correctamente correctamente", result});
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible eliminar los datos del alquiler" });
    }
    
});



// http://localhost:5022/alquiler/get/Disponible
// Obtener todos los automóviles disponibles para alquiler.
appAlquiler.get("/get/:Estado", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    const Estado = req.params.Estado; 

    
    let db =await con();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.find({ Estado: { $eq: Estado } }).toArray();
    res.send(result);
    
});


//Buscar un alquiler por su id
appAlquiler.get("/search/alq/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    const id = Number(req.params.id); 

    
    let db =await con();
    let alquiler = db.collection("alquiler");
    try {
        let result = await alquiler.find({ ID_Alquiler: id }).toArray();
    res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible encontrar detalles del alquiler con el ID_Alquilerespecífico" });
    
    }
    
});




// Obtener el costo total de un alquiler específico. 
appAlquiler.get("/get/costo/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    let db =await con();
    let alquiler = db.collection("alquiler");   
    try {
        let result = await alquiler.find({ID_Alquiler: {$eq:id}},{projection:{ Costo_Total:1, Estado:1}}).toArray(); 
    res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible encontrar el costo del alquiler" });
    }   
    
    
});


// Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'.

appAlquiler.get("/get/fecha/:FechaInicio", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    // 2023-08-21
    const FechaInicio = new Date(req.params.FechaInicio);
    let db =await con();
    let alquiler = db.collection("alquiler");   
    try {
        
        let result = await alquiler.find({ Fecha_Inicio: {$eq:FechaInicio}}).toArray(); 
    res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible encontrar el cliente por el DNI" });
    } 
});


// Obtener los datos de los clientes que realizaron al menos un
// alquiler.
appAlquiler.get("/get/clientes/unalq", configGET(), async (req, res) => {
    try {
        if (!req.rateLimit) {
            return;
        }

        console.log(req.rateLimit);

        let db = await con();
        let collection = db.collection("alquiler");
        let result = await collection.aggregate([
            {
                $match: {
                    alquiler: { $ne: [] }
                }
            },
            {
                $lookup: {
                    from: 'cliente',
                    localField: '_id',
                    foreignField: 'ID_Cliente',
                    as: 'alquileres'
                }
            },
        ]).toArray();

        res.send(result);
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Obtener la cantidad total de alquileres registrados en la base de datos. 
appAlquiler.get("/get/totalalquiler/cantidad", configGET(),async(req, res) => {
    if (!req.rateLimit) return; ;
    console.log(req.rateLimit);
    
    
    let db =await con();
    let alquiler = db.collection("alquiler");
    try {
        let result = await alquiler.countDocuments();
        res.send({ total: result });
    } catch (error) {
        console.log(error);
        res.send("error")
    }
    
    
});



// .Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.


appAlquiler.get("/get/alq/fecha/between/:FechaInicio/:FechaFin", configGET(), async (req, res) => {
    if (!req.rateLimit) {
        return;
    }
    console.log(req.rateLimit);
    
    const FechaInicio = new Date(req.params.FechaInicio);
    const FechaFin = new Date(req.params.FechaFin);

    let db = await con();
    let alquiler = db.collection("alquiler");
    
    try {
        let result = await alquiler.find({
            Fecha_Inicio: {
                $gte: FechaInicio,
                $lte: FechaFin
            }
        }).toArray();
        
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send("error");
    }
});

export default appAlquiler;
