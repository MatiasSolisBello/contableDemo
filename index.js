'use strict'
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv");
const path = require('path');


//Importamos las rutas
const bodega_routes= require('./routes/bodegaRoute');
const usuario_routes = require('./routes/usuarioRoute');
const producto_routes = require('./routes/productoRoute');
const auth_routes = require('./routes/authRoute');
const payment_routes = require('./routes/paymentRoute');

//Inicializamos la app con express
const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));

// Este middleware SOLO interpreta JSON, no afecta FormData
app.use(express.json());

//Inicializamos dotenv para usar las variables de entorno del .env
dotenv.config();

//Creamos la __dirname para mostrar html de paypal
app.use(express.static(path.join(__dirname, 'public')));

//Configuraciones iniciales
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//Definimos las rutas siempre después de activar cors
app.use('/api', bodega_routes);
app.use('/api', usuario_routes);
app.use('/api', producto_routes);
app.use('/api', auth_routes);
app.use('/api', payment_routes);

//carpeta uploads
app.use('/uploads', express.static('uploads'));

//Traemos la cadena conexión de MongoDB del .env
let url = process.env.ENV_LINK_BD;

// CONEXION A BASE DE DATOS
mongoose.connect(url, {
    useNewUrlParser:true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    }, function(err,res){    
    app.listen(process.env.ENV_PORT, ()=>{
        console.log("Esta corriendo en puerto "+ process.env.ENV_PORT)
    })
})

module.exports = app;