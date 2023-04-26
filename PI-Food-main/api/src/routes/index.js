const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dietsRouter = require("./dietsRouter")
const recipesRouter = require("./recipesRouter")


const router = Router();

router.use("/diets",dietsRouter);
router.use("/recipes",recipesRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
