const { Diet } =require("../db");
const axios = require("axios");
const { getRecipeByApi } = require("./getAllRecipes");
const { API_KEY } =process.env;



const getApiDiets = async ()=>{

    const allDiets= new Set()

    const allRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const { results } = allRecipes.data

    results?.forEach(receta=> 
        { if(receta.vegetarian) receta.diets.push("vegetarian");
        receta.diets?.forEach(diet=>allDiets.add(diet))}
        );

    const apiDiets = Array.from(allDiets);



    
    
        
    return apiDiets; 
 
    

}

const getAllDiets = async()=>{

    const apiDiets = await getApiDiets();

    apiDiets.forEach(dieta=> Diet.findOrCreate({where:{name:dieta}}))

    const dietsDB = await Diet.findAll();

    return dietsDB;
}

module.exports = getAllDiets;