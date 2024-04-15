import { call, put } from 'redux-saga/effects'
import {  delete_blog_api, get_blogs_api, get_user_blogs_api } from '../../blogs/api/api'
import {  DELETE_BLOG_ERROR, DELETE_BLOG_SUCCESS, GET_BLOG_ERROR, GET_BLOG_SUCCESS, USER_BLOG_ERROR, USER_BLOG_SUCCESS } from '../../blogs/action/action';

export function* getBlogsSaga(action) {
  try {
    const response = yield call(get_blogs_api, action);

    const data = response.data;
    const status = response.status;

    if (status === 200 || status === 201) {
      yield put({ type: GET_BLOG_SUCCESS, data })
    } else {
      yield put({ type: GET_BLOG_ERROR, data })
    }
  } catch (error) {
    console.log(error, "from get blog  saga");
  }
}

export function* userBlogsSaga(action){
  try {
    const response = yield call(get_user_blogs_api,action);

    const data = response.data;
    const status = response.status;

    if(status === 200 || status === 201){
      yield put({type:USER_BLOG_SUCCESS,data});
    }else{
      yield put({type:USER_BLOG_ERROR,data});
    }
  } catch (error) {
    console.log(error,"from user blogs saga");
  }
}

export function* blogDeleteSaga(action){
  try {
    const response = yield call(delete_blog_api,action);

    const  id = response.id;
    const status =  response.status;
    
    if(status === 200 || status ===201){
      yield put({type:DELETE_BLOG_SUCCESS,id});
    }else{
      yield put({type:DELETE_BLOG_ERROR});
    }
  } catch (error) {
    console.log(error,'from delete blog saga');
  }
}