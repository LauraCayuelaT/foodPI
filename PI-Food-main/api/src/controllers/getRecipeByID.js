const axios = require("axios")
const { API_KEY } = process.env;
const {Recipe, Diet} = require("../db")


const getRecipeByID = async(idRecipe)=>{


    const source = isNaN(idRecipe) ? "BD" : "API";

    if(source === "API"){

    const recipeByID = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`);
    
    

    return {
        id:recipeByID.data.id,
        title: recipeByID.data.title,
        image: recipeByID.data.image,
        summary: recipeByID.data.summary,
        healthScore: recipeByID.data.healthScore,
        steps: recipeByID.data.instructions,
        diets: recipeByID.data.diets
    }
  
    }

    const recipeID = await Recipe.findByPk(idRecipe,{
            include:[{
                model: Diet, 
                attributes: ["name"],
                through: {attributes:[]}
            }]});



    return recipeID;

}

module.exports = getRecipeByID;