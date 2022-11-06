import React, {usestate} from 'react';
import "./Register.css";
import {Link} from 'react-router-dom';
import axios from 'axios';


const Register = () => {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })
    const hadleChange = e =>{
        const {name,value}= e.target
        setUser({...user,[name]:value})
    }
  return (
    <>
    <main className="container mt-5">
        <section className="card mx-auto" id='section'>
            <div className="card-header">
                <h1>marhaba</h1>
            </div>
            <div className="card-body">
                <form method="POST">
                    <h2 className="text-center">Sign Up</h2>
                    <p className="text-center mb-4">Enter your credentials to access your account</p>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 mb-3">
                            <label className="form-label">Last name</label>
                            <input type="text" name="nom" className="form-control" placeholder="Enter your last name"/>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3">
                            <label className="form-label">first name</label>
                            <input type="text" name="prenom" className="form-control" placeholder="Enter your first name"/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" placeholder="exampl@gmail.com"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter your password"/>
                    </div>
                    <div className="">
                        <label className="form-label">Confirmer Password</label>
                        <input type="password" name="config" className="form-control" placeholder="Confirmer your password"/>
                    </div>
                    <div className="mt-4">
                        <input type="submit" value="Sign up" name="submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <p>Have already an account?<Link to="/login"> Login here</Link></p>
            </div>
        </section>
    </main>
    </>
  )
}

export default Register
