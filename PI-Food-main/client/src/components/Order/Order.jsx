import { useDispatch } from "react-redux";
// import { useState } from "react";

import { orderByHealthScore, originalOrder, orderByTitle } from "../../redux/actions";


const Order = ()=>{

    const dispatch = useDispatch()
    // const [aux, setAux] = useState(false)


    const handleChangeScore = (event)=>{
        const { value } = event.target;
        if(value==="Original Order"){
          dispatch(originalOrder())
        }
        else {dispatch(orderByHealthScore(value))}
        
        // setAux(!aux)
    }

    const handleChangeTitle = (event)=>{
      const { value } = event.target;
      if(value==="Original Order"){
        dispatch(originalOrder())
      }
      else {dispatch(orderByTitle(value))}
    }



    return(

        <div>
          <label>Orden by HealthScore     </label>  
          <select onChange={handleChangeScore}>
            <option value="Original Order">Select an Option</option>
            <option value="Menor a Mayor">smallest to largest</option>
            <option value="Mayor a Menor">largest to smallest</option>
          </select>
          <label>  Orden by title     </label>  
          <select onChange={handleChangeTitle}>
            <option value="Original Order">Select an Option</option>
            <option value="Ascendente">ascending</option>
            <option value="Descendente">descending</option>
          </select>


        </div>
    )


}

export default Order;
