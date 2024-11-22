/* const { request } = require('express'); */
const express = require("express");
const router = express.Router();

module.exports = () => {
  //index
  const indexRouter = express.Router();
  indexRouter.get("/", (req, res) => {
    res.status(200).json({ response: "Mongo API is working properly." });
  });

  const { authenticateJWT } = require('./middlewares/authentication');


  const requestsRouter = express.Router();
  //AQUÍ REFERENCIAS A QUE CONTROLADOR TE REFIERES PARA HACER LAS RESPECTIVAS ACCIONES EN SUS MODELOS 
  //   const empresasController = require("./controllers/empresas");
  const loginController = require("./controllers/login");
  const rolesController = require("./controllers/roles");
  const usuariosAdministrativosController = require("./controllers/usuariosAdministrativos");
  const proyectoController = require("./controllers/proyecto")

  // Aplica la validación JWT a todas las rutas debajo con authenticateJWT
  router.use('/interfaces', authenticateJWT);

  // FIN JWT
//usuariosAdministrativos
requestsRouter.post(
  "/usuariosAdministrativos/validarIngreso",
  usuariosAdministrativosController.validarIngreso
);

 //usuarios Administrativos
 requestsRouter.get("/usuariosAdministrativos/listar/:value",usuariosAdministrativosController.listar);
 requestsRouter.get("/usuariosAdministrativos/:key/:value",usuariosAdministrativosController.buscar);
 requestsRouter.post("/usuariosAdministrativos/insertar",usuariosAdministrativosController.insertar);
 requestsRouter.post("/usuariosAdministrativos/eliminar",usuariosAdministrativosController.eliminar);
 requestsRouter.post("/usuariosAdministrativos/actualizar",usuariosAdministrativosController.actualizar);
 requestsRouter.post("/usuariosAdministrativos/validarIngreso",usuariosAdministrativosController.validarIngreso);
 requestsRouter.get("/usuariosAdministrativos/listarPorIdentificacion/:value/:key",usuariosAdministrativosController.listarPorIdentificacion);
 requestsRouter.post("/usuariosAdministrativos/consultar",usuariosAdministrativosController.consultar);
 requestsRouter.post("/usuariosAdministrativos/listarUsuarioFuncionario",usuariosAdministrativosController.listarUsuarioFuncionario);
 requestsRouter.get("/usuariosAdministrativos/listarUnUsuarioAdministrativo/:value/:key",usuariosAdministrativosController.listarUnUsuario);

  //login
  //AQUÍ CREAS LAS RUTAS QUE USARÁS PAA HACER LAS PETICIONES AL BACKEND
  requestsRouter.post("/login/insertar", loginController.insertar)

   //roles
   requestsRouter.get("/roles/listar/:value", rolesController.listar);
   requestsRouter.get("/roles/:key/:value", rolesController.buscar);
   requestsRouter.post("/roles/insertar", rolesController.insertar);
   requestsRouter.post("/roles/eliminar", rolesController.eliminar);
   requestsRouter.post("/roles/actualizar", rolesController.actualizar);
   requestsRouter.post("/roles/consultar", rolesController.consultar);

  //Proyecto
 requestsRouter.get("/proyecto/listar",proyectoController.listar);
 requestsRouter.get("/proyecto/:key/:value",proyectoController.buscar);
 requestsRouter.post("/proyecto/insertar",proyectoController.insertar);
 requestsRouter.post("/proyecto/eliminar",proyectoController.eliminar);
 requestsRouter.post("/proyecto/actualizar",proyectoController.actualizar);
 requestsRouter.post("/proyecto/consultar",proyectoController.consultar);

   
  //request
  router.use("/", indexRouter);
  router.use("/", requestsRouter);

  return router;
};
