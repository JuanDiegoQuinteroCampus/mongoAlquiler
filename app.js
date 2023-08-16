/* import {con} from './db/atlas.js'

let db = await con(); 
console.log(db);  */
import dotenv from 'dotenv';
import express from 'express';
import appCliente from './routers/cliente.js';
import appAlquiler from './routers/alquiler.js';
import appSucursal from './routers/sucursal.js';
import appSucursalAutomovil from './routers/sucursal_automovil.js';
import appReserva from './routers/reserva.js';
import appAutomovil from './routers/automovil.js';
import appResgistroDevol from './routers/registro_devolucion.js';
import appResgistroEntre from './routers/registro_entrega.js';
import appEmpleado from './routers/empleado.js';
import { appToken, appVerify } from './limit/token.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use("/token", appToken);

app.use("/cliente", appVerify, appCliente );
app.use("/alquiler", appVerify, appAlquiler );
app.use("/sucursal", appVerify, appSucursal);
app.use("/sucursal/automovil", appVerify, appSucursalAutomovil)
app.use("/reserva", appVerify, appReserva)
app.use("/automovil", appVerify, appAutomovil )
app.use("/registrodev", appVerify, appResgistroDevol)
app.use("/registroentrega", appVerify, appResgistroEntre)
app.use("/empleado", appVerify ,appEmpleado)

const config = JSON.parse(process.env.MY_SERVER);
app.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})

