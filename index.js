'use strict'
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()


const cors = require('cors')
app.use(cors())

const dotenv = require('dotenv');
dotenv.config();

global.__basedir = __dirname;

let url = process.env.ENV_LINK_BD;

var bodega_routes= require('./routes/bodegaRoute');
var usuario_routes = require('./routes/usuarioRoute');
var producto_routes = require('./routes/productoRoute');
var auth_routes = require('./routes/authRoute');

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:false}))




app.use('/api', bodega_routes);
app.use('/api', usuario_routes);
app.use('/api', producto_routes);
app.use('/api', auth_routes);


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