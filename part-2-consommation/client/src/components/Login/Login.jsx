import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'
import { useLocation } from 'react-router';
import './Login.css';


const Login = () => {
    const location = useLocation() ;
    const stat = location.state
    useEffect(() => {
        toast.success(stat)
    },[])
    
    
    const [data, setData] = useState({
        email : '',
        password : ''
    })
    const handelChange = (e)=>{
        const {name,value} = e.target ; 
        setData({...data, [name]:value})
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        if (data.email.trim()!=='') {
            if (data.password.trim() !=='') {
                axios.post('http://localhost:7000/api/auth/login',data).then((dataUser)=>{
                    toast.success(dataUser.data)
                }).catch(erro=>{
                    toast.warning(erro.response.data)
                })
            }else{toast.error('Please choose a password.')}
        }else{toast.error('Please choose a E-mail.')}
    }

  return (
    <div className="container mt-5">
        <div className="card mx-auto">
            <div className="card-header">
                <h1>marhaba</h1>
            </div>
            <form className="card-body">
                <h2 className="text-center mb-4">Log In</h2>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name='email' onChange={handelChange} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name='password' onChange={handelChange} className="form-control"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input"/>
                    <label className="form-check-label">Remember me</label>
                </div>
                <button type="submit" onClick={onSubmit} className="btn">Submit</button>
            </form>
            <div className="card-footer d-flex justify-content-between p-3">
                <Link to="/Register">Register</Link>
                <br/>               
                <Link to="/forget">forget password</Link>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login 
