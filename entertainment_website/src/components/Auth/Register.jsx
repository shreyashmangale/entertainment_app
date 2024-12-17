import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from 'react';
import logo from './logoImg/logo.jpg';
import { AuthContext } from '../../context/authContext';

// import { AuthContext } from '../Context/authContext';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [err, setError] = useState(null);

    const navigate = useNavigate()

    //   const { login } = useContext(AuthContext);

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{ 
          //console.log(inputs);
            
            await axios.post("https://entertainment-app-backend-6jyh.onrender.com/auth/register", inputs);
            navigate('/auth/login');
          }
          catch(err){
              setInputs(prev => ({ ...prev, email: "", password: "" }))
            setError(err.response.data);

          }


    }

    useEffect(()=>{
        
    },[])
    return (
        <div className='background h-screen flex flex-col justify-center items-center gap-16'>
            <div>
                <img src={logo} alt="" />
            </div>

            <div className='auth w-[350px] bg-[#161D2F] rounded-xl flex flex-col justify-center items-start p-8'>
                <h1 className='text-white text-3xl'>Sign Up</h1>
                <form className='flex flex-col gap-4 w-full mt-8 text-center'>
                    <input className='py-2 px-2 bg-transparent w-full text-white text-lg lg:placeholder:text-sm placeholder:text-lg outline-none focus:border-b-2 focus:border-gray-50 focus:text-xl focus:text-white caret-red-500 border-b-[1px] border-b-gray-500' required type="text" placeholder="Username" name='username' onChange={handleChange} />
                    <input className='py-2 px-2 bg-transparent w-full text-white text-lg lg:placeholder:text-sm placeholder:text-lg outline-none focus:border-b-2 focus:border-gray-50 focus:text-xl focus:text-white caret-red-500 border-b-[1px] border-b-gray-500' required type="text" placeholder="Email address" name='email' onChange={handleChange} />
                    <input className='py-2 px-2 bg-transparent text-white text-lg lg:placeholder:text-sm placeholder:text-lg outline-none focus:border-b-2 focus:border-gray-50 focus:text-xl focus:text-white caret-red-500 border-b-[1px] border-b-gray-500' required type="password" placeholder="Enter Password" name='password' onChange={handleChange} />
                    <input className='py-2 px-2 bg-transparent text-white text-lg lg:placeholder:text-sm placeholder:text-lg outline-none focus:border-b-2 focus:border-gray-50 focus:text-xl focus:text-white caret-red-500 border-b-[1px] border-b-gray-500' required type="password" placeholder="Repeat Password" name='password' onChange={handleChange} />
                    <button className='mt-6 px-4 py-3 rounded-lg bg-[#FC4747] text-white text-sm hover:text-[#161D2F] transition hover:ease-in-out' onClick={handleSubmit}>Create an account</button>
                    {err && <p className='text-green-500'>{err}</p>}
                    <p className='mt-4 text-white text-sm'>Already hav an account? <Link to="/auth/login"><span className='text-red-500 ms-2'>Login</span></Link></p>
                    
                </form>
            </div>
        </div>
    )
}

export default SignUp