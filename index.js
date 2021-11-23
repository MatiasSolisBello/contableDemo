'use strict'
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv");


//Importamos las rutas
var bodega_routes= require('./routes/bodegaRoute');
var usuario_routes = require('./routes/usuarioRoute');
var producto_routes = require('./routes/productoRoute');
var auth_routes = require('./routes/authRoute');
var upload_routes = require('./routes/uploadRoute');


//Creamos la global.__basedir para la carga masiva
global.__basedir = __dirname;

//Inicializamos la app con express
const app = express();

//Inicializamos dotenv para usar las variables de entorno del .env
dotenv.config();

//Configuraciones iniciales
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Definimos las rutas siempre después de activar cors
app.use('/api', bodega_routes);
app.use('/api', usuario_routes);
app.use('/api', producto_routes);
app.use('/api', auth_routes);
app.use('/api', upload_routes);

//Traemos la cadena conexión de MongoDB del .env
let url = process.env.ENV_LINK_BD;

// CONEXION A BASE DE DATOS
mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    }, function(err,res){    
    app.listen(process.env.ENV_PORT, ()=>{
        console.log("Esta corriendo en puerto "+ process.env.ENV_PORT)
    })
})

module.exports = app;