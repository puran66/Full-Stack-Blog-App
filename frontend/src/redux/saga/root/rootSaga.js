import { takeLatest } from 'redux-saga/effects';
import {  DELETE_BLOG_PROGRESS, GET_BLOG_PROGRESS, USER_BLOG_PROGRESS } from '../../blogs/action/action';
import {  blogDeleteSaga, getBlogsSaga, userBlogsSaga } from '../blogs/manageBlogSaga';

export { takeLatest } from 'redux-saga/effects';

// handle getblogs saga //

export function* handle_getBlogs_saga() {
  yield takeLatest(GET_BLOG_PROGRESS, getBlogsSaga);
}

// handle get user blogs saga //

export function* handle_user_blogs_saga(){
  yield takeLatest(USER_BLOG_PROGRESS,userBlogsSaga);
}

// handle delete blog sagaa //

export function* handle_deleteBlog_saga(){
  yield takeLatest(DELETE_BLOG_PROGRESS,blogDeleteSaga);
}
