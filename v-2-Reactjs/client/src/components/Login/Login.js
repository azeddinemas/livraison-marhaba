import {Link} from 'react-router-dom';
import './Login.css';

const Login = () => {
    // const [formData,setFormData] = useState(second)
  return (
    <>
       <div className="container mt-5">
        <div className="card mx-auto">
            <div className="card-header">
                <h1>marhaba</h1>
            </div>
            <form method="post" action="" className="card-body">
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input"/>
                    <label className="form-check-label">Remember me</label>
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
            <div className="card-footer">
                <Link to="/Register">Register</Link><br/>
                
                <Link to="">forget password</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login
