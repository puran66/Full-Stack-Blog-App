import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('You have been logged out successfully!');
    setTimeout(() => {
      Cookies.remove('token');
      navigate('/login');
    },1500)
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-bold text-xl">My Blog</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/create-blog" className="hover:text-gray-300">Create Blog</Link>
          <Link to="/your-blogs" className="hover:text-gray-300">Your Blogs</Link>
          <button className='hover:text-gray-300' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
