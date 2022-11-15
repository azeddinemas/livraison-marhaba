import {useState} from 'react';
import "./Register.css";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name:"",
        prenom:"",
        email:"",
        password:"",
        password2:""
    })

    const handelChange = e =>{
        setFormData({...formData, [e.target.name] : e.target.value})          
    }

    // const regex = `^([a-z0-9]+(@gmail.com))$`;
    const onSubmit = e=>{
        e.preventDefault()
        if (formData.name.trim() !=='') {
            if (formData.prenom.trim() !== '') {
                if (formData.email.trim()!=='') {
                    if (formData.password.trim() !=='') {
                        if (formData.password2.trim() !=='') {
                            if (formData.password === formData.password2) {
                                axios.post('http://localhost:7000/api/auth/register',{...formData}).then((data)=>{
                                    // toast.success(data.data)
                                    navigate('/login',{regested : data.data}) 
                                }).catch(erro=>{
                                    toast.warning(erro.response.data)
                                })
                            }else{toast.warning('Please votre confirmation password incorrect.')}
                        }else{toast.error('Please choose a confirm password.')}
                    }else{toast.error('Please choose a password.')}
                }else{toast.error('Please choose a E-mail.')}
            }else {toast.error('Please choose a firstname.')}
        }else{toast.error('Please choose a lastname.')} 
    }

  return (
    <main className="container mt-4">
        <section className="card mx-auto" id='section'>
            <div className="card-header">
                <h1>marhaba</h1>
            </div>
            <div className="card-body">
                <form>
                    <h2 className="text-center">Sign Up</h2>
                    <p className="text-center mb-4">Enter your credentials to access your account</p>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 mb-3">
                            <label className="form-label">Last name</label>
                            <input type="text" onChange={handelChange} name='name' className="form-control" placeholder="Enter your last name"/>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3">
                            <label className="form-label">first name</label>
                            <input type="text" onChange={handelChange} name='prenom' className="form-control" placeholder="Enter your first name"/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" onChange={handelChange} name='email' pattern='^([a-z0-9]+(@gmail.com))$' className="form-control" placeholder="exampl@gmail.com"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" onChange={handelChange} name='password' className="form-control" placeholder="Enter your password"/>
                    </div>
                    <div className="">
                        <label className="form-label">Confirmer Password</label>
                        <input type="password" onChange={handelChange} name='password2' className="form-control" placeholder="Confirmer your password"/>
                    </div>
                    <div className="mt-4">
                        <button className="btn" onClick={onSubmit} type="submit">Sign up</button>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <p>Have already an account?<Link to="/login"> Login here</Link></p>
            </div>
        </section>
        <ToastContainer />
    </main>
  )
}

export default Register
