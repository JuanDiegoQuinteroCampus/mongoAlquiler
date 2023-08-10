/* import {con} from './db/atlas.js'

let db = await con(); 
console.log(db);  */
import dotenv from 'dotenv';
import express from 'express';
import appCliente from './routers/cliente.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use("/cliente", appCliente);


const config = JSON.parse(process.env.MY_SERVER);
app.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})

