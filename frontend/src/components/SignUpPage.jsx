import axios from 'axios';
import React, { useRef } from 'react'
import {toast } from 'react-toastify';
import { BASE_URL, SIGNUP_USER } from '../redux/constant';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      if (!name.current.value || !email.current.value || !password.current.value) {
        toast.error("Please fill out all fields");
      }else{
        const user = {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value
        }
        const  response = await axios.post(BASE_URL+SIGNUP_USER,user);
        // console.log(response);
        if(response.status === 200 || response.status === 201){
          toast.success("SignUp successfully!");
          navigate('/login')
        }else{
          toast.error(response.data.msg);
          console.log(response.data.msg);
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ref={name} />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ref={email} />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
              <input type="password" id="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ref={password} />
            </div>
            <a href="/login" className="block text-indigo-500 font-medium mb-4 hover:text-indigo-700">Already User? Login here</a>
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onClick={(e) => handleSignUp(e)}>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUpPage