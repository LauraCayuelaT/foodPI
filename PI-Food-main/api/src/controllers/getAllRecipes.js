const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");


const getRecipeByApi = async () =>{

    const recipesAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

    const { results } = recipesAPI.data;

    

    const arrayAPI =  results?.map((recip =>{
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
    

    return arrayAPI;
    
}

const getRecipeByBD = async()=>{
    
        const recipeBD = await Recipe.findAll({
            attributes: ["id", "title", "summary", "healthScore", "steps", "image"],
            include: { model: Diet },
        });

        
    
        return await recipeBD.map(rec => {
            return {
                id: rec.dataValues.id,
                title: rec.dataValues.title,
                summary: rec.dataValues.summary,
                healthScore: rec.dataValues.healthScore,
                steps: rec.dataValues.steps,
                image: rec.dataValues.image,
                diets: rec.dataValues.diets.map((y) => y.name),
            };
        });
    };

   
  const getAllRecipes = async() =>{

    const bd = await getRecipeByBD();
    const api = await getRecipeByApi();
    const allRecipes = [...api,...bd];

    return allRecipes;


  }  
   





module.exports = {getAllRecipes, getRecipeByApi, getRecipeByBD}