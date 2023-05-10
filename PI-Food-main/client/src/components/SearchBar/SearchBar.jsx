import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, updateName, resetInitialState, resetAllRecipes } from "../../redux/actions";
import Filter from "../Filter/Filter";
import Order from "../Order/Order";
import style from "./SearchBar.module.css"





const SearchBar = ({setPage})=>{
    const [nombre, setNombre] = useState("")
    const dispatch = useDispatch()
   
    

    const handleChange = (event)=>{
        setNombre(event.target.value)
    }

    const onSearch = (name)=>{
        
        try {
        dispatch(getRecipeByName(name));
        dispatch(updateName(name))
        setPage(1)
        }
        catch(err){window.alert("There are no recipes with that name")}

        return setNombre("")
    }

    const allRecipes = ()=>{
        dispatch(resetAllRecipes())
        dispatch(resetInitialState());
        setPage(1);
    
    }

    return(
        <div>
        <div className={style.container} >
            <input type="search" 
                   value={nombre}
                   onChange={handleChange}
                   className={style.input}/>
            <button onClick={()=>onSearch(nombre)}
                    className={style.button}>Search</button>
            <button onClick={()=>allRecipes()}
                    className={style.button} >All Recipes</button>
                    
            <span></span> 
            
         </div>  
         <div className={style.filters}>
            <Filter setPage={setPage}  />
            <Order />
        </div> 
            
        </div>

    )
}


export default SearchBar;