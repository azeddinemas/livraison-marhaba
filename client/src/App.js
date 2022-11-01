import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter} from 'react-router-dom'




const App = () => {
  return (
      <BrowserRouter>
      <>
        <Login/>
        <Register/>
      </>
      </BrowserRouter>
  )
}

export default App
