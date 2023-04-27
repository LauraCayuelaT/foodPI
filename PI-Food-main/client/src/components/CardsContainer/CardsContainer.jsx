import Card from "../Card/Card";
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux";


const CardsContainer =()=>{

    const recetas = useSelector(state=>state.allRecipes);
    // const recetas = [
    //     {id:1, image: "Aqui va la imagen", title:"Lasagna Bolognesa", diets: ["paleolitics", "primal"]},
    //     {id:2, image: "Aqui va la imagen", title:"Carne asada", diets: ["lacto ovo vegetarian", "gluten free"]},
    //     {id:3, image: "Aqui va la imagen", title:"Ensalada Capresse", diets: ["paleolitics", "primal"]},
    //     {id:4, image: "Aqui va la imagen", title:"Pasta carbonara", diets: ["paleolitics", "whole 30"]},
    // ]

    //Quiero que esto que tengo escrito a mano lo traiga del estado global

    return (
        <div className={style.container}>
        {
            recetas.map(rec=> {
                return <Card 
                            key = {rec.id}    
                            id= {rec.id}
                            image = {rec.image}
                            title = {rec.title}
                            diets = {rec.diets.join(", ")} />    
                })
            
        }
        </div>
    )

}

export default CardsContainer;