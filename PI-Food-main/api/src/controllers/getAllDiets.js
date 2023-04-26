const { Diet } =require("../db");
const axios = require("axios")
const { API_KEY } =process.env;



const getApiDiets = async ()=>{

    const allDiets= new Set()

    try {
    const allRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const { results } = allRecipes.data
    
    
    results?.forEach(receta=> 
        receta.diets?.forEach(diet=>allDiets.add(diet)));

    const apiDiets = Array.from(allDiets);
    
        
    return apiDiets; }
    catch(err){throw Error("No está haciendo el array de dietas")}
    

}

const getAllDiets = async()=>{

    const apiDiets = await getApiDiets();
    

    apiDiets.forEach(dieta=> Diet.findOrCreate({where:{name:dieta}}))

    const dietsDB = await Diet.findAll();

    return dietsDB;
}

module.exports = getAllDiets;