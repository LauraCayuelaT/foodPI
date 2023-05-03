import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets} from "../../redux/actions";
import style from "./Form.module.css"



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
        image: ""
        
    })

    const [checked, setChecked] = useState(true)
    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        dispatch(getAllDiets());
        
        console.log(form.diet)
        if(form.diet&&form.diet.length>0){
            setChecked(true);
        }
        else{setChecked(false)} 

        return ()=> setChecked(true);
        

    },[form.diet])

   
    
    const allDiets = useSelector(state=>state.allDiets)

    const upperDiets = allDiets?.map(d=>{
        return {id: d.id,
            name: d.name.charAt(0).toUpperCase() + d.name.slice(1)}
    })

   
    const handleChange = (event)=>{
        
        const property = event.target.name;
        const value = event.target.value;
        
        validate({...form,[property]:value},property)
        setForm({...form,[property]:value})
        
    }
    
    const validate = (form, property)=>{
            if(form[property]){
                if(property==="healthScore" &&form[property]>100){
                    setErrors({...errors, [property]:"The score must be between 0 and 100"})
                }
                else if(property==="image"){
                    /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(form[property]) ? 
                    setErrors({...errors, [property]:""}) :
                    setErrors({...errors, [property]:"It must be an URL"})
                }
                else if(property==="title"){
                    /^[A-Z]+$/i.test(form[property]) ?
                    setErrors({...errors, [property]:""}) :
                    setErrors({...errors, [property]:"No special characters or numbers allowed"})
                }
                else{setErrors({...errors, [property]:""})}

                
            }
            else{
                setErrors({...errors, [property]:"Information needed"}) 
            }

            
            

    }

    
    

    const submitHandler = (event)=>{
        event.preventDefault();
        if(Object.keys(errors).length===0 && checked){
        axios.post("http://localhost:3001/recipes",form)
        .then(res=>alert("Creado Exitosamente"))
        .catch(err=>alert(err))}
        else{alert("Missing information or the title already exist!")}
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
        <div className={style.box}>
        <div className={style.container}>
            <form onSubmit={submitHandler}>
                <div>
                <label className={style.title}>Title: </label>  
                <br />  
                <input type="text" 
                       value={form.title}
                       onChange = {handleChange}
                       name="title"
                       className={style.input}
                       />
                <br />       
                 {errors.title && <span className={style.errores} >{errors.title}</span>}      
                </div>
                <br />
                <div>
                <label className={style.title}>Summary: </label> 
                <br /> 
                <textarea cols="30" rows="10" 
                        value={form.summary}
                        onChange = {handleChange}
                        name="summary"
                        className={style.textBox}
                       />
                 <br />
                 {errors.summary && <span className={style.errores}>{errors.summary}</span>}        
                </div>
                <br />
                <div>
                <label className={style.title}>HealthScore: </label> 
                <br /> 
                <input type = "number" 
                       value={form.value}
                       onChange = {handleChange}
                       name="healthScore"
                       min="0"
                       max="100"
                       className={style.healthBox}/>
                 <br />
                 {errors.healthScore && <span className={style.errores}>{errors.healthScore}</span>}       
                </div>
                <br />
                <div>
                <label className={style.title}>Steps: </label> 
                <br /> 
                <textarea cols="30" rows="10" 
                          value={form.steps}
                          onChange = {handleChange}
                          name="steps"
                          className={style.textBox}/>
                 <br />
                {errors.steps && <span className={style.errores}>{errors.steps}</span>}            
                </div>
                <br />
                <div>
                <label className={style.title}>Image URL: </label> 
                <br /> 
                <input type="url" 
                       value={form.image}
                       onChange = {handleChange}
                       name="image"
                       className={style.input}/>
                <br />
                {errors.image && <span className={style.errores}>{errors.image}</span>}   
                </div>
                <br />
                <div>
                    <label className={style.title}>Select Diets</label>
                    <br />
                    <div className={style.allDiets}>
                    {upperDiets.map(d=>{

                            return (
                                <>
                                <label className={style.diets}>{d.name}</label>
                                <input type="checkbox" 
                                        value={d.id}
                                        onChange={checkHandle}
                                        />
                                <br />
                                </>
                            )
                        } 
                            
                            )
                    }
                    </div>
                    <br />
                    {!checked && <span className={style.errores}>Please choose at least one diet</span>} 
                </div>
                <br />
                <button type="submit" className={style.button}>SUBMIT</button>


            </form>
        </div>
        </div>
    )


      
    
    
}

export default Form;