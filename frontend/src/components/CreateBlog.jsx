import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL, CREATE_BLOG } from '../redux/constant';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const title = useRef();
  const description = useRef();
  const image = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      toast.warn("Login First!")
      navigate('/login')
    }
  },[])

  const handleCreateBlog = async (e) => {
    try {
      e.preventDefault();

      if (!title.current.value || !description.current.value || !image.current.files[0]) {
        toast.error("field required!");
      } else {
        const formData = new FormData();
        formData.append('title', title.current.value);
        formData.append('description', description.current.value);
        formData.append('image', image.current.files[0]);

        // console.log(formData);

        const response = await axios.post(BASE_URL + CREATE_BLOG, formData, { withCredentials: true });
        if (response.status === 201 || response.status === 200) {
          toast.success("Blog created successfully");
          setTimeout(()=>{
            navigate('/')
          },2000)
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg)
      console.log(error);
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative">
          <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
          <i className="fa-solid fa-xmark absolute text-lg right-2 top-2 cursor-pointer" onClick={handleCancel}></i>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image Upload:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                name="image"
                type="file"
                ref={image}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                ref={title}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                placeholder="Description"
                ref={description}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={(e) => handleCreateBlog(e)}
              >
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
