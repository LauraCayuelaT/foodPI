import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets } from "../../redux/actions";



const Form = ()=>{
    
    const [form, setForm] = useState({
        title:"",
        summary: "",
        healthScore:"",
        steps: "",
        image: "",
        diet: []
        
    })
    
    const [errors,setErrors] = useState({
        title:"",
        summary: "",
        healthScore:"",
        steps: "",
        image: "",
        diet: "",
        
    })

    const [checked, setChecked] = useState(true)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getAllDiets())  

    },[dispatch])

    useEffect(()=>{
        if(form.diet.length>0){
            setChecked(true);
        } else {setChecked(false)}
    },[form.diet])
    
    const allDiets = useSelector(state=>state.allDiets)
    
    
    
    const handleChange = (event)=>{
        
        const property = event.target.name;
        const value = event.target.value;
        
        validate({...form,[property]:value},property)
        setForm({...form,[property]:value})
        
    }
    
    const validate = (form, property)=>{
    

            if(form[property]){
                
                setErrors({...errors, [property]:""})
            }
            else{
                setErrors({...errors, [property]:"Campo obligatorio"}) 
            }

    }

    const submitHandler = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:3001/recipes",form)
        .then(res=>alert("Creado Exitosamente"))
        .catch(err=>alert(err))
    }

    const checkHandle = (event)=>{

        const { value, checked } = event.target;
        if(checked){
            setForm({...form, diet:[...form.diet,value]})}
        else{
            const filtredDiets = form.diet.filter(d=>d!==value)
            setForm({...form, diet: filtredDiets })}    
        
        }
    



    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                <label htmlFor="">Title: </label>  
                <br />  
                <input type="text" 
                       value={form.title}
                       onChange = {handleChange}
                       name="title"
                       />
                <br />       
                 {errors.title && <span>{errors.title}</span>}      
                </div>
                <br />
                <div>
                <label htmlFor="">Summary: </label> 
                <br /> 
                <textarea cols="30" rows="10" 
                        value={form.summary}
                        onChange = {handleChange}
                        name="summary"
                       />
                 <br />
                 {errors.summary && <span>{errors.summary}</span>}        
                </div>
                <br />
                <div>
                <label htmlFor="">HealthScore: </label> 
                <br /> 
                <input type = "number" 
                       value={form.value}
                       onChange = {handleChange}
                       name="healthScore"/>
                 <br />
                 {errors.healthScore && <span>{errors.healthScore}</span>}       
                </div>
                <br />
                <div>
                <label htmlFor="">Steps: </label> 
                <br /> 
                <textarea cols="30" rows="10" 
                          value={form.steps}
                          onChange = {handleChange}
                          name="steps"
                            />
                 <br />
                {errors.steps && <span>{errors.steps}</span>}            
                </div>
                <br />
                <div>
                <label htmlFor="">Image URL: </label> 
                <br /> 
                <input type="url" 
                       value={form.image}
                       onChange = {handleChange}
                       name="image"/>
                <br />
                {errors.image && <span>{errors.image}</span>}   
                </div>
                <br />
                <div>
                    <label htmlFor="">Select Diets</label>
                    <br />
                    {allDiets.map(d=>{

                            return (
                                <>
                                <label>{d.name}</label>
                                <input type="checkbox" 
                                        value={d.id}
                                        onChange={checkHandle}/>
                                <br />
                                </>
                            )
                        } 
                            
                            )
                    }
                    <br />
                    {!checked && <span>"Por favor seleccionar al menos una dieta"</span>} 
                </div>
                <br />
                <button type="submit">SUBMIT</button>


            </form>
        </div>
    )


      
    
    
}

export default Form;