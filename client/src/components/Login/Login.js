import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <>
       <div className="container mt-5">
        <div className="card mx-auto">
            <div className="card-header">
                <h1>marhaba</h1>
            </div>
            <form method="post" action="" className="card-body">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="card-footer">
                <Link to="../Register/Register.js">Login</Link>
                
            </div>
        </div>
    </div>
    </>
  )
}

export default Login
