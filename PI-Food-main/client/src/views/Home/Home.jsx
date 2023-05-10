import SearchBar from "../../components/SearchBar/SearchBar";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCreator, filterByDiet, getAllDiets, getAllRecipes, updateOrder, updateTitle } from "../../redux/actions";
import style from "./Home.module.css";
import Paginado from "./Paginado";


const Home = ()=>{

    const [page, setPage] = useState(1);
    const [perPage] = useState(9);
    const dispatch = useDispatch();

    const allRecipes = useSelector(state=>state.allRecipes);
    const dietFilter = useSelector(state=>state.dietFilter);
    const sourceFilter = useSelector(state=>state.sourceFilter);

    //Paginado!
    const startIndex = (page -1)*perPage;
    const endIndex = startIndex + perPage;
    const max = Math.ceil(allRecipes?.length/ perPage);
    const recipesAll = allRecipes?.slice(startIndex,endIndex);


    useEffect(()=>{
        //Si hay filtros que me traiga filtrado, si no que me traiga todas las recetas
        if(dietFilter){
            dispatch(filterByDiet(dietFilter))
        } 
        else if(sourceFilter) {
            dispatch(filterByCreator(sourceFilter))
        }
        else { dispatch(getAllRecipes())}

        
        dispatch(getAllDiets());
        dispatch(updateOrder(""));
        dispatch(updateTitle(""));
        
    },[dispatch])



    

    return <>
        
        <div className={style.container}>
        <SearchBar setPage={setPage}/>
        <br />
        <h1 className= {style.title}>RECIPES</h1>
        <footer>
            <Paginado page={page} setPage = {setPage} max= {max}/>
        </footer>
        <CardsContainer recipesAll = {recipesAll}/>
        </div>

       
  
    </>
}

export default Home;