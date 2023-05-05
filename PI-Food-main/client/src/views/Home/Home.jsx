import SearchBar from "../../components/SearchBar/SearchBar";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, getAllRecipes } from "../../redux/actions";
import style from "./Home.module.css";
import Paginado from "./Paginado";


const Home = ()=>{

    const [page, setPage] = useState(1);
    const [perPage] = useState(9);
    const dispatch = useDispatch();

    const allRecipes = useSelector(state=>state.allRecipes);

    //Paginado!
    const startIndex = (page -1)*perPage;
    const endIndex = startIndex + perPage;
    const max = Math.ceil(allRecipes?.length/ perPage);
    const recipesAll = allRecipes?.slice(startIndex,endIndex);


    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getAllDiets())
    },[dispatch])



    

    return <>
        
        <div className={style.container}>
        <SearchBar />
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