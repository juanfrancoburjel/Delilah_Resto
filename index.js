//Configuracion del servidor

const express = require ('express');
const app = express ();
const bodyParser = require ("body-parser");

app.listen(3000, ()=>{
    console.log ("Servidor iniciado...")
});

app.use(bodyParser.json());


//RUTAS

// 1) Usuarios
    
app.use ('/usuarios', require ('./Rutas/usuarios.js'));


// 2) Productos

app.use ('/productos', require ('./Rutas/productos.js'));


// 3) Ordenes

app.use ('/ordenes', require ('./Rutas/ordenes.js'));
