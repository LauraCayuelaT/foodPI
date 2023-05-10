const axios = require("axios")
const { API_KEY } = process.env;
const {Recipe, Diet} = require("../db")



const getRecipeByID = async(idRecipe)=>{


    const source = isNaN(idRecipe) ? "BD" : "API";

    if(source === "API"){

    const recipeByID = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`);
    
    if(recipeByID.data.vegetarian) { recipeByID.data.diets.push("vegetarian")}

    const recipeSteps = recipeByID.data.analyzedInstructions[0]?.steps.map(sp=> {return sp.number + ". " + sp.step})

    return {
        id:recipeByID.data.id,
        title: recipeByID.data.title,
        image: recipeByID.data.image,
        summary: recipeByID.data.summary.replace( /(<([^>]+)>)/ig, ''),
        healthScore: recipeByID.data.healthScore,
        // steps: recipeByID.data.instructions.replace( /(<([^>]+)>)/ig, ''),
        steps: recipeSteps.join(", "),
        diets: recipeByID.data.diets,
        vegan: recipeByID.data.vegan,
        vegetarian: recipeByID.data.vegetarian,
        glutenFree: recipeByID.data.glutenFree,
    }
  
    }
    

    const recipeID = await Recipe.findByPk(idRecipe,{
            include:[{
                model: Diet, 
                attributes: ["name"],
                through: {attributes:[]}
            }]});
            


           
            return {
                id:recipeID.id,
                title: recipeID.title,
                image: recipeID.image,
                summary: recipeID.summary,
                healthScore: recipeID.healthScore,
                steps: recipeID.steps,
                diets: recipeID.diets.map(diet=>diet.name),
                
            }

}

module.exports = getRecipeByID;