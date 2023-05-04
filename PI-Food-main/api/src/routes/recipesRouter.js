const { Router } =require("express");
const recipesRouter = Router();
const postNewRecipe = require("../controllers/postNewRecipe");
const getRecipeByID = require("../controllers/getRecipeByID");
const getAllRecipes  = require("../controllers/getAllRecipes");
const { Recipe } = require("../db")

recipesRouter.get("/:idRecipe", async (req,res)=>{
    // Aqui vamos a ejecutar una función que se va a encargar de trar el detalle por id. Por medio de un Controller. Ya sea API o BD
    //Cuando tiene los datos, responde

    const { idRecipe } = req.params;

    try {
    const recipesID = await getRecipeByID(idRecipe)
    res.status(200).json(recipesID)
    }
    catch(err){res.status(404).json({error:err.message})}

});

recipesRouter.get("/", async (req,res)=>{

    const { name } = req.query;
    
    const allRecipes = await getAllRecipes()
    
    if(name) {
        try {
            const result = allRecipes?.filter(recip=>recip.title.toLowerCase().includes(name.toLowerCase()))

            result.length > 0 ? res.status(200).json(result) : res.status(401).send("There are no recipes with that name")
        
           }
        catch(err){res.status(404).json({error: err.message})}
    }
    
    else {return  res.status(200).json(allRecipes)};
 
});



recipesRouter.post('/', async (req,res)=>{
    try {
    const { title, image, summary, healthScore, steps, diet } = req.body;

    if(!title||!image||!summary||!healthScore||!steps||!diet) return res.status(404).json({error: "Missing data"})


    const newRecipe = await postNewRecipe({title, image, summary, healthScore, steps});

    diet.forEach(async d=>{
        await newRecipe.addDiets(d)
    })
    
    res.status(200).json(newRecipe)}
    catch(err){res.status(404).json({error:err.message})}
});




module.exports = recipesRouter;