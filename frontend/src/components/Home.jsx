import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_BLOG_PROGRESS } from '../redux/blogs/action/action';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState({});
  const blogs = useSelector(state => state.blogReducer.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(blogs);

  useEffect(() => {
    const token = Cookies.get('token');
    // console.log(token);
    if(token) {
      dispatch({ type: GET_BLOG_PROGRESS });
    }else{
      navigate('/login')
    }
  }, [])

  const handleKnowMore = (index) => {
    try {
      setShowData(blogs[index])
      setShow(!show)
    } catch (error) {
      console.log(error, "from handleKnowMore");
    }
  }

  return (
    <div>
      {/* Navbar */}
      
      <Navbar/>

      {/* Main Content */}
      <div className="container mx-auto mt-4 p-10" style={show ? { display: "none" } : { display: "block" }}>
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Blog Cards */}
          {
            blogs && (
              blogs.map((item, index) => {
                return (
                  <div key={index} className="bg-white shadow-md rounded-md p-4">
                    <img src={item.image} alt="Blog Image" className="w-full h-40 object-cover mb-4 rounded-md" />
                    <h3 className="text-lg font-semibold mb-2">{item.title} </h3>
                    <p className="text-gray-600 mb-4" style={{ maxHeight: "3em", overflow: "hidden" }}>{item.description}</p>
                    <div className="flex justify-between">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handleKnowMore(index)}>Read More...</button>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
      </div>

      {/* blog */}

      <div className="container mx-auto mt-4 h-screen flex justify-center mt-10" style={show ? { display: "flex" } : { display: "none" }}>
        <div className="w-2/5">
          <div className="bg-white shadow-md rounded-md p-4">
            <img
              src={showData.image}
              alt="Blog Image"
              className={`w-full h-64 object-cover mb-4 rounded-md`}
            />
            <h3 className="text-lg font-semibold mb-2">{showData.title}</h3>
            <p className="text-gray-600 mb-4">{showData.description}</p>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => setShow(!show)}
              >Go Back <i class="fa-solid fa-arrow-left" style={{color: "#ffffff"}}></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home