import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeByID, deleteRecipe } from "../../redux/actions";
import { useParams } from "react-router-dom";


const Detail = ()=>{

    const dispatch = useDispatch();
    const { id } = useParams();




    useEffect(()=>{
        dispatch(getRecipeByID(id))  

        return ()=>dispatch(deleteRecipe())

    }, [id, dispatch])

    const recipe = useSelector(state=>state.recipe)

   
    
    return (
        <div>
            <div>
            <p>{recipe.id}</p>
            <h2>{recipe.title}</h2>
            <p>Summary: {recipe.summary}</p>
            <h3>HealthScore: {recipe.healthScore}</h3>
            <p>Steps: {recipe.steps}</p>
            {recipe.diets && <p>Diets: {recipe.diets.join(", ")}</p>}
            <img src={recipe.image} alt={recipe.title} />
            </div> 
        </div>
    )
    
    
}

export default Detail;