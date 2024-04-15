import axios from 'axios';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import { BASE_URL, LOGIN_USER } from '../redux/constant';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    try {
      e.preventDefault();

      if(!email.current.value || !password.current.value){
        toast.error( "Please fill all fields" );
      }else{
        const user = {
          email :  email.current.value,
          password: password.current.value
        }

        const response = await axios.post(BASE_URL+LOGIN_USER,user,{withCredentials:true});

        if(response.status === 200 || response.status === 201){
          toast.success( "Logged in successfully!" );
          navigate('/')
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg)
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ref={email} />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input type="password" id="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ref={password} />
          </div>
          <a href="/sign-up" className="block text-indigo-500 font-medium mb-4 hover:text-indigo-700">New User? SignUp here</a>
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onClick={(e)=>handleLogin(e)}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage