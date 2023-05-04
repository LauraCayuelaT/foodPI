const { Recipe} =require("../db.js")

const postNewRecipe = async (title, image, summary, healthScore, steps)=>{ 


    const newRecipe = await Recipe.create(title, image, summary, healthScore, steps);
    
    return newRecipe;
    
}

module.exports = postNewRecipe;