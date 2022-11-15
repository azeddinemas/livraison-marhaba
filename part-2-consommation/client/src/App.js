import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import { Login,Register,Home,Navbar,Error404,Reset, Forget} from "./components/index";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';





const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/reset" element={<Reset/>}/>
        <Route path='/forget' element={<Forget/>}/>
        <Route path="*" element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
