'use strict'
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
app.use(cors())

global.__basedir = __dirname;

let url = 'mongodb+srv://admin:admin@contabledemo.gowqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

var bodega_routes= require('./routes/bodegaRoute');
var usuario_routes = require('./routes/usuarioRoute');
var rol_routes = require('./routes/rolRoute');
var producto_routes = require('./routes/productoRoute');
var auth_routes = require('./routes/authRoute');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//app.use(authToken);

app.use('/api', bodega_routes);
app.use('/api', usuario_routes);
app.use('/api', rol_routes);
app.use('/api', producto_routes);
app.use('/api', auth_routes);


// CONEXION A BASE DE DATOS
mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    }, function(err,res){    
    app.listen(5000, ()=>{
        console.log("Esta corriendo en puerto 5000")
    })
})