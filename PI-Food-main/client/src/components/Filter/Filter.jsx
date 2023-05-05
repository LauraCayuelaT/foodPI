import { useDispatch, useSelector } from "react-redux";
import { filterByCreator, filterByDiet, getAllRecipes, updateDietFilter, updateSourceFilter } from "../../redux/actions";
import style from "./Filter.module.css"


const Filter = ()=>{

    const dispatch = useDispatch()
    const dietas = useSelector(state=>state.allDiets)
   
    const handleFilterByCreator= (event)=>{
        
        if(event.target.value==="AllRecipes"){
            dispatch(getAllRecipes())
            dispatch(updateSourceFilter(""))
        }

        else if(event.target.value==="Base de Datos"){
            const created = true;
            dispatch(filterByCreator(created))
            dispatch(updateSourceFilter(created))
        }
        else{
            const created = false;
            dispatch(filterByCreator(created))
            dispatch(updateSourceFilter(created))
        }
        
    }

    const handleFilterByDiet = (event)=>{

        const {value} = event.target;

        if(value==="AllRecipes"){
            dispatch(getAllRecipes())
            dispatch(updateDietFilter(""))
        }
        else{dispatch(filterByDiet(value))
             dispatch(updateDietFilter(value))}
        

    }


    return(
        <div >
           
            <select onChange={handleFilterByDiet}
                    className={style.list}>
            <option value="AllRecipes">Filter by Diet</option>
                {dietas?.map(dieta=>
                    <option value={dieta.name}>{dieta.name}</option> 
                        )}
            </select>

            <select onChange={handleFilterByCreator}
                    className={style.list}>
                <option value="AllRecipes">Filter by Source</option>
                <option value="Base de Datos">Created by User</option>
                <option value="API">Created by App</option>
            </select>
            
        </div>
    )
    


}

export default Filter;