import axios from 'axios';
import React,{useState} from 'react'
import { Link } from 'react-router-dom';

const Forget = () => {
  const [forget, setForget] = useState({
    email : ''
  });
  
  const handelChange = (e)=>{
    setForget({ ...forget , [e.target.name] : e.target.value})
  }
  
  const onSubmit =(e)=>{
    e.preventDefault()
    axios.post('http://localhost:7000/api/auth/forget/:token',{...forget}).then((e)=>{
      console.log(e)
    }).catch((error)=>{
      console.log(error+' '+'hiii')
    })
  }

  return (
    <div className="container mt-5">
        <div className="card mx-auto">
            <div className="card-header">
                <h1>marhaba</h1>
            </div>
            <form className="card-body" onSubmit={onSubmit}>
                <h2 className="text-center mb-4">Forget Password</h2>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" onChange={handelChange} name='email' className="form-control"/>
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
            <div className="card-footer d-flex justify-content-between p-3">
                <Link to="/Register">Register</Link>
                <br/>               
            </div>
        </div>
    </div>
  )
}

export default Forget