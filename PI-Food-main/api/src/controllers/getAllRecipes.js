const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");



const getAllRecipes = async()=>{

    const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const {results} = recipesApi.data;
    const arrayAPI =  results?.map((recip =>{

                if(recip.vegetarian){
                    recip.diets.push("vegetarian")
                }
        
                return {
                    id:recip.id,
                    title: recip.title,
                    image: recip.image,
                    summary: recip.summary,
                    healthScore: recip.healthScore,
                    steps: recip.instructions,
                    diets: recip.diets.map(diet=>diet),
                    created: false
                }
            }))

    const recipeBD = await Recipe.findAll({
                   include: { model: Diet },
                        }); 

    const arrayBD = recipeBD.map(rec => {
                    return {
                        id: rec.dataValues.id,
                        title: rec.dataValues.title,
                        summary: rec.dataValues.summary,
                        healthScore: rec.dataValues.healthScore,
                        steps: rec.dataValues.steps,
                        image: rec.dataValues.image,
                        diets: rec.dataValues.diets.map((dieta) => dieta.name),
                        created: rec.dataValues.created
                    }})
    
    return [...arrayAPI,...arrayBD]                    


}

module.exports= getAllRecipes;