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
export const ORIGINAL_ORDER = "ORIGINAL_ORDER";
export const NEXT_RECIPE = "NEXT_RECIPE";
export const UPTADE_DIETFILTER = "UPTADE_DIETFILTER";
export const UPTADE_SOURCEFILTER = "UPTADE_SOURCEFILTER";
export const UPTADE_ORDER = "UPTADE_ORDER";
export const UPTADE_TITLE="UPTADE_TITLE";
export const UPTADE_NAME="UPTADE_NAME";
export const RESET_STATE = "RESET_STATE";
export const RECET_ALLRECIPES = "RECET_ALLRECIPES"

//Traer todas las recetas y guardarlas tanto en allRecipes como en recipes para tomar de ahí el resto de la info
export const getAllRecipes = ()=>{
    return async function (dispatch) {
        const recetas = await axios("/recipes");
        const allRecipes = recetas.data;
        dispatch({type: GET_ALL_RECIPES, payload: allRecipes});
    }
}

//Esta action lo que va a hacer en vez de volver a llamar al back es la info de recetas guardarla en allRecipes para resetear todo

export const resetAllRecipes =()=>{
    return async function(dispatch){
        dispatch({type: RECET_ALLRECIPES})
    }
}

//Traigo del back la info por receta
export const getRecipeByID = (id)=>{
    return async function (dispatch) {
        try {
        const receta = await axios(`/recipes/${id}`);
        const recetaID = receta.data;
        
        dispatch({type: GET_RECIPE_ID, payload: recetaID})}
        catch(err){alert(`There is no recipe with that ID ${id}` )}

    }
}

//Lo uso para resetear el estado cuando el detalle se desmonte así no me queda la info y cuando pida otro detalle no muestre el anterior
export const deleteRecipe = ()=>{
    return function (dispatch) {
    dispatch({type: DELETE_RECIPE})}
}


//FILTROS
export const filterByDiet = (diet)=>{
    return function (dispatch) {
        dispatch({type: FILTER_BY_DIET, payload: diet})}
}

export const filterByCreator = (created)=>{
    return function (dispatch) {
        
        dispatch({type: FILTER_BY_CREATOR, payload:created})}
}

//ORDEN

export const orderByTitle = (order)=>{
    return function (dispatch) {
        dispatch({type: ORDER_BY_TITLE, payload: order})}
}


export const orderByHealthScore = (order)=>{
    return function (dispatch) {
        dispatch({type: ORDER_BY_SCORE, payload: order})}
}

//Guardo las dietas en el estado inicial

export const getAllDiets = ()=>{
    return async function (dispatch) {
        const dietas = await axios.get("/diets")
        const allDiets = dietas.data;
        dispatch({type:GET_ALL_DIETS,payload:allDiets})
    }
}

//Voy al back para la info por nombre

export const getRecipeByName = (name)=>{
    return async function(dispatch){
        try{
        const receta = await axios.get(`/recipes?name=${name}`)
        const recetaNombre = receta.data;
        dispatch({type: RECEIP_BY_NAME, payload: recetaNombre})}
        catch(err){alert(`There is no recipe named ${name}`)}
    }
}

//Resetear el orden con los primeros options

export const originalOrder = ()=>{
    return function (dispatch) {
        dispatch({type: ORIGINAL_ORDER })}
}


// Esto lo uso para poder usarlo en el Select y que se me resetee cuando quite los filtros. También para que si tengo un filtro activado se guarde en este estado

export const updateDietFilter = (diet)=>{
    return function (dispatch) {
        dispatch({type: UPTADE_DIETFILTER, payload: diet })}

}

export const updateSourceFilter = (source)=>{
    return function (dispatch) {
        dispatch({type: UPTADE_SOURCEFILTER, payload: source })}
}

export const updateOrder = (score)=>{
    return function (dispatch) {
        dispatch({type: UPTADE_ORDER, payload: score })}
}
export const updateTitle = (order)=>{
    return function (dispatch) {
        dispatch({type: UPTADE_TITLE, payload: order })}
}

export const updateName = (name)=>{
    return function (dispatch) {
        dispatch({type: UPTADE_NAME, payload: name })}
}

export const resetInitialState = ()=>{
    return function(dispatch){
        dispatch({type: RESET_STATE})
    }
}

