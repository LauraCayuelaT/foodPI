import style from "./Paginado.module.css"

const Paginado = ({page, setPage, max}) => { 
    
    const pages = Array.from({length: max}, (_, i) => i + 1); 
    return ( <div className={style.contenedor} > 
        <button className = {style.button} disabled={page === 1} onClick={() =>{if(page>1){setPage(page-1)}}}>{"<"}</button> 
        {/* Mostrar botones para cada página */} 
        {pages.map((paginas) => ( 
        <button className = {style.button}
                key={paginas}
                onClick={() => setPage(paginas)}>{paginas} </button> ))} 
        <button className = {style.button}
                disabled={page === max? true:false} onClick={() => setPage(page + 1)}>{">"}</button> 
        </div> ) } 
    
    
    export default Paginado;