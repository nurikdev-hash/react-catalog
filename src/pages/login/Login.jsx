import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/userReducer';
import { useNavigate } from 'react-router-dom';

function Login() {

  const user = useSelector((store)=>store.user.user);
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({username: "",password: ""});
  const naviagte = useNavigate();

  useEffect(()=>{
    if(user){
      naviagte("/");
    }
  },[user]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(formData.username && formData.password){
      dispatch(userLogin(formData));
    }
  }

  return (
    <div className='container py-5'>
      <div className='login-wrapper p-3 rounded border w-50 mx-auto'>
        <h2 className='text-center mb-4'>Login</h2>
        <form>
          <input
            type="text"
            className='form-control mb-3'
            placeholder='Username'
            value={formData.username}
            onChange={(e)=>setFormData({...formData,username: e.target.value})}
          />
          <input
            type="password"
            className='form-control mb-3'
            placeholder='Password'
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password: e.target.value})}
          />
          <button type='submit' onClick={handleSubmit} className='btn btn-success w-100'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}

export default Login