import { Router } from "express";
import con from '../db/atlas.js'
import { ObjectId } from "bson";
import { configGET } from "../middleware/limit.js";


const appReserva = Router();


appReserva.get("/get", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let reserva = db.collection("reserva");      
    let result = await reserva.find().toArray(); 
    res.send(result);
    
});

appReserva.post("/post", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    // res.send("hola");
    console.log(req.rateLimit);
    // Lo que hace esto es darle el formato a las fechas 
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 

    const { Fecha_Reserva, Fecha_Inicio, Fecha_Fin } = req.body;

    // Aqui se valida si cumplen con el formato de las fechas establesidad en la constante dateRegex
    if (!dateRegex.test(Fecha_Reserva) || !dateRegex.test(Fecha_Inicio) || !dateRegex.test(Fecha_Fin)) {
        return res.status(400).send({ message: "Formato de fecha inválido. Utilice el formato YYYY-MM-DD" });
    }

    const transformedDate = {
        ...req.body,
        Fecha_Reserva: new Date(Fecha_Reserva),
        Fecha_Inicio: new Date(Fecha_Inicio),
        Fecha_Fin: new Date(Fecha_Fin)
    };

    let db =await con();
    let reserva = db.collection("reserva");     
    try {
        let result = await reserva.insertOne(transformedDate); 
        res.send({ message: "reserva ingresado correctamente", result });
    
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible ingresar el reserva" });
    }
    
});
/* {
    "_id": 6,
    "ID_Reserva": 6,
    "ID_Cliente_id": 1,
    "ID_Automovil_id": 1,
    "Fecha_Reserva": "2008-06-02",
    "Fecha_Inicio": "2024-02-10",
    "Fecha_Fin": "2024-02-15",
    "Estado": "Pueba"
  } */


appReserva.put("/put/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 

    const { Fecha_Reserva, Fecha_Inicio, Fecha_Fin } = req.body;

    if (!dateRegex.test(Fecha_Reserva) || !dateRegex.test(Fecha_Inicio) || !dateRegex.test(Fecha_Fin)) {
        return res.status(400).send({ message: "Formato de fecha inválido. Utilice el formato YYYY-MM-DD" });
    }

    const id = Math.floor(req.params.id); 
    const transformedDate = {
        ...req.body,
        Fecha_Reserva: new Date(Fecha_Reserva),
        Fecha_Inicio: new Date(Fecha_Inicio),
        Fecha_Fin: new Date(Fecha_Fin)
    };

    let db =await con();
    let reserva = db.collection("reserva");     
    try {
        let result = await reserva.updateOne({ _id: id }, { $set: transformedDate }); 
        console.log(result); 
        if (result.matchedCount === 1) {
            res.send({ message: "reserva actualizado correctamente" });
        } else {
            res.send({ message: "No se encontró el reserva para actualizar" });
           
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible actualizar los datos del reserva" });
    }
    
});


appReserva.delete("/delete/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let reserva = db.collection("reserva");     
    try {
        let result = await reserva.deleteOne({ _id: id }); 
        res.send({ message: "Los datos del reserva fueron eliminados correctamente correctamente", result});
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible eliminar los datos del reserva" });
    }
    
});


// Consultas Taller
// Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.

appReserva.get("/get/pendientes/dataclient", configGET(), async (req, res) => {
    try {
        if (!req.rateLimit) {
            return;
        }

        console.log(req.rateLimit);

        let db = await con();
        let collection = db.collection("reserva");
        let result = await collection.aggregate([
            {
                $match: {
                  Estado: "Pendiente",
                },
              },
              {
                $lookup: {
                  from: "cliente", 
                  localField: "ID_Cliente_id", 
                  foreignField: "_id", 
                  as: "cliente",
                },
              },
              {
                $unwind: "$cliente",
              },
              {
                $lookup: {
                  from: "automovil",
                  localField: "ID_Automovil_id", 
                  foreignField: "_id", 
                  as: "automovil",
                },
              },
              {
                $unwind: "$automovil",
              },
              {
                $project: {
                  ID_Reserva: 1,
                  Fecha_Reserva: 1,
                  Fecha_Inicio: 1,
                  Fecha_Fin: 1,
                  Estado: 1,
                  "cliente.ID_Cliente": 1,
                  "cliente.Nombre": 1,
                  "cliente.Apellido": 1,
                  "cliente.DNI": 1,
                  "cliente.Direccion": 1,
                  "cliente.Telefono": 1,
                  "cliente.Email": 1,
                  "automovil.Marca": 1,
                  "automovil.Modelo": 1,
                  "automovil.Anio": 1,
                  "automovil.Tipo": 1,
                  "automovil._id": 1,
                },
              }
        ]).toArray();

        res.send(result);
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Listar las reservas pendientes realizadas por un cliente
// específico. (3)
appReserva.get("/get/pendiente/clientespecifico/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    let db =await con();
    let alquiler = db.collection("reserva");   
    try {
        let result = await alquiler.find({ID_Cliente_id: id, Estado: 'Pendiente'}).toArray(); 
    res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible encontrar el costo del alquiler" });
    }   
    
    
});
export default appReserva;