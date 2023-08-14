import { Router } from "express";
import con from '../db/atlas.js'
/* import { configGET } from "../middleware/limit.js"; */
import { ObjectId } from "bson";
import { configGET } from "../limit/limit.js";


const appEmpleado = Router();



appEmpleado.get("/get", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 

    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let empleado = db.collection("empleado");  
    let result = await empleado.find({}).toArray(); 
    res.send(result);
    
});

appEmpleado.post("/post", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 

    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let empleado = db.collection("empleado");     
    try {
        let result = await empleado.insertOne(req.body); 
        res.send({ message: "empleado ingresado correctamente", result });
    
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible ingresar el empleado" });
    }
    
});

/* {
    "_id": 8,
    "ID_Empleado": 8,
    "Nombre": "pepito",
    "Apellido": "perez",
    "DNI": 56436,
    "Direccion": "Calle 10",
    "Telefono": 565687,
    "Cargo": "Garantias"
  }
 */


appEmpleado.put("/put/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    const updateData = req.body;

    let db =await con();
    let empleado = db.collection("empleado");     
    try {
        let result = await empleado.updateOne({ _id: id }, { $set: updateData }); 
        console.log(result); 
        if (result.matchedCount === 1) {
            res.send({ message: "empleado actualizado correctamente" });
        } else {
            res.send({ message: "No se encontró el empleado para actualizar" });
           
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible actualizar los datos del empleado" });
    }
    
});

appEmpleado.delete("/delete/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let empleado = db.collection("empleado");     
    try {
        let result = await empleado.deleteOne({ _id: id }); 
        if (result.matchedCount === 1) {
            res.send({ message: "Los datos  fueron eliminados correctamente correctamente", result});
        } else {
            res.send({ message: "No se encontró datos para eliminar" });
           
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible eliminar los datos del empleado" });
    }
    
});



// Consultas

// Listar los empleados con el cargo de "Vendedor". 
appEmpleado.get("/get/cargo", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 

    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let empleado = db.collection("empleado");  
    let result = await empleado.find({Cargo: {$eq:"Vendedor"}}).toArray(); 
    res.send(result);
    
});

// Mostrar los empleados con cargo de "Gerente" o "Asistente".
appEmpleado.get("/get/cargo/gerente/asistente", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 

    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let empleado = db.collection("empleado");  
    let result = await empleado.find({ Cargo: { $in: ["Gerente","Asistente"] } }).toArray(); 
    res.send(result);
    
});




export default appEmpleado;