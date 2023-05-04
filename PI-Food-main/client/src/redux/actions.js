import axios from "axios"

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_ID = "GET_RECIPE_ID";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_CREATOR = "FILTER_BY_CREATOR";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const RECEIP_BY_NAME = "RECEIP_BY_NAME";
export const ORIGINAL_ORDER = "ORIGINAL_ORDER"


export const getAllRecipes = ()=>{
    return async function (dispatch) {
        const recetas = await axios("/recipes");
        const allRecipes = recetas.data;
        dispatch({type: GET_ALL_RECIPES, payload: allRecipes});
    }
}

export const getRecipeByID = (id)=>{
    return async function (dispatch) {
        try {
        const receta = await axios(`/recipes/${id}`);
        const recetaID = receta.data;
        
        dispatch({type: GET_RECIPE_ID, payload: recetaID})}
        catch(err){alert(`There is no recipe with that ID ${id}` )}

    }
}

export const deleteRecipe = ()=>{
    return function (dispatch) {
    dispatch({type: DELETE_RECIPE})}
}

export const filterByDiet = (diet)=>{
    return function (dispatch) {
        dispatch({type: FILTER_BY_DIET, payload: diet})}
}

export const filterByCreator = (created)=>{
    return function (dispatch) {
        
        dispatch({type: FILTER_BY_CREATOR, payload:created})}
}

export const orderByTitle = (order)=>{
    return function (dispatch) {
        dispatch({type: ORDER_BY_TITLE, payload: order})}
}


export const orderByHealthScore = (order)=>{
    return function (dispatch) {
        dispatch({type: ORDER_BY_SCORE, payload: order})}
}

export const getAllDiets = ()=>{
    return async function (dispatch) {
        const dietas = await axios.get("/diets")
        const allDiets = dietas.data;
        dispatch({type:GET_ALL_DIETS,payload:allDiets})
    }
}

export const getRecipeByName = (name)=>{
    return async function(dispatch){
        try{
        const receta = await axios.get(`/recipes?name=${name}`)
        const recetaNombre = receta.data;
        dispatch({type: RECEIP_BY_NAME, payload: recetaNombre})}
        catch(err){alert(`There is no recipe named ${name}`)}
    }
}

export const originalOrder = ()=>{
    return function (dispatch) {
        dispatch({type: ORIGINAL_ORDER })}
}