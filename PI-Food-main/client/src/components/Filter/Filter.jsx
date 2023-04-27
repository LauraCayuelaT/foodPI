import { useDispatch, useSelector } from "react-redux";
import { filterByCreator, filterByDiet, getAllRecipes } from "../../redux/actions";


const Filter = ()=>{

    const dispatch = useDispatch()
    const dietas = useSelector(state=>state.allDiets)
   
    const handleFilterByCreator= (event)=>{
        
        if(event.target.value==="AllRecipes"){
            dispatch(getAllRecipes())
        }

        else if(event.target.value==="Base de Datos"){
            const created = true;
            dispatch(filterByCreator(created))
        }
        else{
            const created = false;
            dispatch(filterByCreator(created))
        }
        
    }

    const handleFilterByDiet = (event)=>{

        const {value} = event.target;

        if(value==="AllRecipes"){
            dispatch(getAllRecipes())
        }
        else{dispatch(filterByDiet(value))}
        

    }


    return(
        <div>
            <label htmlFor="">Filter by diet  </label>
            <select onChange={handleFilterByDiet}>
            <option value="AllRecipes">Select an Option</option>
                {dietas?.map(dieta=>
                    <option value={dieta.name}>{dieta.name}</option> 
                        )}
            </select>
            <label htmlFor=""> Filter by source  </label>
            <select onChange={handleFilterByCreator}>
                <option value="AllRecipes">Select an Option</option>
                <option value="Base de Datos">Creada por Mi</option>
                <option value="API">Externa</option>
            </select>
        </div>
    )
    


}

export default Filter;