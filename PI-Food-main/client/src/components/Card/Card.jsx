import style from "./Card.module.css";
import { Link } from "react-router-dom"

const Card = (props) => {

    
    return(
        <div className = {style.card}>
            <p>Aqui va {props.image}</p>
            <Link to = {`/detail/${props.id}`}>
            <h2>{props.title}</h2>
            </Link>
            <h3>Dietas: {props.diets}</h3>
        </div>
    )
}

export default Card;