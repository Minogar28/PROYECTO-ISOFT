/* const { request } = require('express'); */
const express = require("express");
const router = express.Router();

module.exports = () => {
  //index
  const indexRouter = express.Router();
  indexRouter.get("/", (req, res) => {
    res.status(200).json({ response: "Mongo API is working properly." });
  });

  const { authenticateJWT } =  require('./middlewares/authentication');


  const requestsRouter = express.Router();
  //AQUÍ REFERENCIAS A QUE CONTROLADOR TE REFIERES PARA HACER LAS RESPECTIVAS ACCIONES EN SUS MODELOS 
//   const empresasController = require("./controllers/empresas");
const loginController = require("./controllers/login"); 
 
// Aplica la validación JWT a todas las rutas debajo con authenticateJWT
  router.use('/interfaces', authenticateJWT);

  // FIN JWT
  
//login
//AQUÍ CREAS LAS RUTAS QUE USARÁS PAA HACER LAS PETICIONES AL BACKEND
requestsRouter.post("/login/insertar", loginController.insertar)

  //request
  router.use("/", indexRouter);
  router.use("/", requestsRouter);

  return router;
};
