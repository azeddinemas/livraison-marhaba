
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import { Login,Register } from "./components/index";
import {Routes,Route} from "react-router-dom";




const App = () => {
  return (
    <main>
      <Routes>
      
        <Route path="/Login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
    
      </Routes>
    </main>
  )
}

export default App
