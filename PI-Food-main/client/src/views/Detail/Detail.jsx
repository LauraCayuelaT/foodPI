import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeByID, deleteRecipe, nextRecipe } from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { Link } from "react-router-dom";

const Detail = ()=>{

    const dispatch = useDispatch();
    const { id } = useParams();




    useEffect(()=>{
        dispatch(getRecipeByID(id))  

        return ()=>dispatch(deleteRecipe())

    }, [id, dispatch])

    const recipe = useSelector(state=>state.recipe)

    const dietsUpperCase = recipe.diets?.map(recip=>{
        return recip.charAt(0).toUpperCase() + recip.slice(1)
    })

    const recipeSteps = recipe.steps?.map(rp=>{
        return rp.number + ". " + rp.step
    })

   
   
   
    
    return (
        <div className={style.organicer}>
            <div className={style.container}>
            <div className={style.closeButtonContainer}>
            <Link to="/home"><button className={style.closeButton}>CLOSE</button></Link>
            </div>
            <h1 className={style.title}>ID: {recipe.id}</h1>
            <img className= {style.image} src={recipe.image} alt={recipe.title} />
            <h2 className = {style.recipeName}>{recipe.title}</h2>
            <h3 className={style.subTitles}>Summary: </h3>
            <p className={style.paragraph}>{recipe.summary}</p>
            <h3 className={style.subTitles}>Steps: </h3>
            <p className={style.paragraph}>{recipeSteps?.join(", ")}</p>
            <h3 className={style.subTitles}>Diets: </h3>
            {dietsUpperCase && <p className={style.paragraph}>{dietsUpperCase.join(", ")}</p>}
            <div className={style.healthScore}>
            <h3 className={style.subTitles}>HealthScore: </h3>
            </div>
            <div>
            <p className={style.number}>{recipe.healthScore}</p>
            </div>
            
            </div> 
        </div>
    )
    
    
}

export default Detail;