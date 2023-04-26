const { Router } = require("express");
const dietsRouter = Router();
const getAllDiets = require("../controllers/getAllDiets")

dietsRouter.get("/", async (req,res)=>{

    try {
    const allDiets = await getAllDiets();
    res.status(200).json(allDiets)}
    catch(err){res.status(400).json({error:err.message})}
})

module.exports = dietsRouter;