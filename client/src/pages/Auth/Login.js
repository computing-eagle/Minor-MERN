import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios";
import toast from 'react-hot-toast';
import {useNavigate,useLocation} from "react-router-dom"
import "../../Styles/AuthStyle.css"
import { useAuth } from '../../Context/auth';

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const[auth,setAuth]=useAuth();
  const location=useLocation();
    //form function
const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res =await axios.post(`/api/v1/auth/Login`,{email,password,});
      if(res && res.data.success){
        toast.success(res.data && res.data.message);
        setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate(location.state || "/");
      }
      else
      {
        toast.error(res.data.message);
      }
    }
   
    catch(error)
    {
      console.log(error);
      toast.error('something went wrong');
    }
  };
  
  return (
    <Layout title="Register-Ecommerce App">
    <div className="form-container">
    <h1>LOGIN FORM</h1>
   <form onSubmit={handleSubmit}>
<div className="mb-3">

</div>
<div className="mb-3">
<input type="email" value={email}  onChange={(e)=>setEmail(e.target.value)}className="form-control" id="exampleInputEmail1"  
placeholder='Enter your Email' required/>
</div>

<div className="mb-3">
<input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)}className="form-control" id="exampleInputPassword1"
placeholder="Enter your Password" required/>
</div>

<div className="mb-3">
<button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
  Forgot Password</button>
</div>
<button type="submit" className="btn btn-primary">LOGIN</button>
</form>

    </div>
    </Layout>
  )
}

export default Login