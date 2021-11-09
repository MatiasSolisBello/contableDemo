"use strict";
var Role = require("../modelos/rol.js");

/*-------------GUARDAR ROL-------------*/
function guardar(req, res) {
  let role = new Role();
  role.nombre = req.body.nombre, 
  role.descripcion = req.body.descripcion;
  role.save((err, rolstore) => {
    if (err) res.status(500).send(`Error base de datos> ${err}`);
    res.status(200).send({ role: rolstore });
  });
}

/*-------------BUSCAR ROL-------------*/
function buscar(req, res) {
  Role.find({}, (err, role) => {
    if (!role)
      return res.status(404).send({ message: "Error role no existe" });
      res.status(200).send({ role });
  });
}

/*-------------ACTUALIAR ROL-------------*/
function editar(req, res) {
  let rolId = req.params.id;
  let update = req.body;
  Role.findByIdAndUpdate(rolId, update, { new: true }, (err, rolupdated) => {
    if (err) return res.status(500).send({ 
      message: "Error en el servidor"
    });

    if (rolupdated) {
      return res.status(200).send({
        role: rolupdated,
      });
    } else {
      return res.status(404).send({
        message: "No existe el rol",
      });
    }
  });
}

/*-------------ELIMINAR ROL-------------*/
function borrar(req, res) {
  let rolId = req.params.id;
  Role.findByIdAndRemove(rolId, (err, rolRemoved) => {
    if (err) return res.status(500).send({ 
      message: "Error en el servidor" 
    });

    if (rolRemoved) {
      return res.status(200).send({
        rol: rolRemoved,
      });
    } else {
      return res.status(404).send({
        message: "No existe el rol",
      });
    }
  });
}

// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
  guardar,
  buscar,
  editar,
  borrar,
};
