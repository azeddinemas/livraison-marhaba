import axios from 'axios';
import {useState} from 'react'
import { toast,ToastContainer } from "react-toastify";

const Home = () => {
  const [first, setFirst] = useState({
    name : '',
    prenom : '',
    email : '',
    password : '',
    password2 : ''
  });
  const handlechange =(e)=>{
    setFirst({...first , [e.target.name] : e.target.value})
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    if (first.name.trim() !=='') {
      if (first.prenom.trim() !== '') {
        if (first.email.trim()!=='') {
            if (first.password.trim() !=='') {
                if (first.password2.trim() !=='') {
                    if (first.password === first.password2) {
                        axios.post('http://localhost:7000/api/auth/addlivreur',first).then((e)=>{
                          toast.success(e.data)
                        }).catch((error)=>{
                          toast.warning(error.response.data)
                        })
                    }else{toast.warning('Please votre confirmation password incorrect.')}
                }else{toast.error('Please choose a confirm password.')}
            }else{toast.error('Please choose a password.')}
        }else{toast.error('Please choose a E-mail.')}
      }else {toast.error('Please choose a firstname.')}
    }else{toast.error('Please choose a lastname.')} 
    
  }
  return (
    <>
      <h1>Home</h1>
      <button type="button" className="btn bg-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add new livreur
      </button>

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 mb-3">
                      <label className="form-label">Last name</label>
                      <input type="text" name='name' onChange={handlechange} className="form-control" placeholder="Enter your last name"/>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-3">
                      <label className="form-label">first name</label>
                      <input type="text" name='prenom' onChange={handlechange} className="form-control" placeholder="Enter your first name"/>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name='email' onChange={handlechange} className="form-control" placeholder="exampl@gmail.com"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" name='password' onChange={handlechange} className="form-control" placeholder="Enter your password"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">new Password</label>
                  <input type="password" name='password2' onChange={handlechange} className="form-control" placeholder="Enter your password"/>
                </div>
                <div className="mt-4">
                  <button className="btn" type="submit" onClick={onSubmit}>Sign up</button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
    
  )
}

export default Home