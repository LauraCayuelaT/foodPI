import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, getAllRecipes } from "../../redux/actions";
import Filter from "../Filter/Filter";
import Order from "../Order/Order";
import style from "./SearchBar.module.css"





const SearchBar = ()=>{
    const [nombre, setNombre] = useState("")
    const dispatch = useDispatch()


    const handleChange = (event)=>{
        setNombre(event.target.value)
    }

    const onSearch = (name)=>{
        
        try {
        dispatch(getRecipeByName(name))
        }
        catch(err){window.alert("There are no recipes with that name")}

        return setNombre("")
    }

    const allRecipes = ()=>{
        dispatch(getAllRecipes())
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
            <Filter />
            <Order />
        </div> 
            
        </div>

    )
}


export default SearchBar;