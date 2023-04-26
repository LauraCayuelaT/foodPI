import {Link} from "react-router-dom";
import style from "./NavBar.module.css";


const NavBar = ()=>{
    return (
    <div className={style.mainContainer}>
        <Link to="/"><button>LANDING</button></Link>
        <Link to="/home"><button>HOME</button></Link>
        <Link to="/form"><button>FORM</button></Link>

    </div>
    )
}

export default NavBar;