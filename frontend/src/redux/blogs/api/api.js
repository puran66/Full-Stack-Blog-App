import axios from 'axios';
import { BASE_URL, DELETE_BLOG, GET_BLOGS, USER_BLOGS } from '../../constant';

export const get_blogs_api = async () => {
  try {
    return await axios.get(BASE_URL + GET_BLOGS, { withCredentials: true }).then((res) => {
      console.log(res.data.blogs, "res from get blogs api");

      const data = res.data.blogs;
      const status = res.status;

      return {
        data,
        status
      }
    })
  } catch (error) {
    console.log(error, "from blogs api");
  }
}

export const get_user_blogs_api = async () => {
  try {
    return await axios.get(BASE_URL + USER_BLOGS, { withCredentials: true }).then((res) => {
      console.log(res.data.userBlogs, "from user blogs api");

      const data = res.data.userBlogs;
      const status = res.status;

      return {
        data,
        status
      }
    })
  } catch (error) {
    console.log(error, "from the user blogs api");
  }
}

export const delete_blog_api = async (action) => {
  try {
    return await axios.delete(BASE_URL + DELETE_BLOG + `${action.payload}`, { withCredentials: true }).then((res) => {
      console.log(res, "from the delete blog api");

      const id = action.payload;
      const status = res.status;

      return {
        id,
        status
      }
    })
  } catch (error) {
    console.log(error, "from delete blog api");
  }
}