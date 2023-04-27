import SearchBar from "../../components/SearchBar/SearchBar";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDiets, getAllRecipes } from "../../redux/actions";




const Home = ()=>{

    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getAllDiets())
        
    },[dispatch])

    

    return <>
        <SearchBar/>
       <br />
        <h1>Food PI LC</h1>
        <CardsContainer/>

    
    </>
}

export default Home;