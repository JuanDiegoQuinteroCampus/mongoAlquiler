import { Router } from "express";
import con from '../db/atlas.js'
/* import { configGET } from "../middleware/limit.js"; */
import { ObjectId } from "bson";
import { configGET } from "../middleware/limit.js";


const appCliente = Router();

// http://localhost:5022/cliente/get

appCliente.get("/get", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    // res.send("hola");
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let cliente = db.collection("cliente");      //projection sirve par atraer unicamente los datos especificados
    let result = await cliente.find({}, {projection: { Nombre: 1, Apellido: 1, _id: 0 }}).toArray(); 
    res.send(result);
    
});

appCliente.post("/post", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    // res.send("hola");
    console.log(req.rateLimit);
    
    let {id} = req.query ;
    let db =await con();
    let cliente = db.collection("cliente");     
    try {
        let result = await cliente.insertOne(req.body); 
        res.send({ message: "Cliente ingresado correctamente", result });
    
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible ingresar el cliente" });
    }
    
});

/* {
    "_id": 8,
    "ID_Cliente": 8,
    "Nombre": "Natalia",
    "Apellido": "Fuentes",
    "DNI": 46553,
    "Direccion": "Calleporahi",
    "Telefono": 315873905,
    "Email": "natha@gmail.com"
}
 */


appCliente.put("/put/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    const updateData = req.body;

    let db =await con();
    let cliente = db.collection("cliente");     
    try {
        let result = await cliente.updateOne({ _id: id }, { $set: updateData }); 
        console.log(result); 
        if (result.matchedCount === 1) {
            res.send({ message: "Cliente actualizado correctamente" });
        } else {
            res.send({ message: "No se encontró el cliente para actualizar" });
           
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible actualizar los datos del cliente" });
    }
    
});

appCliente.delete("/delete/:id", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const id = Math.floor(req.params.id); 
    

    let db =await con();
    let cliente = db.collection("cliente");     
    try {
        let result = await cliente.deleteOne({ _id: id }); 
        res.send({ message: "Los datos del cliente fueron eliminados correctamente correctamente", result});
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible eliminar los datos del cliente" });
    }
    
});



// consultas taller

// Listar los clientes con el DNI específico. 
appCliente.get("/get/:DNI", configGET(),async(req, res) => {
    if (!req.rateLimit) return; 
    
    console.log(req.rateLimit);
    
    const DNI = Math.floor(req.params.DNI); 
    let db =await con();
    let cliente = db.collection("cliente");   
    try {
        let result = await cliente.find({DNI: {$eq:DNI}}).toArray(); 
    res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "No fue posible encontrar el cliente por el DNI" });
    }   
    
    
});

export default appCliente;
