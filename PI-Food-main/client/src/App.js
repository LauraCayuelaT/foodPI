import './App.css';
import { Route, useLocation} from "react-router-dom";
import { Home, Landing, Form, Detail } from "./views"
import NavBar from './components/NavBar/NavBar';

function App() {

  const location = useLocation();



  return (
    <div className="App">
      {location.pathname!=="/"&& <NavBar/>}
      <Route exact path= "/" render={()=><Landing/>}/> 
      {/* Le paso render para poder pasarle props */}
      <Route path= "/home" render={()=><Home/>}/> 
      <Route path= "/form" render={()=><Form/>}/>
      <Route path= "/detail/:id" render={()=><Detail/>}/>
      
    </div>
  );
}

export default App;
