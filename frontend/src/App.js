import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SignUpPage from './components/SignUpPage';
import  LoginPage from './components/LoginPage';
import Home from './components/Home';
import CreateBlog from './components/CreateBlog';
import YourBlogs from './components/YourBlogs';
import {Route,Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create-blog' element={<CreateBlog/>} />
        <Route path='/your-blogs' element={<YourBlogs/>} />
        <Route path='/sign-up' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </>
  );
}

export default App;
