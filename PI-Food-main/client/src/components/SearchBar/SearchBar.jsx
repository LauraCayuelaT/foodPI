import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, getAllRecipes } from "../../redux/actions";
import Filter from "../Filter/Filter";
import Order from "../Order/Order";




const SearchBar = ()=>{
    const [nombre, setNombre] = useState("")
    const dispatch = useDispatch()


    const handleChange = (event)=>{
        setNombre(event.target.value)
    }

    const onSearch = (name)=>{
        dispatch(getRecipeByName(name))

        return setNombre("")
    }

    const allRecipes = ()=>{
        dispatch(getAllRecipes())
    }

    return(
        <div>
            <input type="search" 
                   value={nombre}
                   onChange={handleChange}/>
            <button onClick={()=>onSearch(nombre)}>Search</button>
            <button onClick={()=>allRecipes()}>All Recipes</button>
            <br />
            <Filter/>
            <br />
            <Order/>
            

            
        </div>

    )
}


export default SearchBar;