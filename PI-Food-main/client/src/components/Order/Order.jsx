import { useDispatch } from "react-redux";
// import { useState } from "react";
import { orderByHealthScore, originalOrder, orderByTitle } from "../../redux/actions";
import style from "./Order.module.css"


const Order = ()=>{

    const dispatch = useDispatch()
    


    const handleChangeScore = (event)=>{
        const { value } = event.target;
        if(value==="Original Order"){
          dispatch(originalOrder())
        }
        else {dispatch(orderByHealthScore(value))}
        
        
    }

    const handleChangeTitle = (event)=>{
      const { value } = event.target;
      if(value==="Original Order"){
        dispatch(originalOrder())
      }
      else {dispatch(orderByTitle(value))}
    }



    return(

        <div >
          <select onChange={handleChangeScore}
                  className={style.list}>
            <option value="Original Order">Order by HealthScore</option>
            <option value="Menor a Mayor">smallest to largest</option>
            <option value="Mayor a Menor">largest to smallest</option>
          </select>
          
          <select onChange={handleChangeTitle}
                  className={style.list}>
            <option value="Original Order">Order by Title</option>
            <option value="Ascendente">ascending</option>
            <option value="Descendente">descending</option>
          </select>


        </div>
    )


}

export default Order;
