
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import { orderByHealthScore, originalOrder, orderByTitle, updateOrder, updateTitle } from "../../redux/actions";
import style from "./Order.module.css";



const Order = ()=>{

    const dispatch = useDispatch();
    const orderSelector = useSelector(state=>state.orderSelector)
    const orderTitle = useSelector(state=>state.orderTitle)
    


    const handleChangeScore = (event)=>{
        const { value } = event.target;
        if(value==="Original Order"){
          dispatch(originalOrder())
        }
        else {
          dispatch(updateOrder(value))
          dispatch(orderByHealthScore(value))}  
    }



    const handleChangeTitle = (event)=>{
      const { value } = event.target;
      
      if(value==="Original Order"){
        dispatch(originalOrder())
      }
      else { 

        dispatch(orderByTitle(value));
        dispatch(updateTitle(value));
        }
    }

    
    const orderSelect = orderSelector===""? "Original Order" : orderSelector;
    const ordeTitle = orderTitle===""? "Original Order": orderTitle;

    

    return(

        <div >
          <select onChange={handleChangeScore}
                  className={style.list}
                  value={orderSelect}
                  >
            <option value="Original Order">Order by HealthScore</option>
            <option value="Menor a Mayor">smallest to largest</option>
            <option value="Mayor a Menor">largest to smallest</option>
          </select>
          
          <select onChange={handleChangeTitle}
                  className={style.list}
                  value={ordeTitle}
                  >
            <option value="Original Order">Order by Title</option>
            <option value="Ascendente">ascending</option>
            <option value="Descendente">descending</option>
          </select>
        </div>
    )


}

export default Order;
