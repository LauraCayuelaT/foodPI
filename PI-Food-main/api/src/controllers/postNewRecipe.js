const { Recipe, Diet } =require("../db.js")

const postNewRecipe = async (title, image, summary, healthScore, steps)=>{ 
    
    if(!title||!image||summary||healthScore||!steps) throw Error ("Faltan datos")

    const newRecipe = await Recipe.create(title, image, summary, healthScore, steps);
    
    return newRecipe;
    
}

module.exports = postNewRecipe;