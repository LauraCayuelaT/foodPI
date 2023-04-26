

const initialState={
    recipes: [

                {id:1, image: "Aqui va la imagen", title:"Lasagna Bolognesa", diets: ["paleolitics", "primal"]},
                {id:2, image: "Aqui va la imagen", title:"Carne asada", diets: ["lacto ovo vegetarian", "gluten free"]},
                {id:3, image: "Aqui va la imagen", title:"Ensalada Capresse", diets: ["paleolitics", "primal"]},
                {id:4, image: "Aqui va la imagen", title:"Pasta carbonara", diets: ["paleolitics", "whole 30"]},
            
    ]
}

const reducer =(state=initialState, action)=>{

    switch(action.type){

        default:
            return {...state}
    }

}


export default reducer;