import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_BLOG_PROGRESS, USER_BLOG_PROGRESS } from '../redux/blogs/action/action';
import { BASE_URL, UPDATE_BLOG } from '../redux/constant';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const YourBlogs = () => {
  const [show, setShow] = useState(false);
  const [updateData, setUpdate] = useState({});
  // const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();
  const userBlogs = useSelector(state => state.blogReducer.userBlogs);
  const isBlogDelete = useSelector(state => state.blogReducer.isBlogDelete);
  const image = useRef();
  const navigate = useNavigate();
  // console.log(show);

  useEffect(() => {
    // setBlogs(userBlogs);
    const token = Cookies.get('token');
    if(token) {
      dispatch({ type: USER_BLOG_PROGRESS });
    }else{
      toast.warn("Login First!")
      navigate('/login')
    }
  }, [])



  // useEffect(() => {
  //   dispatch({ type: USER_BLOG_PROGRESS });
  //   console.log(blogs);
  // },[blogs]);
  // console.log(blogs);

  const handleDeleteBlog = (id) => {
    // console.log(id);
    dispatch({ type: DELETE_BLOG_PROGRESS, payload: id });
    setTimeout(() => {
      dispatch({ type: USER_BLOG_PROGRESS });
    }, 400)
  }
  console.log(isBlogDelete);

  const handleUpdateBlog = (index) => {
    setUpdate(userBlogs[index]);
    setShow(!show);
  }

  const handleCancel = () => {
    setShow(!show)
  }

  const handleChangeValue = (e) => {
    setUpdate({ ...updateData, [e.target.name]: e.target.value });
  }

  const handleFinalUpdate = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', updateData.title);
      formData.append('description', updateData.description);

      if (image.current.files[0]) {
        formData.append('image', image.current.files[0]);
      } else {
        formData.append('image', updateData.image);
      }

      // console.log(formData);

      const response = await axios.put(BASE_URL + UPDATE_BLOG + updateData._id, formData, { withCredentials: true });
      // console.log(response);
      if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          setShow(!show);
        }, 4000)
        toast.success("Blog has been updated successfully!");
      } else {
        toast.error(response.message);
        image.current.reset();
      }
    } catch (error) {
      toast.error(error)
      console.log(error, "from handle update blog");
    }
  }

  const handleGoBack = ()=>{
    navigate('/')
  }

  // console.log(updateData);

  return (
    <>
      {/* Navbar */}

      <Navbar />
      {/* user blogs */}
      <div className="user-blogs p-20 relative" style={show ? { display: "none" } : { display: "block" }}>
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300">Your Blogs</h2>
        <i className="fa-solid fa-xmark absolute right-20 top-24 text-xl cursor-pointer" onClick={handleGoBack}></i>
        <div className="container mx-auto mt-4 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {
              userBlogs && (
                userBlogs.map((item, index) => {
                  return (
                    <div key={index} className="bg-white shadow-md rounded-md p-4">
                      <img src={item.image} alt="Blog Image" className="w-full h-40 object-cover mb-4 rounded-md" />
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4" style={{ maxHeight: "3em", overflow: "hidden" }}>{item.description}</p>
                      <div className="flex justify-between">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handleUpdateBlog(index)}>Update</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => handleDeleteBlog(item._id)}>Remove</button>
                      </div>
                    </div>
                  )
                })
              )
            }
          </div>
        </div>
      </div>

      {/* update blog */}
      <div className="h-screen flex items-center justify-center bg-gray-100" style={show ? { display: "flex" } : { display: "none" }}>
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative">
          <h2 className="text-2xl font-bold mb-4">Update Your Blog</h2>
          <i className="fa-solid fa-xmark absolute text-lg right-2 top-2 cursor-pointer" onClick={handleCancel}></i>
          <form className="update-form">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Update Image:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                name="image"
                type="file"
                ref={image}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Update Title:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                value={updateData.title}
                onChange={(e) => handleChangeValue(e)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Update Description:</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                placeholder="Description"
                value={updateData.description}
                onChange={(e) => handleChangeValue(e)}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={(e) => handleFinalUpdate(e)}
              >
                Update Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default YourBlogs