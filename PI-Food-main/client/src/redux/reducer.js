import { GET_ALL_RECIPES, GET_RECIPE_ID, GET_ALL_DIETS, DELETE_RECIPE, RECEIP_BY_NAME, FILTER_BY_CREATOR, FILTER_BY_DIET, ORDER_BY_TITLE, ORDER_BY_SCORE, ORIGINAL_ORDER } from "./actions";


const initialState={
    allRecipes: [],
    recipes: [],
    allDiets: [],
    recipe: {}
}

const reducer =(state=initialState, action)=>{

    switch(action.type){

        case GET_ALL_RECIPES:
            return {...state, allRecipes: action.payload, recipes: action.payload}
        case GET_RECIPE_ID:
            return {...state,recipe:action.payload} 
        case GET_ALL_DIETS:
            return {...state, allDiets: action.payload}
        case DELETE_RECIPE:
            return {...state, recipe:{}}    
        case RECEIP_BY_NAME:
            return {...state, allRecipes: action.payload}
        case FILTER_BY_CREATOR:
            const createdFilter = state.recipes.filter(rec=>rec.created===action.payload);
            return {...state,allRecipes:createdFilter}              
        case FILTER_BY_DIET:
            const dietFilter = state.recipes.filter(rec=>rec.diets.includes(action.payload));
            return {...state,allRecipes:dietFilter}  
        case ORDER_BY_SCORE:
            const orderedRecipes = action.payload==="Menor a Mayor" ?
            [...state.allRecipes].sort((a,b)=>a.healthScore - b.healthScore) :
            [...state.allRecipes].sort((a,b)=>b.healthScore - a.healthScore) 
            return {...state,allRecipes:  orderedRecipes}
        case ORDER_BY_TITLE:
            const orderedRecipesTitle = action.payload==="Ascendente" ?
            [...state.allRecipes].sort((a,b)=>a.title.localeCompare(b.title)) :
            [...state.allRecipes].sort((a,b)=>b.title.localeCompare(a.title)) 
            return {...state,allRecipes:  orderedRecipesTitle}


         // users.sort(function (a, b) {
//     if (a.name < b.name) {
//       return -1;
//     }
//     if (a.name > b.name) {
//       return 1;
//     }
//     return 0;
//   });   

        case ORIGINAL_ORDER:
            return {...state, allRecipes:state.recipes}   


        default:
            return {...state}
    }

}


export default reducer;