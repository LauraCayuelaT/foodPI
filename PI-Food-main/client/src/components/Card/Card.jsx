import style from "./Card.module.css";
import { Link } from "react-router-dom"

const Card = (props) => {

    
    return(
        <div className = {style.card}>
           <img className = {style.image}src={props.image} alt={props.title}/>
            <Link to = {`/detail/${props.id}`}>
            <h2 className={style.recipeTitle}>{props.title}</h2>
            </Link>
            <h3 className={style.diets}>Diets: {props.diets}</h3>
        </div>
    )
}

export default Card;