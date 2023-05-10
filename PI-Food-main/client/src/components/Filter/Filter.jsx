import { useDispatch, useSelector } from "react-redux";
import { filterByCreator, filterByDiet, updateDietFilter, updateSourceFilter, resetAllRecipes } from "../../redux/actions";
import style from "./Filter.module.css"


const Filter = ({setPage})=>{

    const dispatch = useDispatch()
    const dietas = useSelector(state=>state.allDiets)
    const dietFilter = useSelector(state=>state.dietFilter)
    const sourceFilter = useSelector(state=> state.sourceFilter)

    
   
    const handleFilterByCreator= (event)=>{
        
        if(event.target.value==="AllRecipes"){
            dispatch(resetAllRecipes())
            dispatch(updateSourceFilter(""))
        }

        else if(event.target.value==="Base de Datos"){
            const created = true;
            dispatch(filterByCreator(created))
            dispatch(updateSourceFilter(created))
            setPage(1)
        }
        else{
            const created = false;
            dispatch(filterByCreator(created))
            dispatch(updateSourceFilter(created))
            setPage(1)
        }
        
    }

    const handleFilterByDiet = (event)=>{

        const {value} = event.target;

        if(value==="AllRecipes"){
            dispatch(resetAllRecipes())
            dispatch(updateDietFilter(""))
        }
        else{dispatch(filterByDiet(value))
             dispatch(updateDietFilter(value))
             setPage(1)
            }
    
    }

    const filtroSource = sourceFilter=== "" ? "AllRecipes" : sourceFilter===true ? "Base de Datos" : "API"
    const filtroDieta = dietFilter===""? "AllRecipes" : dietFilter



    return(
        <div >
           
            <select onChange={handleFilterByDiet}
                    className={style.list}
                    value= {filtroDieta}
                    
                    >
            <option value="AllRecipes">Filter by Diet</option>
                {dietas?.map(dieta=>
                    <option value={dieta.name}>{dieta.name}</option> 
                        )}
            </select>
            

            <select onChange={handleFilterByCreator}
                    className={style.list}
                    value={filtroSource}>
                <option value="AllRecipes">Filter by Source</option>
                <option value="Base de Datos">Created by User</option>
                <option value="API">Created by App</option>
            </select>
            
        </div>
    )
    


}

export default Filter;