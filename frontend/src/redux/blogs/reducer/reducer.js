import { DELETE_BLOG_ERROR, DELETE_BLOG_PROGRESS, DELETE_BLOG_SUCCESS, GET_BLOG_ERROR, GET_BLOG_PROGRESS, GET_BLOG_SUCCESS, USER_BLOG_ERROR, USER_BLOG_PROGRESS, USER_BLOG_SUCCESS } from "../action/action";

const intailState = {
  blogs: [],
  userBlogs: [],
  isLoading: false,
  isError: null,
  isBlogDelete: false,
}

export const blogReducer = (state = intailState, action) => {
  switch (action.type) {
    case GET_BLOG_PROGRESS: {
      return {
        ...state,
        isLoading: true,
        isError: null,
      }
    }

    case GET_BLOG_SUCCESS: {
      return {
        ...state,
        blogs: action.data,
        isLoading: false,
        isError: null,
      }
    }

    case GET_BLOG_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: action.data
      }
    }

    case USER_BLOG_PROGRESS: {
      return {
        ...state,
        isLoading: true,
        isError: null,
      }
    }

    case USER_BLOG_SUCCESS: {
      return {
        ...state,
        userBlogs: action.data,
        isLoading: false,
        isError: null,
      }
    }

    case USER_BLOG_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: action.data
      }
    }

    case DELETE_BLOG_PROGRESS: {
      return {
        ...state,
        isLoading: true,
        isError: null,
        isBlogDelete: false
      }
    }

    case DELETE_BLOG_SUCCESS: {
      return {
        ...state,
        userBlogs: state.userBlogs.filter(blog => blog._id !== action.id),
        isLoading: false,
        isError: null,
        isBlogDelete: true,
      }
    }

    case DELETE_BLOG_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isBlogDelete: false
      }
    }

    default: {
      return state

    }
  }
}