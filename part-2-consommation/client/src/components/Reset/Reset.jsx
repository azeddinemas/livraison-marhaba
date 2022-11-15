import {useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';

const Reset = () => {
    const [form, setForm] = useState({
        email : '',
        password : '',
        newPassword : ''
    })
    const handelChange = (e)=>{
        setForm({...form,[e.target.name] : e.target.value})
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        if (form.email !== '') {
            if (form.password !== '') {
                if (form.newPassword !== '') {
                    axios.post('http://localhost:7000/api/auth/reset',{...form}).then((element)=>{
                    toast.success(element.data)
                    }).catch((error)=>{
                        toast.error(error.response.data)
                    })
                }else {toast.warning('please choose a new password')}
            }else {toast.warning('please choose password')}
        }else {toast.warning('please choose email')}    
    }

  return (
    <div className="container mt-5">
        <div className="card mx-auto">
            <div className="card-header">
                <h1>marhaba</h1>
            </div>
            <form className="card-body" onSubmit={onSubmit}>
                <h2 className="text-center mb-4">Reset password</h2>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name='email' onChange={handelChange} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name='password' onChange={handelChange} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" name='newPassword' onChange={handelChange} className="form-control"/>
                </div>
                <button type="submit"  className="btn">Submit</button>
            </form>
            <div className="card-footer d-flex justify-content-between p-3">
                <Link to="/login"><b>Login</b></Link>
                <br/>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Reset